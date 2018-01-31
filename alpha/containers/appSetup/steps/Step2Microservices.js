import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, CardTitle, FormGroup, Input } from "reactstrap";
import _ from "lodash";
import { autobind } from "core-decorators";
import { connect } from "react-redux";
import { Form, actions as modelActions } from "react-redux-form";
import * as HPPropTypes from "../../../constants/propTypes";
import { dispatcherProps } from "../../../lib/utils";
import { updateMicroservices, fetchAvailableServices } from "../../../actions";
import MicroservicesTable from "../../../components/MicroservicesTable";
import Button from "../../../components/Button";
import _s from "../style.scss";


const mapStateToProps = ({ createAppForm: { basicInfo, microservices, forms }, ui }) => ({
  microservices,
  appId: basicInfo.app_id,
  k8sMicroservices: forms.microservices.$form.options,
  loadingState: {
    fetchAvailableServices: ui.FETCH_AVAILABLE_SERVICES,
    upadteMicroservices: ui.UPDATE_MICROSERVICES,
    updateApp: ui.UPDATE_APP,
  },
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

@connect(mapStateToProps, mapDispatchToProps)
export default class Step2Microservices extends React.Component {
  static propTypes = {
    appId: PropTypes.string,
    microservices: PropTypes.arrayOf(HPPropTypes.microservice).isRequired,
    k8sMicroservices: PropTypes.arrayOf(HPPropTypes.microservice),
    loadingState: PropTypes.objectOf(HPPropTypes.loadingState).isRequired,
    stepBack: PropTypes.func.isRequired,
    ...dispatcherProps(
      "fetchMicroservices", "addMicroservice", "removeMicroservice", "updateMicroservices",
    ),
  }

  static defaultProps = {
    appId: null,
    k8sMicroservices: [],
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
      this.props.k8sMicroservices, // initialValue
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

  @autobind
  filterNamespace(event) {
    this.setState({ namespaceFilter: event.target.value });
  }

  @autobind
  filterKind(event) {
    this.setState({ kindFilter: event.target.value });
  }

  render() {
    const { appId, loadingState } = this.props;

    return (
      <Form
        model="createAppForm.microservices"
        onSubmit={microservices => this.props.updateMicroservices(microservices, appId)}
      >
        {/* Selected Microservices */}
        <Card className={`${_s.selectedMicroservices} ${_s.card}`}>
          <CardBody>
            <CardTitle>Selected Microservices</CardTitle>
            <MicroservicesTable
              tbodyStyle={{ height: "280px", overflowY: "scroll" }}
              microservices={this.props.microservices}
              buttonElement={<Button size="sm" color="danger">Remove</Button>}
              buttonOnClick={this.props.removeMicroservice}
              loadingState={loadingState}
            />
            { this.props.microservices.length <= 0 ?
              <div className={`row ${_s.noData}`}>
                <span>
                  No microservice selected, click on &quot;Add&quot; button to add them.
                </span>
              </div> : null
            }
          </CardBody>
        </Card>

        {/* Detected Microservices */}
        <Card className={`mt-5 mb-5 ${_s.card}`}>
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
                    onChange={this.filterNamespace}
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
                    onChange={this.filterKind}
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
              tbodyStyle={{ height: "400px", overflowY: "scroll" }}
              microservices={this.detectedMicroservices}
              buttonElement={<Button size="sm" color="success">Add</Button>}
              buttonOnClick={this.props.addMicroservice}
              loadingState={loadingState}
            />
          </CardBody>
        </Card>
        <div className="row d-flex justify-content-end">
          <Button onClick={this.props.stepBack} className="mr-2" color="secondary">Back</Button>
          <Button
            isLoading={_.get(loadingState.upadteMicroservices.map, [appId, "pending"], false)}
            color="primary"
          >Next</Button>
        </div>
      </Form>
    );
  }
}
