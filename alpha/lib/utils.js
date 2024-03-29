import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";

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

// eslint-disable-next-line camelcase
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

// eslint-disable-next-line camelcase
export const formToApp = ({ basicInfo, microservices, sloSource, slo, management_features }) => ({
  ...basicInfo,
  microservices,
  slo: {
    source: sloSource,
    ...slo,
  },
  management_features,
});

export const inRangeInclusive = (value, start, end) => value >= start && value <= end;

_.assign(moment.prototype, {
  tsNano() {
    return this.valueOf() * (1000 ** 2);
  },
});

export const tsToMoment = tsNano => moment(tsNano / (1000 ** 2));

export const ensureMultipleTimes = (func, n, maxWait) => {
  // func is only invoked when it has been called n times within maxWait ms
  let firstCalled = null;
  let nCalls = 0;
  return (...args) => {
    if (_.now() - firstCalled > maxWait) {
      firstCalled = _.now();
      nCalls = 1;
      return null;
    }
    nCalls += 1;
    if (nCalls >= n) {
      firstCalled = null;
      nCalls = 0;
      return func(...args);
    }
    return null;
  };
};

export const makeLoadingState = (array) => {
  const statusArr = ["pending", "refreshing", "fulfilled", "rejected", "settled"];
  return _.zipObject(statusArr, _.map(statusArr, d => _.includes(array, d)));
};

export const dispatcherProps = (...propNames) => _.zipObject(
  propNames,
  propNames.map(_.constant(PropTypes.func.isRequired)),
);
