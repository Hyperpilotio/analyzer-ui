import React from "react";
import _ from "lodash";
import { Badge } from "reactstrap";


const ProblemDescription = ({ problem, ...props }) => {
  if (problem.type === "resource_bottleneck") {
    if (_.has(problem.labels, "pod_name")) {
      return (
        <span {...props}>
          <Badge>{ problem.metric.type }</Badge> resource bottleneck in container <Badge>{ problem.labels.pod_name }</Badge>
        </span>
      );
    } else {
      return (
        <span {...props}>
          <Badge>{ problem.metric.type }</Badge> resource bottleneck on node <Badge>{ problem.labels.node_name }</Badge>
        </span>
      );
    }
  } else if (problem.type === "over_utilization") {
    if (_.has(problem.labels, "pod_name")) {
      return (
        <span {...props}>
          <Badge>{ problem.metric.type }</Badge> over utilizes in container <Badge>{ problem.labels.pod_name }</Badge>
        </span>
      );
    } else {
      return (
        <span {...props}>
          <Badge>{ problem.metric.type }</Badge> over utilizes on node <Badge>{ problem.labels.node_name }</Badge>
        </span>
      );
    }
  }
};

export default ProblemDescription;
