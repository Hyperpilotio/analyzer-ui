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
