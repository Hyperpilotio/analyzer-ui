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


export default class Step2Microservices extends React.Component {
  static propTypes = {
    addedApps: PropTypes.arrayOf(appPropType).isRequired,
    availableApps: PropTypes.arrayOf(appPropType).isRequired,
    cacheServices: PropTypes.func.isRequired,
  }

  state = {
    namespaceFilter: "all",
    kindFilter: "all",
  }

  filterNamespace(event) {
    this.setState({ namespaceFilter: event.target.value });
  }

  filterKind(event) {
    this.setState({ kindFilter: event.target.value });
  }

  getAppsList() {
    const filter = {};
    if (this.state.namespaceFilter !== "all") {
      filter.namespace = this.state.namespaceFilter;
    }
    if (this.state.kindFilter !== "all") {
      filter.kind = this.state.kindFilter;
    }
    return _.filter(this.props.availableApps, filter);
  }

  getNamespaces() {
    return _.uniq(_.map(this.props.availableApps, "namespace"));
  }

  getDisplayKind(kind) {
    return _.get({ services: "Service", deployments: "Deployment", statefulsets: "StatefulSet" }, kind);
  }

  render() {
    const { addedApps, onRemoveClick, availableApps } = this.props;
    return (
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
                { addedApps.map(({ namespace, kind, name }) => (
                    <tr key={`${namespace}-${kind}-${name}`}>
                      <th scope="row">{ name }</th>
                      <td>{ namespace }</td>
                      <td>{ this.getDisplayKind(kind) }</td>
                      <td>
                        <Button
                          className={_s.btn}
                          onClick={() => onRemoveClick({ namespace, kind, name })}
                          color="danger"
                        >Remove</Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            { addedApps.length <= 0 ?
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
                    onChange={::this.filterNamespace}
                    value={this.state.namespaceFilter}
                  >
                    <option value="all">All</option>
                    { this.getNamespaces().map(namespace => (
                        <option key={namespace} value={namespace}>{ namespace }</option>
                      ))
                    }
                  </select>
                </div>

                {/* Kind */}
                <div className="form-group fl">
                  <label htmlFor="select">Kind</label>
                  <select
                    id="select"
                    className="form-control"
                    onChange={::this.filterKind}
                    value={this.state.kindFilter}
                  >
                    <option value="all">All</option>
                    <option value="services">Service</option>
                    <option value="deployments">Deployment</option>
                    <option value="statefulsets">StatefulSet</option>
                  </select>
                </div>
              </div>
            </div>
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
                { this.getAppsList().map(({ name, namespace, kind }) => (
                    <tr key={`${namespace}-${kind}-${name}`}>
                      <th scope="row">{ name }</th>
                      <td>{ namespace }</td>
                      <td>{ this.getDisplayKind(kind) }</td>
                      <td>
                        <Button
                          className={_s.btn}
                          onClick={() => this.props.onAddClick({
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
            </Table>
          </CardBody>
        </Card>
        <div className={_s.btnRow}>
          <Link to="/setup/add/1" className="btn btn-secondary mr-2">Back</Link>
          <Button
            onClick={() => this.props.cacheServices(props.addedApps)}
            className="btn btn-primary"
          >Next</Button>
        </div>
      </div>
    );
  }
}
