import _ from "lodash";
import * as actionTypes from "../actions/types";
import { asyncActionTypes } from "../actions/types";
import { makeLoadingState } from "../lib/utils";
import { LOADING, SUCCESS, FAIL } from "../constants/apiActions";

const initialloadingState = makeLoadingState([]);
const initialState = _.mapValues(
  actionTypes.actionTypeRegistry,
  (actionType) => {
    switch (actionType) {
    case asyncActionTypes.SIMPLE:
      return initialloadingState;
    case asyncActionTypes.TRACKABLE:
      return { map: {} };
    case asyncActionTypes.SIMPLE_AND_TRACKABLE:
      return { ...initialloadingState, map: {} };
    default:
      throw new Error(`Unknown async action type: ${actionType}`);
    }
  },
);

export default (state = initialState, action) => {
  if (action.type === actionTypes.RESET_LOADING_STATE) {
    // 判斷有沒有map
    switch (actionTypes.actionTypeRegistry[action.actionName]) {
    case asyncActionTypes.SIMPLE:
      return _.setWith(
        { ...state },
        action.actionName,
        makeLoadingState(),
        _.clone,
      );
    case asyncActionTypes.TRACKABLE:
      return _.setWith(
        { ...state },
        [action.actionName, "map", action.key],
        makeLoadingState(),
        _.clone,
      );
    case asyncActionTypes.SIMPLE_AND_TRACKABLE:
      return _.setWith(
        { ...state },
        action.actionName,
        makeLoadingState(),
        _.clone,
      );
    default:
      throw new Error(`Unknown async action type: ${actionType}`);
    }
  }

  const actionName = _.findKey(actionTypes, types => _.includes(types, action.type)); // i.e. FETCH_APPS

  if (_.isUndefined(actionName)) {
    return state;
  }

  let loadingState = null;
  const loadingStatePath = _.has(action.meta, "key") ?
    [actionName, "map", action.meta.key] :
    [actionName];
  switch (actionTypes[actionName].indexOf(action.type)) {
  case LOADING:
    
    if (_.get(state, [...loadingStatePath, "fulfilled"], false)) {
      // Refreshing with data existed
      loadingState = makeLoadingState(["refreshing", "fulfilled"]);
    } else {
      // First time loading
      loadingState = makeLoadingState(["pending"]);
    }
    break;
  case SUCCESS:
    loadingState = makeLoadingState(["fulfilled", "settled"]);
    break;
  case FAIL:
    loadingState = makeLoadingState(["rejected", "settled"]);
    break;
  default:
    throw new Error(`Unknown async action type: ${action.type}`);
  }
  return _.setWith({ ...state }, loadingStatePath, loadingState, _.clone);
};
