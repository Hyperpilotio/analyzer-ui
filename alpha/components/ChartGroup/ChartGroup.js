import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody } from "reactstrap";
import classnames from "classnames";
import _s from "./styles.scss";

const ChartGroup = ({ className, children }) => (
  <Card className={classnames(_s.ChartGroup, className)}>
    <CardBody>
      { children }
    </CardBody>
  </Card>
);

ChartGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ChartGroup.defaultProps = {
  className: "",
};

export default ChartGroup;
