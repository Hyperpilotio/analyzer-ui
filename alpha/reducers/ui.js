import _ from "lodash";
import * as actionTypes from "../actions/types";
import { LOADING, SUCCESS, FAIL, SINGLE_PENDING } from "../constants/apiActions";

// 可以在這邊做決斷
const RSAATypes = _.pickBy(actionTypes, type => _.isArray(type) && type.length === 3);
const simpleKeys = ["isLoading", "isFulfilled", "isRejected", "isSettled", "isRefreshing"];

const initialState = _.mapValues(
  _.mapKeys(RSAATypes, (__, name) => (_.camelCase(`${name}`))),
  (__, name) => {
    const objectType = actionTypes.actionTypeRegistry[_.upperCase(name).replace(/ /g, "_")];
    if (objectType === actionTypes.asyncActionTypes.SIMPLE) {
      return (_.zipObject(simpleKeys, _.map(simpleKeys, () => (false))));
    } else if (objectType === actionTypes.asyncActionTypes.TRACKABLE) {
      return ({ map: {} });
    }
    return ({
      ..._.zipObject(simpleKeys, _.map(simpleKeys, () => (false))),
      map: {},
    });
  },
);

export default (state = initialState, action) => {
  const actionName = _.findKey(actionTypes, types => _.includes(types, action.type));

  if (_.isUndefined(actionName)) {
    return state;
  }

  // 在這邊依照actionName查詢對應的type

  switch (actionTypes[actionName].indexOf(action.type)) {
  case LOADING:
    
    return {
      ...state,
      [_.camelCase(actionName)]: {
        ...state[_.camelCase(actionName)],
        [_.camelCase(`IS_${actionName}_LOADING`)]: true,
        [_.camelCase(`IS_${actionName}_FULFILLED`)]: false,
      },
    };
  case SUCCESS:
    
    let mapObject = {}; 
    // 列表型
    if (actionTypes.actionTypeRegistry[actionName] === actionTypes.asyncActionTypes.SIMPLE_AND_TRACKABLE) {
      mapObject = {
        map: _.flatMap(
          action.payload.data,
          item => _.map(
            item,
            () => (_.zipObject(simpleKeys, _.map(simpleKeys, () => (false)))),
          ),
        )
      }
    } else if (actionTypes.actionTypeRegistry[actionName] === actionTypes.asyncActionTypes.TRACKABLE) {
      mapObject = {
        map: _.flatMap(
          action.payload.data.app_id,
          item => _.map(
            item,
            () => (_.zipObject(simpleKeys, _.map(simpleKeys, () => (false)))),
          ),
        )
      }
    } else {
      mapObject = {
        map: _.flatMap(
          action.payload.data.app_id,
          item => _.map(
            item,
            () => (_.zipObject(simpleKeys, _.map(simpleKeys, () => (false)))),
          ),
        )
      }
    }

    return {
      ...state,
      [_.camelCase(actionName)]: {
        ...state[_.camelCase(actionName)],
        [_.camelCase(`IS_${actionName}_LOADING`)]: false,
        [_.camelCase(`IS_${actionName}_FULFILLED`)]: true,
        [_.camelCase(`IS_${actionName}_REJECTED`)]: false,
        ...mapObject,
      },
      // [uiFieldName]: false,
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
      [_.camelCase(actionName)]: {
        ...state[_.camelCase(actionName)],
        [_.camelCase(`IS_${actionName}_LOADING`)]: false,
        [_.camelCase(`IS_${actionName}_FULFILLED`)]: true,
        [_.camelCase(`IS_${actionName}_REJECTED`)]: true,
      },
    };
  case SINGLE_PENDING:
    return {
      ...state,
      [_.camelCase(`IS_${actionName}_LOADING`)]: true,
    };
  default:
    return state;
  }
};
