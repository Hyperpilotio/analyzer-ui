import React from "react";
import _ from "lodash";
import { Badge } from "reactstrap";


const Resource = ({ name }) => <Badge color="primary">Resource: { name }</Badge>
const Node = ({ name }) => <Badge color="info">Node: { name }</Badge>
const Pod = ({ name }) => <Badge color="success">Container: { name }</Badge>
const Instance = ({ name }) => <Badge color="warning">Instance Type: { name }</Badge>

export const ProblemDescription = ({ problem: { description }, ...props }) => {
  switch (description.type) {
    case "container_over_utilization":
      return (
        <span {...props}>
          <Resource name={description.resource} /> over-utilization in <Pod name={description.pod_name} /> on <Node name={description.node_name} />
        </span>
      );
  case "node_resource_bottleneck":
    return (
      <span {...props}>
        <Resource name={description.resource} /> bottleneck on <Node name={description.node_name} />
      </span>
    );
  case "container_interference":
    return (
      <span {...props}>
        <Resource name={description.resource} /> interference from <Pod name={description.pod_name} /> on <Node name={description.node_name} />
      </span>
    );
  default:
    return <span {...props}>{ JSON.stringify(description) }</span>
  }
};

export const RemediationDescription = ({ option, ...props }) => {
  switch (option.action) {
  // This commented section is for handling the remediation descriptions according to Alpha 2
  // Analyzer API document, the uncommented ones are for handling the actual results produced by
  // analyzer at the moment. But eventually analyzer should produce results that matches the API
  // spec, thus I'm keeping this section of code commented.
  // case "upgrade_node":
  //   return (
  //     <span {...props}>
  //       Upgrade <Node name={option.metadata.node_name} /> to <Instance name={option.spec.instance_type} />
  //     </span>
  //   );
  // case "throttle_container":
  //   return (
  //     <span {...props}>
  //       Throttle <Resource name={_.first(_.keys(option.spec.resources.limits))} /> of <Pod name={option.metadata.pod_name} /> to {_.first(_.values(option.spec.resources.limits))}
  //     </span>
  //   );
  // case "upsize_container":
  //   return (
  //     <span {...props}>
  //       Upsize <Resource name={_.first(_.keys(option.spec.resources.limits))} /> of <Pod name={option.metadata.pod_name} /> to {_.first(_.values(option.spec.resources.limits))}
  //     </span>
  //   );
  case "upgrade_node":
    return (
      <span {...props}>
        Upgrade <Node name={option.metadata.node_name} /> for {option.spec.level_up} level
      </span>
    );
  case "move_pod":
    return (
      <span {...props}>
        Move <Pod name={option.metadata.pod_name} /> from <Node name={option.spec.source_node} /> to <Node name={option.spec.destination_node} />
      </span>
    );
  case "throttle_container":
    return (
      <span {...props}>
        Throttle <Pod name={option.metadata.pod_name} /> to request {option.spec.resource_limits_ratio} of the original resource request
      </span>
    );
  case "upsize_container":
    return (
      <span {...props}>
        Upsize <Pod name={option.metadata.pod_name} /> to request {option.spec.resource_limits_ratio} of the original resource request
      </span>
    );
  default:
    return <span {...props}>{ JSON.stringify(option) }</span>;
  }
};

export const ResourceGraphTitle = ({ problem }) => {
  const desc = problem.description;
  if (_.has(desc, "pod_name")) {
    return (
      <h5 className="text-center">
        <Resource name={desc.resource} /> usage in <Pod name={desc.pod_name} />
      </h5>
    );
  } else if (_.has(desc, "node_name")) {
    return (
      <h5 className="text-center">
        <Resource name={desc.resource} /> usage on <Node name={desc.node_name} />
      </h5>
    )
  }
};
