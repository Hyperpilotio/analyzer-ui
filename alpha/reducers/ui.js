import _ from "lodash";
import * as actionTypes from "../actions/types";
import { LOADING, SUCCESS, FAIL, SINGLE_PENDING } from "../constants/apiActions";

const RSAATypes = _.pickBy(actionTypes, type => _.isArray(type) && type.length === 3);
const simpleKeys = ["isPending", "isFulfilled", "isRejected", "isSettled", "isRefreshing"];

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

  /*
  * SIMPLE: [x] mapObject
  * TRACKABLE: [v] mapObject
  * SIMPLE & TRACKABLE ~
  *   meta: [V] mapObject
  *   no meta: [x] mapObject
  */
  switch (actionTypes[actionName].indexOf(action.type)) {
  case LOADING:

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
        isPending: true,
        isFulfilled: false,
        isRejected: false,
        isSettled: false,
        ...mapObject,
      },
    };
  case SUCCESS:
    return {
      ...state,
      [_.camelCase(actionName)]: {
        ...state[_.camelCase(actionName)],
        isPending: false,
        isFulfilled: true,
        isRejected: false,
        isSettled: true,
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
        isPending: false,
        isFulfilled: false,
        isRejected: true,
        isSettled: true,
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
