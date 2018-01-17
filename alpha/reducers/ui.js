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
  const actionName = _.findKey(actionTypes, types => _.includes(types, action.type)); // FETCH_APPS
  const actionType = actionTypes.actionTypeRegistry[actionName]; // SIMPLE / TRACKABLE / SIMPLE_AND_TRACKABLE

  if (_.isUndefined(actionName)) {
    return state;
  }

  


  switch (actionTypes[actionName].indexOf(action.type)) {
  case LOADING:

    console.log("action", action, actionType);
    let mapObject;
    if (actionType === actionTypes.asyncActionTypes.SIMPLE) {
      mapObject = null;
    } else if (actionType === actionTypes.asyncActionTypes.TRACKABLE) {
      mapObject = {
        map: action.meta.appId,
      };
    } else {

      if (_.isUndefined(action.meta)) {
        mapObject = null;
      } else {
        mapObject = {
          map: action.payload.data
        };
      } 
      
    }
    





    return {
      ...state,
      [_.camelCase(actionName)]: {
        ...state[_.camelCase(actionName)],
        isLoading: true,
        isFulfilled: false,
        ...mapObject,
        // 這邊要判斷map是否為單一 (用type來控制)
        
      },
    };
  case SUCCESS:
    
    // console.log("action", action);


    return {
      ...state,
      [_.camelCase(actionName)]: {
        ...state[_.camelCase(actionName)],
        isLoading: false,
        isFulfilled: true,
        map: _.isUndefined(action.meta) ?
          {} :
          _.flatMap(
            [action.payload.data],
            item => _.map(
              item,
              () => (_.zipObject(simpleKeys, _.map(simpleKeys, () => (false)))),
            ),
          ),
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
