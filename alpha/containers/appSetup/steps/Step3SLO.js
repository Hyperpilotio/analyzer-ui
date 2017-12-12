import React from "react";
import { Form, Control, actions as formActions } from "react-redux-form";
import { Row, Col, FormGroup, Button, Table, Input } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import FaClose from "react-icons/lib/fa/close";
import FaPlus from "react-icons/lib/fa/plus";
import { getKindDisplay } from "../../../lib/utils";
import { updateApp, fetchMetrics } from "../../../actions";

class Step3SLO extends React.Component {
  static propTypes = {
    submitSloSource: PropTypes.func.isRequired,
    updateSlo: PropTypes.func.isRequired,
    sloFormDisabled: PropTypes.bool.isRequired,
    metricOptions: PropTypes.array,
    microservices: PropTypes.array,
    tags: PropTypes.array,
    sloSource: PropTypes.object,
    stepBack: PropTypes.func.isRequired,
    addTagsInput: PropTypes.func.isRequired,
    deleteTag: PropTypes.func.isRequired,
  };

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
      stepBack,
      slo,
      addTagsInput,
      deleteTag,
    } = this.props;

    return (
      <Row>
        <Col sm={6}>
          <h3 className="mb-4">SLO Metrics Source</h3>
          <Form onSubmit={submitSloSource} model="createAppForm.sloSource">
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
                <option value={null} disabled>Select a microservice</option>
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
              <Control.text type="number" id="slo-port" className="form-control col" model=".port" parser={_.toInteger} />
            </FormGroup>
            
            <Row className="w-100">
              <Col>
                <Button onClick={stepBack} color="secondary">Back</Button>
              </Col>
              <Col>
                <Button type="submit" color="primary" className="float-right" >Confirm Source</Button>
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
                <Control.select id="slo-type" className="form-control col" model=".metric.type">
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
                    <Control.text id="slo-unit" className="form-control" model=".threshold.unit" />
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

const mapStateToProps = ({ createAppForm: { basicInfo, sloSource, slo, microservices, forms } }) => ({
  appId: basicInfo.app_id,
  sloFormDisabled: _.isEmpty(forms.slo.$form.metricOptions) && !_.get(slo, "metric.name"),
  metricOptions: forms.slo.$form.metricOptions,
  sloSource,
  microservices,
  slo,
});

const mapDispatchToProps = (dispatch, { stepNext }) => ({
  selectEndpointService: serializedValue => dispatch(formActions.merge(
    "createAppForm.sloSource.service",
    _.fromPairs(_.zip(["namespace", "kind", "name"], _.split(serializedValue, "|", 3))),
  )),
  submitSloSource: sloSource => dispatch(fetchMetrics(sloSource)),
  addTagsInput: () => dispatch(formActions.push(
    "createAppForm.slo.metric.tags",
    { key: "", value: "" },
  )),
  deleteTag: index => dispatch(formActions.remove("createAppForm.slo.metric.tags", index)),
  updateSlo: (slo, sloSource, appId) => {
    dispatch(updateApp({ app_id: appId, slo: { ...slo, source: sloSource } }, stepNext));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step3SLO);
