import React from "react";
import PropTypes from "prop-types";
import {
  Card, CardBody,
  CardTitle, Table,
  Button, ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import _s from "../style.scss";
import { app as appPropType } from "../../../constants/propTypes";

const kindArr = [
  {
    index: 1,
    kind: "All",
  },
  {
    index: 2,
    kind: "Service",
  },
  {
    index: 3,
    kind: "Deployment",
  },
  {
    index: 4,
    kind: "StatefulSet",
  },
];

const StepTwo = props => (
  <div>
    {/* Selected Apps */}
    <Card className={`row ${_s.card}`}>
      <CardBody>
        <CardTitle>Selected Services</CardTitle>
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
                <tr key={app._id}>
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
      {props.availableApps.length > 0 ?
        <CardBody>
          <div>
            <span className="card-title">Detected K8S Resources</span>
            <ButtonGroup className={_s.btnGrp}>
              {
                kindArr.map(obj => (
                  <Button
                    key={obj.index}
                    className={`ml-2 mr-2 mb-2 ${_s.radioBtn}`}
                    color="primary"
                    onClick={() => props.onRadioBtnClick(obj.index)}
                    active={props.rSelected === obj.index}
                  >{obj.kind}
                  </Button>
                ))
              }
            </ButtonGroup>
          </div>
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
                  <tr key={app._id}>
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
        </CardBody> : null
      }
    </Card>
    <div className={_s.btnRow}>
      <Link to="/setup/add/1" className="btn btn-secondary mr-2">Back</Link>
      <Link to="/setup/add/3" className="btn btn-primary">Next</Link>
    </div>
  </div>
);


StepTwo.propTypes = {
  rSelected: PropTypes.number.isRequired,
  addedApps: PropTypes.arrayOf(appPropType).isRequired,
  availableApps: PropTypes.arrayOf(appPropType).isRequired,
};


export default StepTwo;
