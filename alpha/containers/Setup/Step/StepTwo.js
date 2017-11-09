import React from "react";
import PropTypes from "prop-types";
import {
  Card, CardBody,
  CardTitle, Button, Table,
} from "reactstrap";
import ReactRouterPropTypes from "react-router-prop-types";
import { Link } from "react-router-dom";
import _s from "../style.scss";
import { app as appPropType } from "../../../constants/propTypes";

// const tabsArr = [
//   {
//     id: "1",
//     navLink: "All",
//   }, {
//     id: "2",
//     navLink: "Services",
//   }, {
//     id: "3",
//     navLink: "Deployments",
//   }, {
//     id: "4",
//     navLink: "Stateful Sets",
//   },
// ];

const StepTwo = props => (
  <div>
    {/* Selected Apps */}
    <Card className={`row ${_s.card}`}>
      <CardBody>
        <CardTitle>Selected Applications</CardTitle>
        <Table>
          <thead className={_s.tHead}>
            <tr>
              <th>Name</th>
              <th>Namespace</th>
              <th>Kind</th>
              <th>Status</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          
          <tbody>
            {
              props.addedApps.map(app => (
                <tr>
                  <th scope="row">{app.name}</th>
                  <td>NameSpace</td>
                  <td>{app.deployment_template.kind}</td>
                  <td>{app.state}</td>
                  <td>Age</td>
                  <td><Button className={_s.btn} onClick={() => props.onRemoveClick(app._id)} color="danger">Remove</Button></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        { props.addedApps.length <= 0 ?
          <div className="row">
            <span className={_s.noData}>No Service selected.</span>
          </div> : null
        }
      </CardBody>
    </Card>
    {/* Unselected Apps */}
    <Card className={`row mt-5 mb-5 ${_s.card}`}>
      <CardBody>
        <CardTitle>Detected K8S Resources</CardTitle>
        <Table>
          <thead className={_s.tHead}>
            <tr>
              <th>Name</th>
              <th>Namespace</th>
              <th>Kind</th>
              <th>Status</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              props.availableApps.map(app => (
                <tr>
                  <th scope="row">{app.name}</th>
                  <td>NameSpace</td>
                  <td>{app.deployment_template.kind}</td>
                  <td>{app.state}</td>
                  <td>Age</td>
                  <td><Button className={_s.btn} onClick={() => props.onAddClick(app._id)} color="success">Add</Button></td>
                </tr>
              ))
            }
          </tbody>
        </Table>
      </CardBody>
    </Card>
    <div className={_s.btnRow}>
      <Link to={`${props.match.url}/1`} className="btn btn-secondary mr-2">Back</Link>
      <Link to={`${props.match.url}/3`} className="btn btn-primary">Next</Link>
    </div>
  </div>
);


StepTwo.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  addedApps: PropTypes.arrayOf(appPropType).isRequired,
  availableApps: PropTypes.arrayOf(appPropType).isRequired,
};


export default StepTwo;
