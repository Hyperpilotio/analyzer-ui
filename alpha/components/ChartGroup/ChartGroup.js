import React from "react";
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

export default ChartGroup;
