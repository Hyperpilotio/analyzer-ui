import _ from "lodash";

export const makeLoadingState = (array) => {
  const statusArr = ["pending", "refreshing", "fulfilled", "rejected", "settled"];
  return _.zipObject(statusArr, _.map(statusArr, d => _.includes(array, d)));
};