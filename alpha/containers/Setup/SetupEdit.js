import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import classnames from "classnames";
import {
  Control,
  Form,
} from "react-redux-form";
import ProgressBar from "~/commons/components/ProgressBar";
import {
  minusStepNumber,
  addStepNumber,
} from "../../actions";
import {
  editStepNames,
} from "../../constants/models";
import {
  app as appPropType,
} from "../../constants/propTypes";

class SetupEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      dropdownOpenOne: false,
      dropdownOpenTwo: false,
      dropdownOpenThree: false,
      dropdownOpenFour: false,
    };
  }
  // TODO: form submit method
  onSubmitSlo = ({ slo }) => {
    this.props.stepNext();
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
      step,
      location,
      apps,
    } = this.props;

    const params = new URLSearchParams(location.search);
    const iid = params.get("iid");

    return (
      <Container>
        <div className="row mt-3">
          {location.pathname.indexOf("edit") !== -1 ?
            <h1 className="title">{`Configuring "${apps && apps[iid - 1].name}"`}</h1> :
            <h1 className="title">Setup a new app</h1>
          }
        </div>
        <div className="row mt-2 mb-5">
          <ProgressBar percent={25 * step} text={editStepNames[step]} />
        </div>

        { step === 1 ?
          <div className="effect-fade-in">
            <form>
              <div className="form-group">
                <label htmlFor="appName">APP Name</label>
                <input type="text" className="form-control" id="appName" placeholder="Enter APP name" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Type</label>

                <Dropdown isOpen={this.state.dropdownOpenOne} toggle={this.toggle}>
                  <DropdownToggle caret>
                    long-running
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>long-running</DropdownItem>
                    <DropdownItem>batch-processing</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <Link to={"/setup"} className="btn btn-secondary mr-2">Cancel</Link>
              <button type="submit" className="btn btn-primary" onClick={stepNext}>Next</button>
            </form>
          </div>
          : null }

        { step === 2 ?
          <div>
            <div className="row" >
              <div className="selected-zone">
                <h4 className="text-secondary">Selected Applications</h4>
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
                          <h4>Tab 1 Contents</h4>
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
            <div className="row" >
              <Form
                model="forms.slo"
                className="modal-form"
                onSubmit={slo => this.onSubmitSlo(slo)}
              >
                <div className="form-group">
                  <label htmlFor="form-metric">Metric</label>
                  <Control.text
                    id="form-metric"
                    className="form-control"
                    model=".metric"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-type">Type</label>
                  <Control.select
                    id="form-type"
                    className="form-control"
                    model=".type"
                  >
                    <option value="latency">Latency</option>
                    <option value="Throughput">Throughput</option>
                    <option value="Execute Time">Execute Time</option>
                  </Control.select>
                </div>
                <div className="form-group">
                  <label htmlFor="form-summary">Summary</label>
                  <Control.text
                    id="form-summary"
                    className="form-control"
                    model=".summary"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="form-value">Value</label>
                  <Control.text
                    id="form-value"
                    className="form-control"
                    model=".value"
                  />
                </div>

                <button className="btn btn-secondary mr-2" onClick={stepBack}>Back</button>
                <button type="submit" className="btn btn-primary">Next</button>

              </Form>
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
      </Container>
    );
  }
}

SetupEdit.propTypes = {
  step: PropTypes.number.isRequired,
  location: PropTypes.objectOf.isRequired,
  apps: PropTypes.arrayOf(appPropType).isRequired,
  stepBack: PropTypes.func.isRequired,
  stepNext: PropTypes.func.isRequired,
};

const mapStateToProps = ({ setup: { step, apps, addedAppIds } }) => ({
  apps,
  step,
  availableApps: apps.filter(app => !addedAppIds.includes(app._id)),
  addedApps: apps.filter(app => addedAppIds.includes(app._id)),
  // editApp: apps.filter(() => addedAppIds.includes(match.params.id)),
});

const mapDispatchToProps = dispatch => ({
  stepBack: () => dispatch(minusStepNumber()),
  stepNext: () => dispatch(addStepNumber()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupEdit);
