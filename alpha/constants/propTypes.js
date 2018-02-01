import PropTypes from "prop-types";
import ReactTimeout from "react-timeout";
import { PromiseState } from "react-refetch";

ReactTimeout.propTypes = {
  setTimeout: PropTypes.func.isRequired,
  setInterval: PropTypes.func.isRequired,
  setImmediate: PropTypes.func.isRequired,
};

export const metric = PropTypes.shape({
  name: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    value: PropTypes.string,
  })),
  type: PropTypes.string,
});

export const threshold = PropTypes.shape({
  type: PropTypes.string,
  unit: PropTypes.string,
  value: PropTypes.number,
});

export const incident = PropTypes.shape({
  app_id: PropTypes.string,
  incident_id: PropTypes.string,
  labels: PropTypes.objectOf(PropTypes.string),
  metric,
  severity: PropTypes.number,
  state: PropTypes.oneOf(["Active", "Resolved"]),
  timestamp: PropTypes.number,
  type: PropTypes.string,
});

export const remediationOption = PropTypes.shape({
  action: PropTypes.string,
  metadata: PropTypes.objectOf(PropTypes.string),
  spec: PropTypes.objectOf(PropTypes.any),
});

export const result = PropTypes.shape({
  app_id: PropTypes.string,
  app_name: PropTypes.string,
  incident_id: PropTypes.string,
  timestamp: PropTypes.number,
  top_related_problems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    rank: PropTypes.number,
    remediation_options: PropTypes.arrayOf(remediationOption),
  })),
});

export const problemMetric = PropTypes.shape({
  name: PropTypes.string,
  source: PropTypes.string,
  analysis_result: PropTypes.shape({
    correlation: PropTypes.number,
    score: PropTypes.number,
    severity: PropTypes.number,
  }),
});

export const problem = PropTypes.shape({
  problem_id: PropTypes.string,
  description: PropTypes.shape({
    type: PropTypes.string,
    resource: PropTypes.string,
    pod_name: PropTypes.string,
    node_name: PropTypes.string,
  }),
  overall_score: PropTypes.number,
  metrics: PropTypes.arrayOf(problemMetric),
});

export const microservice = PropTypes.shape({
  service_id: PropTypes.string,
  namespace: PropTypes.string,
  kind: PropTypes.string,
  name: PropTypes.string,
});

export const sloSource = PropTypes.shape({
  APM_type: PropTypes.string,
  port: PropTypes.number,
  service: microservice,
});

export const slo = PropTypes.shape({
  metric,
  source: sloSource,
  threshold,
});

export const managementFeature = PropTypes.shape({
  name: PropTypes.string,
  status: PropTypes.oneOf(["Enabled", "Disabled"]),
  remediation_policy: PropTypes.arrayOf(PropTypes.shape({
    action_name: PropTypes.string,
    mode: PropTypes.oneOf(["Manual", "Semi-Auto", "Full-Auto"]),
  })),
});

export const app = PropTypes.shape({
  app_id: PropTypes.string,
  name: PropTypes.string,
  microservices: PropTypes.arrayOf(microservice),
  slo,
  management_features: PropTypes.arrayOf(managementFeature),
  state: PropTypes.oneOf(["Active", "Registered", "Unregistered"]),
  type: PropTypes.oneOf(["long-running", "batch-processing"]),
});

const singleLoadingState = {
  pending: PropTypes.bool,
  refreshing: PropTypes.bool,
  fulfilled: PropTypes.bool,
  rejected: PropTypes.bool,
  settled: PropTypes.bool,
};

export const loadingState = PropTypes.shape({
  ...singleLoadingState,
  map: PropTypes.objectOf(PropTypes.shape(singleLoadingState)),
});

export const metricOption = PropTypes.shape({
  name: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    values: PropTypes.arrayOf(PropTypes.string),
  })),
});

export const refetch = PropTypes.instanceOf(PromiseState);
