import React from "react";
import _ from "lodash";
import { Badge } from "reactstrap";


const ProblemDescription = ({ problem, ...props }) => {
  switch (problem.description.type) {
  case "node_resource_bottleneck":
    return (
      <span {...props}>
        <Badge color="primary">{ problem.description.resource }</Badge> resource bottleneck on node <Badge color="info">{ problem.description.node_name }</Badge>
      </span>
    );
  case "container_interference":
    return (
      <span {...props}>
        <Badge color="primary">{ problem.description.resource }</Badge> resource interference in container <Badge color="success">{ problem.description.pod_name }</Badge>
      </span>
    );
  }
  // if (problem.description.type === "node_resource_bottleneck") {
  //   return (
  //     <span {...props}>
  //       <Badge>{ problem.description.resource }</Badge> resource bottleneck on node <Badge>{ problem.description.node_name }</Badge>
  //     </span>
  //   );
  // if (problem.type === "resource_bottleneck") {
  //   if (_.has(problem.labels, "pod_name")) {
  //     return (
  //       <span {...props}>
  //         <Badge>{ problem.metric.type }</Badge> resource bottleneck in container <Badge>{ problem.labels.pod_name }</Badge>
  //       </span>
  //     );
  //   } else {
  //     return (
  //       <span {...props}>
  //         <Badge>{ problem.metric.type }</Badge> resource bottleneck on node <Badge>{ problem.labels.node_name }</Badge>
  //       </span>
  //     );
  //   }
  // } else if (problem.type === "over_utilization") {
  //   if (_.has(problem.labels, "pod_name")) {
  //     return (
  //       <span {...props}>
  //         <Badge>{ problem.metric.type }</Badge> over utilizes in container <Badge>{ problem.labels.pod_name }</Badge>
  //       </span>
  //     );
  //   } else {
  //     return (
  //       <span {...props}>
  //         <Badge>{ problem.metric.type }</Badge> over utilizes on node <Badge>{ problem.labels.node_name }</Badge>
  //       </span>
  //     );
  //   }
  // }
};

export default ProblemDescription;
