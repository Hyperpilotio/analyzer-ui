import React from "react";
import { Form, Control, actions as formActions } from "react-redux-form";
import { Row, Col, FormGroup, Button, Table } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import FaClose from "react-icons/lib/fa/close";
import FaPlus from "react-icons/lib/fa/plus";
import FaLoadingCircle from "react-icons/lib/fa/circle-o-notch";
import _s from "../style.scss";
import { getKindDisplay } from "../../../lib/utils";
import { updateApp, fetchMetrics, setSloConfigEditability, emptyMetricOptions } from "../../../actions";
import withModal from "../../../lib/withModal";
import * as modalTypes from "../../../constants/modalTypes";

class Step3SLO extends React.Component {
  static propTypes = {
    submitSloSource: PropTypes.func.isRequired,
    updateSlo: PropTypes.func.isRequired,
    sloFormDisabled: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
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

  componentWillMount() {
    if (_.isEmpty(this.props.microservices)) {
      this.props.setRightSideEditability(false);
    }
  }
  // Stage 1 (Left Side)
  async onSubmitConfirmingSource(sloSource) {
    const {
      submitSloSource,
      setRightSideEditability,
      openModal,
      restoreService,
      applications,
      appId,
    } = this.props;

    const res = await submitSloSource(sloSource);
    if (!_.isUndefined(res.payload.response && !res.payload.response.success)) {
      // disable right side when fetching metrics fail
      setRightSideEditability(false);
      openModal(
        modalTypes.ACTION_MODAL,
        {
          title: "Fetch metrics error",
          message: res.payload.response.message,
          question: "Do you want to use your original configuration?",
          cancelWord: "Try another metrics source",
          onSubmit: () => {
            setRightSideEditability(true);
            restoreService(applications, appId);
          },
        });
    } else if (res.payload.success) {
      setRightSideEditability(true);
    }
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
      isLoading,
    } = this.props;

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
                  { isLoading ? <FaLoadingCircle className={`mr-1 mb-1 ${_s.rotating}`} /> : null}
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
              <FormGroup className="row">
                <label htmlFor="slo-metric" className="col-3">Metric</label>
                <Control.select id="slo-metric" className="form-control col" model=".metric.name">
                  <option value={null} disabled>Select Metric</option>
                  {
                    !_.isEmpty(metricOptions)
                      ? _.map(metricOptions, mt => <option key={mt} value={mt}>{mt}</option>)
                      : (
                        _.get(slo, "metric.name")
                          ? <option value={slo.metric.name}>{slo.metric.name}</option>
                          : null
                      )
                  }
                </Control.select>
              </FormGroup>
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
                      <td><Control.text className="form-control" placeholder="Key" model={`.metric.tags.[${i}].key`} /></td>
                      <td><Control.text className="form-control" placeholder="Value" model={`.metric.tags.[${i}].value`} /></td>
                      <td>
                        <FaClose onClick={() => sloFormDisabled ? null : deleteTag(i)} />
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2}>
                      <Button outline color="primary" size="sm" onClick={addTagsInput}>
                        <FaPlus /> Add Tags
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>

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
                        </Control.select>
                      )
                    }
                  </FormGroup>
                </Col>
              </Row>
            </fieldset>
            <div className="float-right">
              <Button type="submit" color="primary" disabled={sloFormDisabled}>Next</Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ createAppForm: { basicInfo, sloSource, slo, microservices, forms }, ui, applications }) => ({
  appId: basicInfo.app_id,
  sloFormDisabled: forms.slo.$form.isDisable,
  metricOptions: _.sortBy(forms.slo.$form.metricOptions),
  isLoading: ui.isFetchMetricsLoading,
  sloSource,
  microservices,
  slo,
  applications,
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
  addTagsInput: () => dispatch(formActions.push(
    "createAppForm.slo.metric.tags",
    { key: "", value: "" },
  )),
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
  restoreService: (applications, appId) => {
    dispatch(formActions.change(
      "createAppForm.sloSource",
      _.find(applications, { app_id: appId }).slo.source,
    ));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withModal(Step3SLO));
