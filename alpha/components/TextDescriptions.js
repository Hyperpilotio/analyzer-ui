import React from "react";
import _ from "lodash";
import { Badge, Row, Col } from "reactstrap";


const Resource = ({ name }) => <Badge color="primary">Resource: { name }</Badge>
const Node = ({ name }) => <Badge color="info">Node: { name }</Badge>
const Pod = ({ name }) => <Badge color="success">Container: { name }</Badge>
const Instance = ({ name }) => <Badge color="warning">Instance Type: { name }</Badge>
const GenericLabel = ({ name, value }) => <Badge color="dark">{name}: {value}</Badge>

const fieldComponentMap = {
  resource: Resource,
  node_name: Node,
  pod_name: Pod,
};

export const ProblemDescription = ({ problem: { description }, ...props }) => {
  const typeText = _.words(description.type).map(_.capitalize).join(" ").concat(": ");
  const children = [typeText];
  _.forEach(fieldComponentMap, (Component, field) => {
    if (_.has(description, field)) {
      children.push(<Component name={description[field]} />);
      children.push(" ");
    }
  });
  return React.createElement("span", props, ...children);
};

export const RemediationDescription = ({ option, ...props }) => {
  const typeText = _.words(option.action).map(_.capitalize).join(" ").concat(": ");
  const children = [];
  _.forEach(fieldComponentMap, (Component, field) => {
    if (_.has(option.metadata, field)) {
      children.push(<Component name={option.metadata[field]} />);
      children.push(" ");
    }
  });
  _.forEach(option.spec, (value, key) => {
    children.push(<GenericLabel name={_.words(key).map(_.capitalize).join(" ")} value={value} />);
    children.push(" ")
  });
  return (
    <Row>
      <Col className="pr-0" sm="auto">{ typeText }</Col>
      <Col>{ React.createElement("span", props, ...children) }</Col>
    </Row>
  );
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
