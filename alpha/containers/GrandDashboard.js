import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { actions as formActions } from "react-redux-form";
import ReactRouterPropTypes from "react-router-prop-types";
import ReactTimeout from "react-timeout";
import FaEdit from "react-icons/lib/fa/edit";
import MdDelete from "react-icons/lib/md/delete";
import { Container, Row, Col, Table } from "reactstrap";
import Spinner from "react-spinkit";
import Linked from "~/commons/components/Linked";
import AppStatusBadge from "../components/AppStatusBadge";
import { fetchApps, fetchAppLatestIncident, removeApp } from "../actions";
import { getSLODisplay } from "../lib/utils";
import withModal from "../lib/withModal";
import * as modalTypes from "../constants/modalTypes";
import _s from "./style.scss";


const mapStateToProps = ({
  ui,
  applications,
  diagnosis: { incidents },
}) => ({
  applications: _.reject(applications, { state: "Unregistered" }),
  incidents,
  loadingStates: {
    fetchApps: ui.FETCH_APPS,
    fetchLatestIncident: ui.FETCH_APP_LATEST_INCIDENT,
    removeApp: ui.REMOVE_APP,
  },
});

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(fetchApps()),
  removeAppInModal: appId => dispatch(removeApp(appId)),
  resetAppForm: () => {
    ["basicInfo", "microservices", "sloSource", "slo", "management_features"].forEach(
      form => dispatch(formActions.reset(`createAppForm.${form}`)),
    );
  },
  fetchLatestIncident: appId => dispatch(fetchAppLatestIncident(appId)),
});

@connect(mapStateToProps, mapDispatchToProps)
@ReactTimeout
@withModal
export default class GrandDashboard extends React.Component {
  static propTypes = {
    match: ReactRouterPropTypes.match.isRequired,
    fetchApps: PropTypes.func.isRequired,
    openModal: PropTypes.func.isRequired,
    removeAppInModal: PropTypes.func.isRequired,
    resetAppForm: PropTypes.func.isRequired,
    refreshInterval: PropTypes.number,
  }

  static defaultProps = {
    refreshInterval: 30 * 1000,
  }

  componentDidMount() {
    this.refetchApps();
  }

  async refetchApps() {
    await this.props.fetchApps();
    await Promise.all(this.props.applications.map(
      ({ app_id }) => this.props.fetchLatestIncident(app_id),
    ));
    this.props.setTimeout(::this.refetchApps, this.props.refreshInterval);
  }

  openRemoveModal(appId) {
    this.props.openModal(
      modalTypes.ACTION_MODAL,
      {
        title: "Delete app",
        message: "Are you sure you want to delete this app?",
        onSubmit: () => this.props.removeAppInModal(appId),
      },
    );
  }

  render() {
    const { loadingStates, applications, resetAppForm } = this.props;

    return (
      <Container>
        <Row className="pt-4 pb-3">
          <Col>
            <h3>Applications managed by HyperPilot</h3>
          </Col>
        </Row>
        <Row>
          <Link to="/apps/new" className="btn btn-primary mt-5 mb-2" onClick={resetAppForm}>
            + Add
          </Link>
        </Row>
        <Row>
          <Table className={_s.appsTable} hover>
            <thead>
              <tr>
                <th>App Name</th>
                <th>Type</th>
                <th>Services</th>
                <th>SLO</th>
                <th>App Status</th>
                <th>State</th>
                <th />
              </tr>
            </thead>
            <tbody>
              { loadingStates.fetchApps.pending ?
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    <div className={_s.loaderCon}>
                      <Spinner fadeIn="quarter" name="pacman" />
                    </div>
                  </td>
                </tr> :
                applications.map((app) => {
                  const removeAppCellContent = (
                    _.get(loadingStates.removeApp.map, [app.app_id, "pending"], false) ? (
                      <div className={_s.loaderCon}>
                        <Spinner fadeIn="quarter" name="wave" />
                        <span>Deleting...</span>
                      </div>
                    ) : (
                      <div>
                        <Link
                          onClick={e => e.stopPropagation()}
                          className="mr-2"
                          to={`/apps/${app.app_id}/edit/1`}
                        >
                          <FaEdit className={_s.iconGrp} />
                        </Link>
                        <MdDelete
                          className={_s.iconGrp}
                          onClick={(e) => {
                            e.stopPropagation();
                            this.openRemoveModal(app.app_id);
                          }}
                        />
                      </div>
                    )
                  );
                  switch (app.state) {
                  case "Registered":
                    return (
                      <Linked tag="tr" to={`/apps/${app.app_id}/edit/1`} key={app.app_id}>
                        <td>{ app.name }</td>
                        <td>{ app.type }</td>
                        <td />
                        <td />
                        <td />
                        <td>{ app.state }</td>
                        <td>{ removeAppCellContent }</td>
                      </Linked>
                    );
                  case "Active":
                    return (
                      <Linked tag="tr" to={`/dashboard/${app.app_id}`} key={app.app_id}>
                        <td>{ app.name }</td>
                        <td>{ app.type }</td>
                        <td>{ _.size(app.microservices) }</td>
                        <td>{ getSLODisplay(app.slo) }</td>
                        <td>
                          <AppStatusBadge className={_s.AppStatusBadge} appId={app.app_id} />
                        </td>
                        <td>{ app.state }</td>
                        <td>{ removeAppCellContent }</td>
                      </Linked>
                    );
                  default:
                    return null;
                  }
                })
              }
            </tbody>
          </Table>
          { _.isEmpty(applications) && loadingStates.fetchApps.fulfilled ?
            <div className={_s.noData}>
              <span>
                No applications managed by HyperPilot, click on &quot;Add&quot; button to add them.
              </span>
            </div>
            : null
          }
        </Row>
      </Container>
    );
  }
}
