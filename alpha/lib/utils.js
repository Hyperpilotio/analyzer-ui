import _ from "lodash";

export const getSLODisplay = slo => (
  `${slo.type} ${slo.type === "throughput" ? ">" : "<"} ${slo.value}${slo.unit}`
);

export const flattenResourcesData = resources => (
  _.flatMap(resources, ({ namespace, ...kinds }) => (
    _.flatMap(kinds, (names, kind) => (
      _.map(names, name => ({ namespace, kind, name }))
    ))
  ))
);

export const appToForm = ({ app_id, name, type, slo, management_features }) => ({
  basicInfo: { app_id, name, type },
  microservices: [],
  sloSource: slo.source,
  slo: _.omit(slo, "source"),
  management_features,
});

export const formToApp = ({ basicInfo, microservices, sloSource, slo, management_features }) => ({
  ...basicInfo,
  microservices,
  slo: {
    source: sloSource,
    ...slo,
  },
  management_features,
});
