import _ from "lodash";
import * as actionTypes from "../actions/types";
import { LOADING, SUCCESS, FAIL } from "../constants/apiActions";

const RSAATypes = _.pickBy(actionTypes, type => _.isArray(type) && type.length === 3);
const loadingStates = ["pending", "fulfilled", "rejected", "settled", "refreshing"];

const initialState = _.mapValues(
  _.mapKeys(RSAATypes, (__, name) => (_.camelCase(`${name}`))),
  (__, name) => {
    const objectType = actionTypes.actionTypeRegistry[_.upperCase(name).replace(/ /g, "_")];
    if (objectType === actionTypes.asyncActionTypes.SIMPLE) {
      return (_.zipObject(loadingStates, _.map(loadingStates, () => (false))));
    } else if (objectType === actionTypes.asyncActionTypes.TRACKABLE) {
      return ({ map: {} });
    }
    return ({
      ..._.zipObject(loadingStates, _.map(loadingStates, () => (false))),
      map: {},
    });
  },
);

export default (state = initialState, action) => {
  const actionName = _.findKey(actionTypes, types => _.includes(types, action.type)); // FETCH_APPS
  const actionType = actionTypes.actionTypeRegistry[actionName]; // SIMPLE / TRACKABLE / SIMPLE_AND_TRACKABLE
  const uiFieldName = _.camelCase(actionName);
  
  if (_.isUndefined(actionName)) {
    return state;
  }
  /*
  * SIMPLE: [x] map
  * TRACKABLE: [v] map
  * SIMPLE & TRACKABLE ~
  *   meta: [V] map
  *   no meta: [x] map
  */

  // _.has

  let map;
  const loadingState = {
    pending: true,
    fulfilled: false,
    rejected: false,
    settled: false,
  };

  switch (actionTypes[actionName].indexOf(action.type)) {
  case LOADING:
    if (actionType === actionTypes.asyncActionTypes.SIMPLE) {
      map = loadingState;
    } else if (actionType === actionTypes.asyncActionTypes.TRACKABLE) {
      map = {
        [action.meta.key]: _.zipObject(loadingStates, _.map(loadingStates, () => (false))),
      };
    } else if (_.has(action.meta, "key")) {
      map = {
        ...loadingState,
        map: {
          [action.meta.key]: _.zipObject(loadingStates, _.map(loadingStates, () => (false))),
        },
      };
    } else {
      map = {
        ...loadingState,
        map: {},
      };
    }

    return {
      ...state,
      [uiFieldName]: {
        ...state[uiFieldName],
        ...map,
      },
    };

  case SUCCESS:
    return {
      ...state,
      [uiFieldName]: {
        ...state[uiFieldName],
        pending: false,
        fulfilled: true,
        rejected: false,
        settled: true,
        map: _.has(action.meta, "key") ?
          {
            [action.meta.key]: _.zipObject(loadingStates, _.map(loadingStates, () => (false))),
          } : {},
      },
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
      [uiFieldName]: {
        ...state[uiFieldName],
        pending: false,
        fulfilled: false,
        rejected: true,
        settled: true,
      },
    };
  default:
    return state;
  }
};
