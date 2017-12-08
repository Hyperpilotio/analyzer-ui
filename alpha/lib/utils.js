import _ from "lodash";

export const getSLODisplay = ({ metric, threshold }) => (
  `${metric.type} ${threshold.type === "UB" ? "<" : ">"} ${threshold.value} ${threshold.unit}`
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
    _.assign(formData, { sloSource: slo.source, slo: _.omit(slo, "source") });
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
