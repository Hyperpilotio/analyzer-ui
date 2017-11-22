import React from "react";
import PropTypes from "prop-types";
import {
  Card, CardBody, Button,
  CardTitle, Table, FormGroup, Input,
} from "reactstrap";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actions as modelActions } from "react-redux-form";
import _s from "../style.scss";
import { app as appPropType } from "../../../constants/propTypes";

const getDisplayKind = kind => (
  _.get({ services: "Service", deployments: "Deployment", statefulsets: "StatefulSet" }, kind)
);

const MicroservicesTable = ({ microservices, buttonElement, buttonOnClick }) => (
  <Table>
    <thead className="text-secondary">
      <tr>
        <th>Name</th>
        <th>Namespace</th>
        <th>Kind</th>
        <th />
      </tr>
    </thead>
    <tbody>
      { microservices.map(({ namespace, kind, name }) => (
          <tr key={`${namespace}-${kind}-${name}`}>
            <th scope="row">{ name }</th>
            <td>{ namespace }</td>
            <td>{ getDisplayKind(kind) }</td>
            <td>
              { React.cloneElement(buttonElement, {
                  onClick: () => buttonOnClick({ namespace, kind, name }),
                })
              }
            </td>
          </tr>
        ))
      }
    </tbody>
  </Table>
);

class Step2Microservices extends React.Component {
  static propTypes = {
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

  get detectedMicroservices() {
    const filter = {};
    const excludeSelected = _.reduce(this.props.microservices, _.reject, this.props.availableApps);
    if (this.state.namespaceFilter !== "all") {
      filter.namespace = this.state.namespaceFilter;
    }
    if (this.state.kindFilter !== "all") {
      filter.kind = this.state.kindFilter;
    }
    return _.filter(excludeSelected, filter);
  }

  get namespaces() {
    return _.uniq(_.map(this.props.availableApps, "namespace"));
  }

  render() {
    return (
      <div>
        {/* Selected Apps */}
        <Card className={`row ${_s.card}`}>
          <CardBody>
            <CardTitle>Selected Services</CardTitle>
            <MicroservicesTable
              microservices={this.props.microservices}
              buttonElement={<Button color="danger">Remove</Button>}
              buttonOnClick={this.props.removeMicroservice}
            />
            { this.props.microservices.length <= 0 ?
              <div className="row">
                <span className={_s.noData}>
                  No microservice selected, click on "Add" button to add them.
                </span>
              </div> : null
            }
          </CardBody>
        </Card>

        {/* Unselected Apps */}
        <Card className={`row mt-5 mb-5 ${_s.card}`}>
          <CardBody>
            <div>
              <CardTitle>Detected K8S Resources</CardTitle>
              <div className="row">
                {/* NameSpace */}
                <FormGroup className="col">
                  <label>Namespace</label>
                  <Input
                    type="select"
                    onChange={::this.filterNamespace}
                    value={this.state.namespaceFilter}
                  >
                    <option value="all">All</option>
                    { this.namespaces.map(namespace => (
                        <option key={namespace} value={namespace}>{ namespace }</option>
                      ))
                    }
                  </Input>
                </FormGroup>

                {/* Kind */}
                <FormGroup className="col">
                  <label>Kind</label>
                  <Input
                    type="select"
                    onChange={::this.filterKind}
                    value={this.state.kindFilter}
                  >
                    <option value="all">All</option>
                    <option value="services">Service</option>
                    <option value="deployments">Deployment</option>
                    <option value="statefulsets">StatefulSet</option>
                  </Input>
                </FormGroup>
              </div>
            </div>
            <MicroservicesTable
              microservices={this.detectedMicroservices}
              buttonElement={<Button color="success">Add</Button>}
              buttonOnClick={this.props.addMicroservice}
            />
          </CardBody>
        </Card>
        <div className="row d-flex justify-content-end">
          <Button onClick={this.props.stepBack} className="mr-2" color="secondary">Back</Button>
          <Button onClick={this.props.stepNext} color="primary">Next</Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ createAppForm: { microservices } }) => ({
  microservices,
});

const mapDispatchToProps = (dispatch, { microservices }) => ({
  removeMicroservice: ms => dispatch(
    modelActions.filter("createAppForm.microservices", added => !_.isEqual(added, ms)),
  ),
  addMicroservice: ms => dispatch(modelActions.push("createAppForm.microservices", ms)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step2Microservices)
