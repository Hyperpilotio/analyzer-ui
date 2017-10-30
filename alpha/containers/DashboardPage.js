import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardBody, CardTitle } from "reactstrap";
import { fetchApps } from "../actions";
import { app as appPropType } from "../constants/propTypes";


class DashboardPage extends React.Component {
  static propTypes = {
    fetchApps: PropTypes.func.isRequired,
    apps: PropTypes.arrayOf(appPropType).isRequired,
  }

  componentWillMount() {
    this.props.fetchApps();
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
          {
            this.props.apps.map(app => (
              <Col key={app._id} md={3}>
                <Card>
                  <CardBody>
                    <CardTitle>{ app.name }</CardTitle>
                    <ul>
                      { app.serviceNames.map(service => <li>{ service }</li>) }
                    </ul>
                  </CardBody>
                </Card>
              </Col>
            ))
          }
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ setup: { apps } }) => ({
  apps,
});

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(fetchApps()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardPage);
