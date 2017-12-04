import React from "react";
import { Form, Control } from "react-redux-form";
import { Row, Col, FormGroup, Button, Input } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import { updateApp, saveSloSourceConfig } from "../../../actions";


const filterSelection = (arr, matchKey, matchObj) => (arr ? _.uniq(_.map(matchObj ? _.filter(_.reject(arr, { kind: "services" }), matchObj) : _.reject(arr, { kind: "services" }), matchKey)) : []);

class Step3SLO extends React.Component {
  static propTypes = {
    submitSloSource: PropTypes.func.isRequired,
    updateSlo: PropTypes.func.isRequired,
    sloFormDisabled: PropTypes.bool.isRequired,
    metricOptions: PropTypes.array,
    microservices: PropTypes.array.isRequired,
    sloSource: PropTypes.object,
    stepBack: PropTypes.func.isRequired,
  };

  state = {
    namespaceFilter: "all",
    kindFilter: "all",
  }

  get namespace() {
    return filterSelection(this.props.microservices, "namespace");
  }

  get kind() {
    return filterSelection(this.props.microservices, "kind", {
      namespace: this.state.namespaceFilter,
    });
  }

  get name() {
    return filterSelection(this.props.microservices, "name", {
      namespace: this.state.namespaceFilter,
      kind: this.state.kindFilter,
    });
  }

  filterNamespace = (event) => {
    this.setState({ namespaceFilter: event.target.value });
  }

  filterKind = (event) => {
    this.setState({ kindFilter: event.target.value });
  }

  render() {
    const {
      submitSloSource,
      updateSlo,
      sloSource,
      sloFormDisabled,
      metricOptions,
      stepBack,
    } = this.props;


    return (
      <Row>
        <Col sm={5}>
          <Form onSubmit={submitSloSource} model="createAppForm.sloSource">
            <FormGroup className="row">
              <label htmlFor="slo-apm-type" className="col-4">APM type</label>
              <Control.select id="slo-apm-type" className="form-control col" model=".APM_type">
                <option value="prometheus">Prometheus</option>
                <option value="statsd">StatsD</option>
              </Control.select>
            </FormGroup>
            <FormGroup className="row">
              <label htmlFor="slo-microservice-namespace" className="col-4">Endpoint Microservice</label>
              <div className="col-6">

                <FormGroup>
                  <label htmlFor="slo-microservice-namespace" className="row">Namespace</label>
                  <Control.select
                    id="slo-microservice-namespace"
                    className="form-control row"
                    type="select"
                    model=".service.namespace"
                    onChange={this.filterNamespace}
                  >
                    <option value="" disabled defaultValue>Select Namespace</option>
                    { this.namespace.map(namespace => <option key={namespace} value={namespace}>{ namespace }</option>) }
                  </Control.select>
                </FormGroup>

                <FormGroup>
                  <fieldset disabled={this.namespace.length === 0}>
                    <label htmlFor="slo-microservice-kind" className="row">Kind</label>
                    <Control.select
                      id="slo-microservice-kind"
                      className="form-control row"
                      type="select"
                      model=".service.kind"
                      onChange={this.filterKind}
                    >
                      <option value="" disabled defaultValue>Select Kind</option>
                      { this.kind.map(kind => <option key={kind} value={kind}>{ kind }</option>) }
                    </Control.select>
                  </fieldset>
                </FormGroup>

                <FormGroup>
                  <fieldset disabled={this.kind.length === 0}>
                    <label htmlFor="slo-microservice-name" className="row">Name</label>
                    <Control.select
                      id="slo-microservice-name"
                      className="form-control row"
                      type="select"
                      model=".service.name"
                    >
                      <option value="" disabled defaultValue>Select name</option>
                      { this.name.map(name => <option key={name} value={name}>{ name }</option>) }
                    </Control.select>
                  </fieldset>
                </FormGroup>

              </div>
            </FormGroup>
            <FormGroup className="row">
              <label htmlFor="slo-port" className="col-4">Port</label>
              <Control.text id="slo-port" className="form-control col" model=".port" />
            </FormGroup>
            <Button type="submit" color="primary">Confirm</Button>
          </Form>
        </Col>
        <Col sm={{ offset: 1 }}>
          <Form model="createAppForm.slo" onSubmit={slo => updateSlo(slo, sloSource)}>
            <fieldset disabled={sloFormDisabled}>
              <FormGroup className="row">
                <label htmlFor="slo-metric" className="col-3">Metric</label>
                <Control.select htmlFor="slo-metric" className="form-control col" model=".metric">
                  { _.map(metricOptions, mt => <option key={mt} value={mt}>{ mt }</option>) }
                </Control.select>
              </FormGroup>
              <FormGroup className="row">
                <label htmlFor="slo-type" className="col-3">Type</label>
                <Control.select id="slo-type" className="form-control col" model=".type">
                  <option value="latency">Latency</option>
                  <option value="throughput">Throughput</option>
                  <option value="execute_time">Execute-Time</option>
                </Control.select>
              </FormGroup>
              <FormGroup className="row">
                <label htmlFor="slo-summary" className="col-3">Summary</label>
                <Control.text id="slo-summary" className="form-control col" model=".summary" />
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup>
                    <label htmlFor="slo-value">Value</label>
                    <Control.text id="slo-value" className="form-control" model=".value" />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <label htmlFor="slo-unit">Unit</label>
                    <Control.text id="slo-unit" className="form-control" model=".unit" />
                  </FormGroup>
                </Col>
              </Row>
            </fieldset>
            <div className="float-right">
              <Button onClick={stepBack} color="secondary" className="mr-2">Back</Button>
              <Button type="submit" color="primary">Next</Button>
            </div>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ createAppForm, createAppForm: { forms } }) => ({
  sloFormDisabled: _.size(forms.slo.$form.metricOptions) === 0,
  metricOptions: forms.slo.$form.metricOptions,
  sloSource: createAppForm.sloSource,
  microservices: forms.microservices.$form.options,
});

const mapDispatchToProps = (dispatch, { stepNext }) => ({
  submitSloSource: sloSource => dispatch(saveSloSourceConfig(sloSource)),
  updateSlo: (slo, sloSource) => dispatch(updateApp(_.assign(slo, sloSource), stepNext)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step3SLO);
