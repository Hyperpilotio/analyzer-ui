import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";

const mapStateToProps = ({
  
});

const mapDispatchToProps = dispatch => ({
  
});

/* eslint-disable */
// @connect(mapStateToProps, mapDispatchToProps)
/* eslint-enable */

export default class GrandDashboard extends React.Component {
  static propTypes = {
    // ...withModal.propTypes,
    // ...ReactTimeout.propTypes,
    // ...dispatcherProps("fetchApps", "fetchLatestIncident", "removeAppInModal", "resetAppForm"),
    // applications: PropTypes.arrayOf(HPPropTypes.app).isRequired,
    // refreshInterval: PropTypes.number,
  }

  render() {
    // const { loadingStates, applications, resetAppForm } = this.props;

    return (
      <Container>
        <Row className="pt-4 pb-3">
          <Col>
            <h3>Applications managed by HyperPilot</h3>
          </Col>
        </Row>
        
      </Container>
    );
  }
}
