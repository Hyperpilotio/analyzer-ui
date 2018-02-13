import _ from "lodash";

export const makeLoadingState = (array) => {
  const statusArr = ["pending", "refreshing", "fulfilled", "rejected", "settled"];
  return _.zipObject(statusArr, _.map(statusArr, d => _.includes(array, d)));
};


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
