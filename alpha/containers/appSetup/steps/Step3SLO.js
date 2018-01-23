import React from "react";
import { Form, Control, actions as formActions } from "react-redux-form";
import { Row, Col, FormGroup, Table } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import FaClose from "react-icons/lib/fa/close";
import FaPlus from "react-icons/lib/fa/plus";
import FaLoadingCircle from "react-icons/lib/fa/circle-o-notch";
import _s from "../style.scss";
import { getKindDisplay } from "../../../lib/utils";
import { updateApp, fetchMetrics, setSloConfigEditability, emptyMetricOptions } from "../../../actions";
import Button from "../../../components/Button";
import withModal from "../../../lib/withModal";
import * as modalTypes from "../../../constants/modalTypes";

class Step3SLO extends React.Component {
  static propTypes = {
    submitSloSource: PropTypes.func.isRequired,
    updateSlo: PropTypes.func.isRequired,
    LoadingState: PropTypes.object,
    metricOptions: PropTypes.array,
    microservices: PropTypes.array,
    tags: PropTypes.array,
    sloSource: PropTypes.object,
    stepBack: PropTypes.func.isRequired,
    addTagsInput: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
    setRightSideEditability: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
  };

  state = {
    isTagsEmpty: true,
  }

  determineRightSideEditability() {
    // Hide SLO configuration when it's creating a new app and never saved SLO
    if (_.isEmpty(_.get(this.props.savedApp, "slo.metric.name"))) {
      this.props.setRightSideEditability(false);
    } else {
      this.props.setRightSideEditability(true);
    }
  }

  shouldDetermineEditability = false

  componentWillMount() {
    if (_.isNull(this.props.appId)) {
      this.shouldDetermineEditability = true;
    } else {
      this.determineRightSideEditability();
    }
  }

  componentDidUpdate() {
    if (this.shouldDetermineEditability) {
      this.shouldDetermineEditability = false;
      this.determineRightSideEditability();
    }
  }

  // Stage 1 (Left Side)
  async onSubmitConfirmingSource(sloSource) {
    const {
      submitSloSource,
      setRightSideEditability,
      openModal,
      restoreSloSourceConfig,
      savedApp,
      appId,
    } = this.props;

    const res = await submitSloSource(sloSource);
    if (!_.isUndefined(res.payload.response && !res.payload.response.success)) {
      if (!_.isEmpty(_.get(savedApp, "slo"))) {
        // disable right side when fetching metrics fail
        setRightSideEditability(false);
        openModal(
          modalTypes.ACTION_MODAL,
          {
            title: "Failed to fetch metrics",
            message: res.payload.response.message,
            question: "Do you want to use your original configuration?",
            cancelWord: "Try another metrics source",
            onSubmit: () => {
              setRightSideEditability(true);
              restoreSloSourceConfig(savedApp.slo.source);
            },
          },
        );
      } else {
        openModal(modalTypes.HINT_MODAL, {
          title: "Failed to fetch metrics",
          messages: [res.payload.response.message, "Please try another metric source"],
          onClose: () => setRightSideEditability(false),
        });
      }
    } else if (res.payload.success) {
      setRightSideEditability(true);
    }
  }

  onChangeMetricName(e) {
    const selectedMetric = _.find(this.props.metricOptions, { name: e.target.value }) || {};

    this.setState({
      isTagsEmpty: _.isEmpty(selectedMetric.tags),
    });

    _.forEach(this.props.slo.metric.tags, ({ key, value }, i) => {
      if (!_.includes(_.map(selectedMetric.tags, "key"), key)) {
        this.props.deleteTag(i);
      }
    });
  }

  render() {
    const {
      appId,
      submitSloSource,
      selectEndpointService,
      updateSlo,
      microservices,
      sloSource,
      sloFormDisabled,
      metricOptions,
      updateThresholdType,
      stepBack,
      slo,
      addTagsInput,
      deleteTag,
      LoadingState,
    } = this.props;

    const selectedMetric = _.find(metricOptions, { name: slo.metric.name }) || {};
    // The below line is a workaround for operator's bug described in https://github.com/Hyperpilotio/hyperpilot-operator/issues/35
    selectedMetric.tags && (selectedMetric.tags = _.uniqBy(selectedMetric.tags, "key"));

    return (
      <Row>
        <Col sm={6}>
          <h3 className="mb-4">SLO Metrics Source</h3>
          <Form onSubmit={::this.onSubmitConfirmingSource} model="createAppForm.sloSource">
            <FormGroup className="row w-100">
              <label htmlFor="slo-apm-type" className="col-4">APM type</label>
              <Control.select id="slo-apm-type" className="form-control col" model=".APM_type">
                <option value="prometheus">Prometheus</option>
                <option value="statsd">StatsD</option>
              </Control.select>
            </FormGroup>
            <FormGroup className="row w-100">
              <label htmlFor="slo-microservice" className="col-4">Endpoint Microservice</label>
              <select
                id="slo-microservice"
                className="form-control col"
                value={`${sloSource.service.namespace}|${sloSource.service.kind}|${sloSource.service.name}`}
                onChange={e => selectEndpointService(e.target.value)}
              >
                {/* The default value would be "||" because that's the value the above expression in
                  "value" prop of select would evaluate to if there's nothing in sloSource.service filled */}
                <option value="||" disabled>Select a microservice</option>
                {_.map(microservices, ms => (
                  <option
                    key={ms.service_id}
                    value={_.join([ms.namespace, ms.kind, ms.name], "|")}
                  >
                    {ms.namespace} | {getKindDisplay(ms.kind)} | {ms.name}
                  </option>
                ))}
              </select>
            </FormGroup>
            <FormGroup className="row w-100">
              <label htmlFor="slo-port" className="col-4">Port</label>
              <Control.text id="slo-port" className="form-control col" model=".port" parser={_.toInteger} />
            </FormGroup>
            <Row className="w-100">
              <Col>
                <Button onClick={stepBack} color="secondary">Back</Button>
              </Col>
              <Col>
                <Button type="submit" color="primary" className="float-right" >
                  { LoadingState.fetchMetrics.pending ? <FaLoadingCircle className={`mr-1 mb-1 ${_s.rotating}`} /> : null}
                  Confirm Source
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col style={sloFormDisabled ? { opacity: 0.3 } : null}>
          <h3 className="mb-4">SLO Configuration</h3>
          <Form model="createAppForm.slo" onSubmit={slo => updateSlo(slo, sloSource, appId)}>
            <fieldset disabled={sloFormDisabled}>

              {/* -------- Metric -------- */}
              <FormGroup className="row">
                <label htmlFor="slo-metric" className="col-3">Metric</label>
                <Control.select
                  id="slo-metric"
                  className="form-control col"
                  model=".metric.name"
                  onChange={::this.onChangeMetricName}
                >
                  <option value={null} disabled>Select Metric</option>
                  {
                    !_.isEmpty(metricOptions)
                      ? _.map(
                          metricOptions,
                          mt => <option key={mt.name} value={mt.name}>{mt.name}</option>
                        )
                      : (
                        _.get(slo, "metric.name")
                          ? <option value={slo.metric.name}>{slo.metric.name}</option>
                          : null
                      )
                  }
                </Control.select>
              </FormGroup>

              {/* -------- Type -------- */}
              <FormGroup className="row">
                <label htmlFor="slo-type" className="col-3">Type</label>
                <Control.select
                  id="slo-type"
                  className="form-control col"
                  model=".metric.type"
                  onChange={e => updateThresholdType(e.target.value)}
                >
                  <option value="latency">Latency</option>
                  <option value="throughput">Throughput</option>
                  <option value="execute_time">Execute-Time</option>
                </Control.select>
              </FormGroup>
              {/* -------- Tags -------- */}
              <FormGroup className="row">
                <label htmlFor="slo-summary" className="col-3">Tags</label>
              </FormGroup>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {_.map(slo.metric.tags, (tag, i) => (
                    <tr key={i}>
                      <td>
                        <Control.select
                          className="form-control"
                          placeholder="Key"
                          model={`.metric.tags.[${i}].key`}
                        >
                          <option value={null} disabled>Tag key</option>
                          { !_.isEmpty(metricOptions) ?
                            _.map(
                              selectedMetric.tags,
                              ({ key }) => <option key={key} value={key}>{key}</option>
                            ) :
                            <option value={tag.key}>{tag.key}</option>
                          }
                        </Control.select>
                      </td>
                      <td>
                        <Control.select
                          className="form-control"
                          placeholder="Value"
                          model={`.metric.tags.[${i}].value`}
                        >
                          <option value={null} disabled>Tag value</option>
                          { !_.isEmpty(metricOptions) ?
                            _.map(
                              _.get(_.find(selectedMetric.tags, { key: tag.key }), "values"),
                              val => <option key={val} value={val}>{val}</option>,
                            ) :
                            <option value={tag.value}>{tag.value}</option>
                          }
                        </Control.select>
                      </td>
                      <td>
                        <FaClose onClick={() => sloFormDisabled ? null : deleteTag(i)} />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2}>
                      <Button
                        outline
                        color="primary"
                        size="sm"
                        onClick={addTagsInput}
                        isDisabled={this.state.isTagsEmpty}
                      >
                        <FaPlus /> Add Tags
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
              {/* -------- Unit -------- */}
              <Row>
                <Col>
                  <FormGroup>
                    <label htmlFor="slo-value">Value</label>
                    <Control.text id="slo-value" className="form-control" model=".threshold.value" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label htmlFor="slo-unit">Unit</label>
                    {slo.metric.type === "throughput"
                      ? <Control.text id="slo-unit" className="form-control" model=".threshold.unit" />
                      : (
                        <Control.select className="form-control" model=".threshold.unit">
                          <option value="ms">ms</option>
                          <option value="seconds">seconds</option>
                        </Control.select>
                      )
                    }
                  </FormGroup>
                </Col>
              </Row>
            </fieldset>
            <div className="float-right">
              <Button
                isDisabled={sloFormDisabled}
                isLoading={LoadingState.updateApp.pending}
                color="primary"
              >Next</Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ createAppForm: { basicInfo, sloSource, slo, microservices, forms }, ui, applications }) => ({
  savedApp: _.find(applications, { app_id: basicInfo.app_id }),
  appId: basicInfo.app_id,
  sloFormDisabled: forms.slo.$form.isDisable,
  metricOptions: _.sortBy(forms.slo.$form.metricOptions, "name"),
  LoadingState: {
    fetchMetrics: ui.FETCH_METRICS,
    updateApp: ui.UPDATE_APP,
  },
  sloSource,
  microservices,
  slo,
});

const mapDispatchToProps = (dispatch, { stepNext }) => ({
  selectEndpointService: serializedValue => dispatch(formActions.merge(
    "createAppForm.sloSource.service",
    _.fromPairs(_.zip(["namespace", "kind", "name"], _.split(serializedValue, "|", 3))),
  )),
  submitSloSource: sloSource => (dispatch(fetchMetrics(sloSource))),
  updateThresholdType: metricType => dispatch(formActions.change(
    "createAppForm.slo.threshold.type",
    _.get({ latency: "UB", execute_time: "UB", throughput: "LB" }, metricType),
  )),
  addTagsInput: () => {
    dispatch(formActions.push(
      "createAppForm.slo.metric.tags",
      { key: "", value: "" },
    ));
  },
  deleteTag: index => dispatch(formActions.remove("createAppForm.slo.metric.tags", index)),
  updateSlo: (slo, sloSource, appId) => {
    dispatch(updateApp({ app_id: appId, slo: { ...slo, source: sloSource } }, stepNext));
  },
  setRightSideEditability: (isEditable) => {
    dispatch(setSloConfigEditability(isEditable));
    if (!isEditable) {
      dispatch(emptyMetricOptions());
    }
  },
  restoreSloSourceConfig: originalSloSource => dispatch(formActions.change(
    "createAppForm.sloSource",
    originalSloSource,
  )),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withModal(Step3SLO));
