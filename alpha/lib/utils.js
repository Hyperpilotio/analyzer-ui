import _ from "lodash";

export const getSLODisplay = ({ metric, threshold }) => (
  `${metric.type} ${threshold.type === "UB" ? "<" : ">"} ${threshold.value} ${threshold.unit}`
);

export const getKindDisplay = kind => (
  _.get({ services: "Service", deployments: "Deployment", statefulsets: "StatefulSet" }, kind)
);

export const flattenResourcesData = resources => (
  _.flatMap(resources, ({ namespace, ...kinds }) => (
    _.flatMap(kinds, (names, kind) => (
      _.map(names, name => ({ namespace, kind, name }))
    ))
  ))
);

export const appToForm = ({ app_id, name, type, slo, microservices, management_features }) => {
  const formData = { basicInfo: { app_id, name, type } };
  if (!_.isUndefined(microservices)) {
    _.assign(formData, { microservices });
  }
  if (!_.isUndefined(slo)) {
    if (_.has(slo, "source")) {
      formData.sloSource = slo.source;
    }
    formData.slo = _.omit(slo, "source");
  }
  if (!_.isUndefined(management_features)) {
    _.assign(formData, { management_features });
  }
  return formData;
};

export const formToApp = ({ basicInfo, microservices, sloSource, slo, management_features }) => ({
  ...basicInfo,
  microservices,
  slo: {
    source: sloSource,
    ...slo,
  },
  management_features,
});


export const getProblemType = (incidents, app_name) => {
  const problem = _.find(incidents, { app_name });

  if (problem) {
    const name = problem.id.split("-")[0];
    let color;
    if (name === "incident") {
      color = "danger";
    } else if (name === "risk") {
      color = "warning";
    } else if (name === "opportunity") {
      color = "success";
    }

    return {
      name,
      color,
      isExist: true,
    };
  }

  return {
    name: null,
    color: null,
    isExist: false,
  };
};
