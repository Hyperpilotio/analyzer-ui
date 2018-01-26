import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import FaTimesCircle from "react-icons/lib/fa/times-circle";
import FaCheckCircle from "react-icons/lib/fa/check-circle";
import { Badge } from "reactstrap";
import classnames from "classnames";
import { connect } from "react-redux";

const AppStatusBadge = ({ className, incident, isLoading }) => {
  if (isLoading) {
    return <h6>Loading...</h6>;
  }
  className = classnames("d-inline-flex", "align-items-center", className);
  let badgeProps = { color: "success" };
  let Icon = FaCheckCircle;
  let innerText = "Healthy";
  if (incident && incident.state !== "Resolved") {
    badgeProps = { color: "danger" };
    Icon = FaTimesCircle;
    innerText = incident.type;
  }
  return (
    <Badge className={className} {...badgeProps}>
      <Icon className="mr-1" />
      <h6 className="mb-0">{ innerText }</h6>
    </Badge>
  );
};

AppStatusBadge.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
};

AppStatusBadge.defaultProps = {
  className: "",
};

const mapStateToProps = ({ diagnosis: { incidents }, ui }, { appId }) => ({
  incident: _.maxBy(_.filter(incidents, { app_id: appId }), "timestamp"),
  isLoading: !_.get(ui.FETCH_APP_LATEST_INCIDENT.map, [appId, "fulfilled"], false),
});

export default connect(mapStateToProps)(AppStatusBadge);
