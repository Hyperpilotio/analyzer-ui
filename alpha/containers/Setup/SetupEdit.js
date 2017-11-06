import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container, Row, Col,
  Dropdown, DropdownToggle, DropdownMenu, DropdownItem,
  TabContent, TabPane,
  Nav, NavItem, NavLink,
} from "reactstrap";
import _ from "lodash";
import classnames from "classnames";
import { Control, Form } from "react-redux-form";
import ProgressBar from "~/commons/components/ProgressBar";
import { minusStepNumber, addStepNumber, addToHyperPilot, removeFromHyperPilot } from "../../actions";
import { fetchEditApp, fetchAvaliableServices } from "../../actions/setup";
import { editStepNames } from "../../constants/models";
import { app as appPropType } from "../../constants/propTypes";


class SetupEdit extends React.Component {
  state = {
    activeTab: "1",
    dropdownOpenOne: false,
    dropdownOpenTwo: false,
    dropdownOpenThree: false,
    dropdownOpenFour: false,
  }

  componentWillMount() {
    const appId = this.props.match.params.appId;
    if (appId) {
      this.props.fetchEditApp(this.props.match.params.appId);
    }
    this.props.fetchAvaliableServices();
  }

  toggle = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }
  // TODO: changing tab state
  toggleTabs = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  render() {
    const {
      stepBack,
      stepNext,
      apps,
      editApp,
      step,
      onAddClick,
      onRemoveClick,
      availableApps,
      addedApps,
      match
    } = this.props;

    return (
      <Container>
        <Form
          model="forms.editApp"
          className="edit-app-form"
          onSubmit={app => this.handleSubmit(app)}
        >
          <div className="row mt-3">
            {location.pathname === `/setup/edit/${match.params.appId}` ?
              <h1 className="title">Configuring {editApp && editApp.name}</h1> :
              <h1 className="title">Setup a new app</h1>
            }
          </div>
          <div className="row mt-2 mb-5">
            <ProgressBar percent={25 * step} text={editStepNames[step]} />
          </div>

          { step === 1 ?
            <div className="effect-fade-in">
              
              <div className="form-group">
                <label htmlFor="appName">APP Name</label>
                <Control.text model=".name" className="form-control" id="appName" placeholder="Enter APP name" />
              </div>

              <div className="form-group">
                <label htmlFor=".type">Type</label>
                <Control.select model=".type" id=".type">
                  <option value="longRunning">long-running</option>
                  <option value="batchProcessing">batch-processing</option>
                </Control.select>
              </div>

              <Link to="/setup" className="btn btn-secondary mr-2">Cancel</Link>
              <button className="btn btn-primary" onClick={stepNext}>Next</button>
            
            </div>
            : null }

          { step === 2 ?
            <div>
              <div className="row" >
                <div className="selected-zone">
                  <h4 className="text-secondary">Selected Applications</h4>
                  {
                    addedApps.map(app => (
                      <div key={app._id}>
                        <li className="resource">{app.name}</li>
                        <li className="resource">{app.deployment_template.kind}</li>
                        <li className="resource">{app.state}</li>
                        <button onClick={() => onRemoveClick(app._id)}>remove</button>
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
                          className={classnames({ active: this.state.activeTab === "1" })}
                          onClick={() => { this.toggleTabs("1"); }}
                        >
                          All
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === "2" })}
                          onClick={() => { this.toggleTabs("2"); }}
                        >
                          Services
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === "3" })}
                          onClick={() => { this.toggleTabs("3"); }}
                        >
                        Deployments
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === "4" })}
                          onClick={() => { this.toggleTabs("4"); }}
                        >
                        Stateful Sets
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <div className="resources-data">
                              {
                                availableApps.map(app => (
                                  <div key={app._id}>
                                    <li className="resource">{app.name}</li>
                                    <li className="resource">{app.deployment_template.kind}</li>
                                    <li className="resource">{app.state}</li>
                                    <button onClick={() => onAddClick(app._id)}>add</button>
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
              <div className="row" >
                <button className="btn btn-secondary mr-2" onClick={stepBack}>Back</button>
                <button type="submit" className="btn btn-primary" onClick={stepNext}>Next</button>
              </div>
            </div>
            : null }
          { step === 3 ?
            <div>
              <div className="modal-form" >
                <div className="form-group">
                  <label htmlFor="form-metric">Metric</label>
                  <Control.text
                    id="form-metric"
                    className="form-control"
                    model=".slo.metric"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-type">Type</label>
                  <Control.select
                    id="form-type"
                    className="form-control"
                    model=".slo.type"
                  >
                    <option value="latency">Latency</option>
                    <option value="throughput">Throughput</option>
                    <option value="executeTime">Execute Time</option>
                  </Control.select>
                </div>
                <div className="form-group">
                  <label htmlFor="form-summary">Summary</label>
                  <Control.text
                    id="form-summary"
                    className="form-control"
                    model=".slo.summary"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-value">Value</label>
                  <Control.text
                    id="form-value"
                    className="form-control"
                    model=".slo.value"
                  />
                </div>

                <button className="btn btn-secondary mr-2" onClick={stepBack}>Back</button>
                <button className="btn btn-primary" onClick={stepNext}>Next</button>
              </div>
            </div>
            : null }
          { step === 4 ?
            <div>
              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Interface Management</label>

                  <Dropdown isOpen={this.state.dropdownOpenTwo} toggle={this.toggle}>
                    <DropdownToggle caret>
                      Manual
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Disabled</DropdownItem>
                      <DropdownItem>Manual</DropdownItem>
                      <DropdownItem>Semi-auto</DropdownItem>
                      <DropdownItem>Full-auto</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Bottleneck Management</label>

                  <Dropdown isOpen={this.state.dropdownOpenThree} toggle={this.toggle}>
                    <DropdownToggle caret>
                      Manual
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Disabled</DropdownItem>
                      <DropdownItem>Manual</DropdownItem>
                      <DropdownItem>Semi-auto</DropdownItem>
                      <DropdownItem>Full-auto</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Type</label>

                  <Dropdown isOpen={this.state.dropdownOpenFour} toggle={this.toggle}>
                    <DropdownToggle caret>
                      Manual
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem>Disabled</DropdownItem>
                      <DropdownItem>Manual</DropdownItem>
                      <DropdownItem>Semi-auto</DropdownItem>
                      <DropdownItem>Full-auto</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>
              </form>
              <div className="row" >
                <button className="btn btn-secondary mr-2" onClick={stepBack}>Back</button>
                <Link to="/setup" type="submit"><button className="btn btn-primary">Done</button></Link>
              </div>
            </div>
            : null }
        </Form>
      </Container>
    );
  }
}

SetupEdit.propTypes = {
  step: PropTypes.number.isRequired,
  apps: PropTypes.arrayOf(appPropType).isRequired,
  stepBack: PropTypes.func.isRequired,
  stepNext: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({ setup: { apps, step, editApp, k8sResources, addedResourceIds } }) => ({
  apps,
  step,
  editApp,
  k8sResources,
  availableApps: k8sResources.filter(resource => !addedResourceIds.includes(resource._id)),
  addedApps: k8sResources.filter(resource => addedResourceIds.includes(resource._id)),
});

const mapDispatchToProps = dispatch => ({
  stepBack: () => dispatch(minusStepNumber()),
  stepNext: () => dispatch(addStepNumber()),
  onAddClick: id => dispatch(addToHyperPilot(id)),
  onRemoveClick: id => dispatch(removeFromHyperPilot(id)),
  fetchEditApp: appId => dispatch(fetchEditApp(appId)),
  fetchAvaliableServices: () => dispatch(fetchAvaliableServices()),
  updateEditForm: data => dispatch(actions.change("forms.singleApp", data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupEdit);
