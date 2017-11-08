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

const tabsArr = [
  {
    id: "1",
    navLink: "All",
  }, {
    id: "2",
    navLink: "Services",
  }, {
    id: "3",
    navLink: "Deployments",
  }, {
    id: "4",
    navLink: "Stateful Sets",
  },
];

const StepTwo = props => (
  <div>
    <div className="row" >
      <div className={_s.selectedZone}>
        <h4 className="text-secondary">Selected Applications</h4>
        {
          props.addedApps.map(app => (
            <div key={app._id} className={`mr-3 ${_s.cardCon}`}>
              <Card className={_s.card}>
                <CardBody>
                  <CardTitle>{app.name}</CardTitle>
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
            {
              tabsArr.map(tab => (
                <NavItem key={tab.id} className={_s.navItem} >
                  <NavLink
                    className={classnames({ active: props.activeTab === tab.id })}
                    onClick={() => { props.toggleTabs(tab.id); }}
                  >
                    {tab.navLink}
                  </NavLink>
                </NavItem>
              ))
            }
          </Nav>
          {/* Tabs內容 */}
          <TabContent activeTab={props.activeTab} className={_s.tabContent}>
            {
              tabsArr.map(tab => (
                <TabPane tabId={tab.id}>
                  <div className="resources-data">
                    {
                      props.availableApps.map(app => (
                        <div key={app._id} className={`mr-3 ${_s.cardCon}`}>
                          <Card className={_s.card}>
                            <CardBody>
                              <CardTitle>{app.name}</CardTitle>
                              <CardText>Kind: {app.deployment_template.kind}</CardText>
                              <CardText>State: {app.state}</CardText>
                              <Button onClick={() => props.onAddClick(app._id)} color="success">Add</Button>
                            </CardBody>
                          </Card>
                        </div>
                      ))
                    }
                  </div>
                </TabPane>
              ))
            }
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
