import React from "react";
import { Form, Control } from "react-redux-form";
import { Row, Col, FormGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import { saveSloSourceConfig } from "../../../actions";

const Step3SLO = ({ submitSloSource, sloFormDisabled, metricOptions, stepBack, stepNext }) => (
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
          <label htmlFor="slo-service-name" className="col-4">Service Name</label>
          <Control.text htmlFor="slo-service-name" className="form-control col" model=".service_name" />
        </FormGroup>
        <FormGroup className="row">
          <label htmlFor="slo-port" className="col-4">Port</label>
          <Control.text id="slo-port" className="form-control col" model=".port" />
        </FormGroup>
        <Button type="submit" color="primary">Confirm</Button>
      </Form>
    </Col>
    <Col sm={{ offset: 1 }}>
      <Form model="createAppForm.slo" onSubmit={stepNext}>
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

Step3SLO.propTypes = {
  submitSloSource: PropTypes.func.isRequired,
  sloFormDisabled: PropTypes.bool.isRequired,
  metricOptions: PropTypes.array.isRequired,
  stepBack: PropTypes.func.isRequired,
  stepNext: PropTypes.func.isRequired,
};


const mapStateToProps = ({ createAppForm: { forms } }) => ({
  sloFormDisabled: _.size(forms.slo.$form.metricOptions) === 0,
  metricOptions: forms.slo.$form.metricOptions,
});

const mapDispatchToProps = dispatch => ({
  submitSloSource: sloSource => dispatch(saveSloSourceConfig(sloSource)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step3SLO);
