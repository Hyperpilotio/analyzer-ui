import _ from "lodash";
import * as types from "../actions/types";
import { LOADING, SUCCESS, FAIL } from "../constants/apiActions";

const RSAATypes = _.pickBy(types, type => _.isArray(type) && type.length === 3);

const initialState = _.mapValues(
  _.mapKeys(RSAATypes, (__, name) => _.camelCase(`IS_${name}_LOADING`)),
  _.constant(false),
);

export default (state = initialState, action) => {
  for (const [name, types] of _.toPairs(RSAATypes)) {
    const uiFieldName = _.camelCase(`IS_${name}_LOADING`);

    switch (action.type) {
    case types[LOADING]:
      return {
        ...state,
        [uiFieldName]: true,
      };
    case types[SUCCESS]:
      return {
        ...state,
        [uiFieldName]: false,
      };
    case types[FAIL]:
      console.error(`${name} failed`, action);
      return state;
    }
  }
  return state;
}
