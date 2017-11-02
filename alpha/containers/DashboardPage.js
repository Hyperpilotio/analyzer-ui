import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Container, Row, Col, Card, CardBody, CardTitle, Badge, Button } from "reactstrap";
import FaChevronRight from "react-icons/lib/fa/chevron-right";
import { fetchApps, fetchEvents } from "../actions";
import { app as appPropType, event as eventPropType } from "../constants/propTypes";


const eventTypeColorMap = {
  incident: "danger",
  risk: "warning",
  opportunity: "success",
};

const EventItem = ({ type, event }) => (
  <Button style={{ width: "100%", textAlign: "left" }} color="link">
    <Row>
      <Col md={5}>
        <FaChevronRight className="mr-2" />
        { event.type }
      </Col>
      <Col>
        <Badge
          style={{ fontSize: "100%" }}
          className="mr-2 text-capitalized"
          color={eventTypeColorMap[type]}
        >{ type }</Badge>
      </Col>
    </Row>
  </Button>
);

EventItem.propTypes = {
  type: PropTypes.string.isRequired,
  event: eventPropType.isRequired,
};


class DashboardPage extends React.Component {
  static propTypes = {
    fetchApps: PropTypes.func.isRequired,
    fetchEvents: PropTypes.func.isRequired,
    apps: PropTypes.arrayOf(appPropType).isRequired,
    incidents: PropTypes.objectOf(eventPropType).isRequired,
    risks: PropTypes.objectOf(eventPropType).isRequired,
    opportunities: PropTypes.objectOf(eventPropType).isRequired,
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
          {
            this.props.apps.map(app => (
              <Col className="pb-3" md={6} key={app._id}>
                <Card>
                  <CardBody>
                    <CardTitle className="mb-3">{ app.name }</CardTitle>
                    {
                      this.props.incidents[app._id].map(
                        event => <EventItem key={event.id} type="incident" event={event} />,
                      )
                    }
                    {
                      this.props.risks[app._id].map(
                        event => <EventItem key={event.id} type="risk" event={event} />,
                      )
                    }
                    {
                      this.props.opportunities[app._id].map(
                        event => <EventItem key={event.id} type="opportunity" event={event} />,
                      )
                    }
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
