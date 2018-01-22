import React from "react";
import PropTypes from "prop-types";
import FaTimesCircle from "react-icons/lib/fa/times-circle";
import FaCheckCircle from "react-icons/lib/fa/check-circle";
import { Badge } from "reactstrap";
import classnames from "classnames";

const AppStatusBadge = ({ className, app }) => {
  className = classnames("d-inline-flex", "align-items-center", className);
  if (app.hasIncident) {
    return (
      <Badge className={className} color="danger">
        <FaTimesCircle className="mr-1" />
        <h6 className="mb-0">Has Incident</h6>
      </Badge>
    );
  }
  return (
    <Badge className={className} color="success">
      <FaCheckCircle className="mr-1" />
      <h6 className="mb-0">Healthy</h6>
    </Badge>
  );
};

AppStatusBadge.propTypes = {
  className: PropTypes.string.isRequired,

}

export default AppStatusBadge;
