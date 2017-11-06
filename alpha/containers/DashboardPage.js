import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";
import DashboardAppsTable from "../components/DashboardAppsTable";
import { fetchApps, fetchEvents } from "../actions";
import { app as appPropType, event as eventPropType } from "../constants/propTypes";


class DashboardPage extends React.Component {
  static propTypes = {
    fetchApps: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    apps: PropTypes.arrayOf(appPropType).isRequired,
    incidents: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
    risks: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
    opportunities: PropTypes.objectOf(PropTypes.arrayOf(eventPropType)).isRequired,
  }

  componentWillMount() {
    this.props.fetchApps();
    this.props.fetchEvents();
  }

  render() {
    return (
      <Container>
        <Row className="pt-4 pb-3">
          <Col>
            <h3>Applications managed by HyperPilot</h3>
          </Col>
        </Row>
        <Row>
          <DashboardAppsTable {..._.pick(this.props, ["apps", "incidents", "risks", "opportunities"])} />
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({
  setup: { apps },
  diagnosis: { incidents, risks, opportunities },
}) => ({
  apps,
  incidents,
  risks,
  opportunities,
});

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(fetchApps()),
  fetchEvents: () => dispatch(fetchEvents()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
