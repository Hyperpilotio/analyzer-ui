import React from "react";
import { Form, Control } from "react-redux-form";
import {
  Row, Col, Button, Table, Collapse,
  Card, CardTitle, CardBody,
} from "reactstrap";
import FaEdit from "react-icons/lib/fa/edit";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateApp, activateApp } from "../../../actions";

const texts = {
  interference_management: "Interference Management",
  bottleneck_management: "Bottleneck Management",
  efficiency_management: "Efficiency Management",
  move_container: "Move Container",
  resize_container: "Resize Container",
  resize_node: "Resize Node",
  scale_service: "Scale Service",
};

const Step4ManagementFeatures = ({ appId, management_features, stepBack, updateManagementFeatures }) => (
  <Form
    model="createAppForm.management_features"
    onSubmit={data => updateManagementFeatures(data, appId)}
  >
    { management_features.map(({ name, status, remediation_policy }, index) => (
      <Card key={name} className="mb-3">
        <CardBody>
          <Row>
            <Col sm={6}>
              <CardTitle>{ texts[name] }</CardTitle>
            </Col>
            <Col sm={{ size: 3, offset: 3 }}>
              <Control.select model={`.[${index}].status`} className="form-control">
                <option value="Enabled">Enabled</option>
                <option value="Disabled">Disabled</option>
              </Control.select>
            </Col>
          </Row>
          <Collapse className="ml-3 mr-3" isOpen={status === "Enabled"}>
            <Row className="mt-3">
              <Table>
                <caption className="ml-3">Remediation Policies</caption>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Mode</th>
                    <th>Constraints</th>
                  </tr>
                </thead>
                <tbody>
                  { remediation_policy.map(({ action_name, mode, constraints }, rpIndex) => (
                    <tr key={action_name}>
                      <td>{ texts[action_name] }</td>
                      <td>
                        <Control.select
                          model={`.[${index}].remediation_policy[${rpIndex}].mode`}
                          className="form-control"
                        >
                          <option value="Manual">Manual</option>
                          <option value="Semi-Auto">Semi-Auto</option>
                          <option value="Full-Auto">Full-Auto</option>
                        </Control.select>
                      </td>
                      <td>
                        <a href="#"><FaEdit className="mr-2" />Edit constraints</a>
                      </td>
                    </tr>
                  ))
                  }
                </tbody>
              </Table>
            </Row>
          </Collapse>
        </CardBody>
      </Card>
    ))
    }
    <div className="float-right">
      <Button color="secondary" className="mr-2" onClick={stepBack}>Back</Button>
      <Button color="success" type="submit">Begin Hyperpiloting</Button>
    </div>
  </Form>
);

Step4ManagementFeatures.propTypes = {
  management_features: PropTypes.array.isRequired,
  stepBack: PropTypes.func.isRequired,
  updateManagementFeatures: PropTypes.func.isRequired,
};

const mapStateToProps = ({ createAppForm: { basicInfo, management_features } }) => ({
  appId: basicInfo.app_id,
  management_features,
});

const mapDispatchToProps = (dispatch, { stepNext }) => ({
  updateManagementFeatures: (managementFeatures, appId) => {
    dispatch(updateApp({ app_id: appId, management_features: managementFeatures }, stepNext));
    dispatch(activateApp({ app_id: appId }));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step4ManagementFeatures);
