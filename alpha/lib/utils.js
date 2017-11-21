import _ from "lodash";

export const getSLODisplay = slo => (
  `${slo.type} ${slo.type === "throughput" ? ">" : "<"} ${slo.value}${slo.unit}`
);

export const resourcesToFront = (resources) => {
  const result = [];
  resources.map(({ namespace, ...kinds }) => (
    _.map(kinds, (names, kind) => (
      _.map(names, (name) => {
        result.push({ name, namespace, kind });
      })
    ))
  ));
  return result;
};

