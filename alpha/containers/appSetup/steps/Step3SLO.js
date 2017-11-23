import React from "react";
import { Form, Control } from "react-redux-form";
import { Row, Col, FormGroup, Button } from "reactstrap";
import { connect } from "react-redux";
import _ from "lodash";
import { saveSloSourceConfig } from "../../../actions";

const Step3SLO = ({ submitSloSource, sloFormDisabled, metricOptions, stepBack, stepNext }) => (
  <Row>
    <Col sm={5}>
      <Form onSubmit={submitSloSource} model="createAppForm.sloSource">
        <FormGroup className="row">
          <label className="col-4">APM type</label>
          <Control.select className="form-control col" model=".APM_type">
            <option value="prometheus">Prometheus</option>
            <option value="statsd">StatsD</option>
          </Control.select>
        </FormGroup>
        <FormGroup className="row">
          <label className="col-4">Service Name</label>
          <Control.text className="form-control col" model=".service_name" />
        </FormGroup>
        <FormGroup className="row">
          <label className="col-4">Port</label>
          <Control.text className="form-control col" model=".port" />
        </FormGroup>
        <Button type="submit" color="primary">Confirm</Button>
      </Form>
    </Col>
    <Col sm={{ offset: 1 }}>
      <Form model="createAppForm.slo" onSubmit={stepNext}>
        <fieldset disabled={sloFormDisabled}>
          <FormGroup>
            <label>Metric</label>
            <Control.select className="form-control" model=".metric">
              { _.map(metricOptions, mt => <option key={mt} value={mt}>{ mt }</option>) }
            </Control.select>
          </FormGroup>
          <FormGroup>
            <label>Type</label>
            <Control.select className="form-control" model=".type">
              <option value="latency">Latency</option>
              <option value="throughput">Throughput</option>
              <option value="execute_time">Execute-Time</option>
            </Control.select>
          </FormGroup>
          <FormGroup>
            <label>Summary</label>
            <Control.text className="form-control" model=".summary" />
          </FormGroup>
          <FormGroup>
            <label>Value</label>
            <Control.text className="form-control" model=".value" />
          </FormGroup>
          <FormGroup>
            <label>Unit</label>
            <Control.text className="form-control" model=".unit" />
          </FormGroup>
        </fieldset>
        <div className="float-right">
          <Button onClick={stepBack} color="secondary" className="mr-2">Back</Button>
          <Button type="submit" color="primary">Next</Button>
        </div>
      </Form>
    </Col>
  </Row>
);

const mapStateToProps = ({ createAppForm: { forms } }) => ({
  sloFormDisabled: _.size(forms.slo.$form.metricOptions) === 0,
  metricOptions: forms.slo.$form.metricOptions,
});

const mapDispatchToProps = dispatch => ({
  submitSloSource: sloSource => dispatch(saveSloSourceConfig(sloSource)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step3SLO);
