import _ from "lodash";
import * as actionTypes from "../actions/types";
import { LOADING, SUCCESS, FAIL, SINGLE_PENDING } from "../constants/apiActions";

// 可以在這邊做決斷
const RSAATypes = _.pickBy(actionTypes, type => _.isArray(type) && type.length === 3);

const simpleStates = ["isLoading", "isFulfilled", "isRejected", "isSettled", "isRefreshing"];
const trackableKeys = ["map"];

const initialState = _.mapValues(
  _.mapKeys(RSAATypes, (__, name) => (_.camelCase(`${name}`))),
  () => (_.zipObject(simpleStates, _.map(simpleStates, () => (false)))),
);

export default (state = initialState, action) => {
  const actionName = _.findKey(actionTypes, types => types.includes(action.type));

  if (_.isUndefined(actionName)) {
    return state;
  }

  const uiFieldName = _.camelCase(`IS_${actionName}_LOADING`);

  switch (actionTypes[actionName].indexOf(action.type)) {
  case LOADING:
    return {
      ...state,
      [uiFieldName]: true,
    };
  case SUCCESS:
    return {
      ...state,
      [uiFieldName]: false,
    };
  case FAIL:
    console.error(`${actionName} failed:`);
    if (action.payload.name === "ApiError") {
      console.error(action.payload.response);
    } else {
      console.error(action.payload);
    }
    return {
      ...state,
      [uiFieldName]: false,
    };
  case SINGLE_PENDING:
    return {
      ...state,
      [uiFieldName]: true,
    };
  default:
    return state;
  }
};
