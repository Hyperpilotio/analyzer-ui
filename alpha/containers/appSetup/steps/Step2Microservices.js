import React from "react";
import PropTypes from "prop-types";
import {
  Card, CardBody, CardTitle,
  Table, FormGroup, Input, Button,
} from "reactstrap";
import _ from "lodash";
import { connect } from "react-redux";
import FaLoadingCircle from "react-icons/lib/fa/circle-o-notch";
import { Form, actions as modelActions } from "react-redux-form";
import { updateMicroservices, fetchAvailableServices } from "../../../actions";
import _s from "../style.scss";
import { app as appPropType } from "../../../constants/propTypes";

const getDisplayKind = kind => (
  _.get({ services: "Service", deployments: "Deployment", statefulsets: "StatefulSet" }, kind)
);

const MicroservicesTable = ({ tbodyStyle, microservices, buttonElement, buttonOnClick }) => (
  <div className={_s.MicroservicesTable}>
    <Table>
      <thead className="text-secondary">
        <tr className="row m-0">
          <th className="col">Namespace</th>
          <th className="col">Kind</th>
          <th className="col">Name</th>
          <th className="col" />
        </tr>
      </thead>
      <tbody style={tbodyStyle} className="d-block">
        { microservices.map(({ namespace, kind, name }) => (
          <tr className="row m-0" key={`${namespace}-${kind}-${name}`}>
            <td className="col">{ namespace }</td>
            <td className="col">{ getDisplayKind(kind) }</td>
            <td className="col">{ name }</td>
            <td className="col">
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
  </div>
);

MicroservicesTable.propTypes = {
  tbodyStyle: PropTypes.object.isRequired,
  microservices: PropTypes.array.isRequired,
  buttonElement: PropTypes.object.isRequired,
  buttonOnClick: PropTypes.func.isRequired,
};

class Step2Microservices extends React.Component {
  static propTypes = {
    // cacheServices: PropTypes.func.isRequired,
    microservices: PropTypes.array.isRequired,
    k8sMicroservices: PropTypes.array,
    fetchMicroservices: PropTypes.func.isRequired,
    addMicroservice: PropTypes.func.isRequired,
    removeMicroservice: PropTypes.func.isRequired,
    stepBack: PropTypes.func.isRequired,
    updateMicroservices: PropTypes.func.isRequired,
    stepNext: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }

  state = {
    namespaceFilter: "all",
    kindFilter: "all",
  }

  componentWillMount() {
    this.props.fetchMicroservices();
  }

  get detectedMicroservices() {
    const excludeSelected = _.reduce(
      _.map(this.props.microservices, ms => _.omit(ms, "service_id")),
      _.reject,
      this.props.k8sMicroservices,
    );

    const filter = {};
    if (this.state.namespaceFilter !== "all") {
      filter.namespace = this.state.namespaceFilter;
    }
    if (this.state.kindFilter !== "all") {
      filter.kind = this.state.kindFilter;
    }
    return _.filter(excludeSelected, filter);
  }

  get namespaces() {
    return _.uniq(_.map(this.props.k8sMicroservices, "namespace"));
  }

  filterNamespace(event) {
    this.setState({ namespaceFilter: event.target.value });
  }

  filterKind(event) {
    this.setState({ kindFilter: event.target.value });
  }

  render() {
    const {
      appId,
      updateMicroservices,
      isLoading,
    } = this.props;

    return (
      <Form model="createAppForm.microservices" onSubmit={microservices => updateMicroservices(microservices, appId)}>
        {/* Selected Microservices */}
        <Card className={`${_s.selectedMicroservices} ${_s.card}`}>
          <CardBody>
            <CardTitle>Selected Microservices</CardTitle>
            <MicroservicesTable
              tbodyStyle={{ height: "280px" }}
              microservices={this.props.microservices}
              buttonElement={<Button size="sm" color="danger">Remove</Button>}
              buttonOnClick={this.props.removeMicroservice}
            />
            { this.props.microservices.length <= 0 ?
              <div className={`row ${_s.noData}`}>
                <span>
                  No microservice selected, click on "Add" button to add them.
                </span>
              </div> : null
            }
          </CardBody>
        </Card>

        {/* Detected Microservices */}
        <Card className={`mt-5 mb-5 ${_s.detectedMicroservices} ${_s.card}`}>
          <CardBody>
            <div>
              <CardTitle>Detected K8S Resources</CardTitle>
              <div className="row">
                {/* NameSpace */}
                <FormGroup className="col">
                  <label htmlFor="select-namespace">Namespace</label>
                  <Input
                    id="select-namespace"
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
                  <label htmlFor="select-kind">Kind</label>
                  <Input
                    id="select-kind"
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
              tbodyStyle={{ height: "400px" }}
              microservices={this.detectedMicroservices}
              buttonElement={<Button size="sm" color="success">Add</Button>}
              buttonOnClick={this.props.addMicroservice}
            />
          </CardBody>
        </Card>
        <div className="row d-flex justify-content-end">
          <Button onClick={this.props.stepBack} className="mr-2" color="secondary">Back</Button>
          <Button type="submit" color="primary">
            { isLoading ? <FaLoadingCircle className={`mr-1 mb-1 ${_s.rotating}`} /> : null}
            Next
          </Button>
        </div>
      </Form>
    );
  }
}

const mapStateToProps = ({ createAppForm: { basicInfo, microservices, forms }, ui }) => ({
  microservices,
  appId: basicInfo.app_id,
  k8sMicroservices: forms.microservices.$form.options,
  isLoading: ui.isUpdateMicroservicesLoading,
});

const mapDispatchToProps = (dispatch, { stepNext }) => ({
  removeMicroservice: ms => dispatch(modelActions.filter(
    "createAppForm.microservices",
    added => !_.isEqual(_.omit(added, "service_id"), ms),
  )),
  addMicroservice: ms => dispatch(
    modelActions.push("createAppForm.microservices", ms),
  ),
  fetchMicroservices: () => dispatch(fetchAvailableServices()),
  updateMicroservices: (microservices, appId) => dispatch(
    updateMicroservices({ microservices, app_id: appId }, stepNext),
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Step2Microservices);

