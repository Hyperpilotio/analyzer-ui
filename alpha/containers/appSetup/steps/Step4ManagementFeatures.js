import React from "react";
import { Form, Control } from "react-redux-form";
import {
  Row, Col, Table, Collapse,
  Card, CardTitle, CardBody,
} from "reactstrap";
import FaEdit from "react-icons/lib/fa/edit";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import _ from "lodash";
import { updateApp, activateApp } from "../../../actions";
import Button from "../../../components/Button";

const texts = {
  interference_management: "Interference Management",
  bottleneck_management: "Bottleneck Management",
  efficiency_management: "Efficiency Management",
  move_container: "Move Container",
  resize_container: "Resize Container",
  resize_node: "Resize Node",
  scale_service: "Scale Service",
};

const Step4ManagementFeatures = ({
  appId,
  management_features, // eslint-disable-line camelcase
  stepBack,
  updateManagementFeatures,
  loadingState,
}) => (
  <Form
    model="createAppForm.management_features"
    onSubmit={data => updateManagementFeatures(data, appId)}
  >
    { management_features.map(({ name, status, remediation_policy: policies }, index) => (
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
                  { policies.map(({ action_name: actionName }, rpIndex) => (
                    <tr key={actionName}>
                      <td>{ texts[actionName] }</td>
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
                        {/* This button is a placeholder and doesn't do anything for now */}
                        <Button onClick={e => e.preventDefault()}>
                          <FaEdit className="mr-2" />
                          Edit constraints
                        </Button>
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
    <div className="float-right mb-5">
      <Button
        color="secondary"
        className="mr-2"
        onClick={stepBack}
      >Back</Button>
      <Button
        isLoading={_.get(loadingState.activateApp.map, [appId, "pending"], false)}
        color="success"
      >
      Begin Hyperpiloting
      </Button>
    </div>
  </Form>
);

Step4ManagementFeatures.propTypes = {
  management_features: PropTypes.array.isRequired,
  stepBack: PropTypes.func.isRequired,
  updateManagementFeatures: PropTypes.func.isRequired,
  loadingState: PropTypes.object.isRequired,
};

// eslint-disable-next-line camelcase
const mapStateToProps = ({ createAppForm: { basicInfo, management_features }, ui }) => ({
  appId: basicInfo.app_id,
  management_features,
  loadingState: {
    updateApp: ui.UPDATE_APP,
    activateApp: ui.ACTIVATE_APP,
  },
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
