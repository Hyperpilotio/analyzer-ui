import _ from "lodash";
import * as actionTypes from "../actions/types";
import { LOADING, SUCCESS, FAIL } from "../constants/apiActions";

const RSAATypes = _.pickBy(actionTypes, type => _.isArray(type) && type.length === 3);

const initialState = _.mapValues(
  _.mapKeys(RSAATypes, (__, name) => _.camelCase(`IS_${name}_LOADING`)),
  _.constant(false),
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
    return state;
  default:
    return state;
  }
};
