import React from "react";
import PropTypes from "prop-types";
import {
  Row, Col,
  TabContent, TabPane,
  Nav, NavItem, NavLink,
  Card, CardText, CardBody,
  CardTitle, Button,
} from "reactstrap";
import classnames from "classnames";
import _s from "../style.scss";
import { app as appPropType } from "../../../constants/propTypes";

const StepTwo = props => (
  <div>
    <div className="row" >
      <div className={_s.selectedZone}>
        <h4 className="text-secondary">Selected Applications</h4>
        {
          props.addedApps.map(app => (
            <div key={app._id} className={_s.cardCon}>
              <Card className={_s.card}>
                <CardBody>
                  <CardTitle>App: {app.name}</CardTitle>
                  <CardText>Kind: {app.deployment_template.kind}</CardText>
                  <CardText>State: {app.state}</CardText>
                  <Button onClick={() => props.onRemoveClick(app._id)} color="danger">Remove</Button>
                </CardBody>
              </Card>
            </div>
          ))
        }
      </div>
    </div>
    <div className="row" >
      <div className="selected-zone">
        <h4 className="text-secondary">Detected K8S Resources</h4>
        <div>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: props.activeTab === "1" })}
                onClick={() => { props.toggleTabs("1"); }}
              >
                  All
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: props.activeTab === "2" })}
                onClick={() => { props.toggleTabs("2"); }}
              >
                Services
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: props.activeTab === "3" })}
                onClick={() => { props.toggleTabs("3"); }}
              >
              Deployments
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: props.activeTab === "4" })}
                onClick={() => { props.toggleTabs("4"); }}
              >
              Stateful Sets
              </NavLink>
            </NavItem>
          </Nav>
          {/* Tabs內容 */}
          <TabContent activeTab={props.activeTab} className={_s.tabContent}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <div className="resources-data">
                    {
                      props.availableApps.map(app => (
                        <div key={app._id} className={_s.cardCon}>
                          <Card>
                            <CardBody>
                              <CardTitle>App: {app.name}</CardTitle>
                              <CardText>Kind: {app.deployment_template.kind}</CardText>
                              <CardText>State: {app.state}</CardText>
                              <Button onClick={() => props.onAddClick(app._id)} color="success">Add</Button>
                            </CardBody>
                          </Card>
                        </div>
                      ))
                    }
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <h4>Tab 2 Contents</h4>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <h4>Tab 3 Contents</h4>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="12">
                  <h4>Tab 4 Contents</h4>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </div>
    <div className={_s.btnRow}>
      <button className="btn btn-secondary mr-2" onClick={props.stepBack}>Back</button>
      <button className="btn btn-primary" onClick={props.stepNext}>Next</button>
    </div>
  </div>
);


StepTwo.propTypes = {
  addedApps: PropTypes.arrayOf(appPropType).isRequired,
  availableApps: PropTypes.arrayOf(appPropType).isRequired,
  activeTab: PropTypes.string.isRequired,
  stepBack: PropTypes.func.isRequired,
  stepNext: PropTypes.func.isRequired,
  toggleTabs: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};


export default StepTwo;
