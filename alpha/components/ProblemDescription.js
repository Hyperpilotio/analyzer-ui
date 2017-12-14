import React from "react";
import _ from "lodash";
import { Badge } from "reactstrap";


const Resource = ({ name }) => <Badge color="primary">{ name }</Badge>
const Node = ({ name }) => <Badge color="info">{ name }</Badge>
const Pod = ({ name }) => <Badge color="success">{ name }</Badge>

const ProblemDescription = ({ problem: { description }, ...props }) => {
  switch (description.type) {
  case "node_resource_bottleneck":
    return (
      <span {...props}>
        <Resource name={description.resource} /> resource bottleneck on <Node name={description.node_name} />
      </span>
    );
  case "container_interference":
    return (
      <span {...props}>
        <Resource name={description.resource} /> resource interference in container <Pod name={description.pod_name} /> on node <Node name={description.node_name} />
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
