import _ from "lodash";
import moment from "moment";

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

_.assign(moment.prototype, {
  tsNano() {
    return this.valueOf() * (1000 ** 2);
  }
});

export const tsToMoment = tsNano => moment(tsNano / (1000 ** 2));
