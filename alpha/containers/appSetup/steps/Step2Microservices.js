import React from "react";
import PropTypes from "prop-types";
import {
  Card, CardBody, Button,
  CardTitle, Table,
} from "reactstrap";
import _ from "lodash";
import { Link } from "react-router-dom";
import _s from "../style.scss";
import { app as appPropType } from "../../../constants/propTypes";

const Step2Microservices = props => (
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              props.addedApps.map(app => (
                <tr>
                  <th scope="row">{app.name}</th>
                  <td>{app.namespace}</td>
                  <td>{app.kind}</td>
                  <td><Button className={_s.btn} onClick={() => props.onRemoveClick(app.name)} color="danger">Remove</Button></td>
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
        <div>
          <span className="card-title">Detected K8S Resources</span>
          <div className="filter-grp">
            {/* NameSpace */}
            <div className="form-group fl">
              <label htmlFor="select">Namespace</label>
              <select
                id="select"
                className="form-control"
                onChange={props.filterNamespace}
                value={props.namespace}
              >
                <option value="All">All</option>
                <option value="services">Service</option>
                <option value="deployments">Deployment</option>
                <option value="statefulsets">StatefulSet</option>
              </select>
            </div>

            {/* Kind */}
            <div className="form-group fl">
              <label htmlFor="select">Kind</label>
              <select
                id="select"
                className="form-control"
                onChange={props.filterKind}
                value={props.kind}
              >
                <option value="All">All</option>
                <option value="services">Service</option>
                <option value="deployments">Deployment</option>
                <option value="statefulsets">StatefulSet</option>
              </select>
            </div>
          </div>
          {/* <ButtonGroup className={_s.btnGrp}>
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
          </ButtonGroup> */}
        </div>
        {props.availableApps.length > 0 ?
          <Table>
            <thead className={_s.tHead}>
              <tr>
                <th>Name</th>
                <th>Namespace</th>
                <th>Kind</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                props.availableApps.map(({ name, namespace, kind }) => (
                  <tr>
                    <th scope="row">{ name }</th>
                    <td>{ namespace }</td>
                    <td>{ kind }</td>
                    <td>
                      <Button
                        className={_s.btn}
                        onClick={() => props.onAddClick({
                          name, namespace, kind,
                        })}
                        color="success"
                      >
                        Add
                      </Button>
                    </td>
                  </tr>
                    
                ))
              }
            </tbody>
          </Table> : null }
      </CardBody>
    </Card>
    <div className={_s.btnRow}>
      <Link to="/setup/add/1" className="btn btn-secondary mr-2">Back</Link>
      <Button onClick={() => props.cacheServices(props.addedApps)} className="btn btn-primary">Next</Button>
    </div>
  </div>
);


Step2Microservices.propTypes = {
  rSelected: PropTypes.number.isRequired,
  namespace: PropTypes.string.isRequired,
  kind: PropTypes.string.isRequired,
  addedApps: PropTypes.arrayOf(appPropType).isRequired,
  availableApps: PropTypes.arrayOf(appPropType).isRequired,
  cacheServices: PropTypes.func.isRequired,
  filterNamespace: PropTypes.func.isRequired,
  filterKind: PropTypes.func.isRequired,
};


export default Step2Microservices;
