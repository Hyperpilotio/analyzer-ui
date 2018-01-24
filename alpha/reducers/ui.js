import _ from "lodash";
import * as actionTypes from "../actions/types";
import { asyncActionTypes } from "../actions/types";
import { setAsyncStatus } from "../lib/utils";
import { LOADING, SUCCESS, FAIL } from "../constants/apiActions";

const initialLoadingState = setAsyncStatus([]);
const initialState = _.mapValues(
  actionTypes.actionTypeRegistry,
  (actionType) => {
    switch (actionType) {
    case asyncActionTypes.SIMPLE:
      return initialLoadingState;
    case asyncActionTypes.TRACKABLE:
      return { map: {} };
    case asyncActionTypes.SIMPLE_AND_TRACKABLE:
      return { ...initialLoadingState, map: {} };
    default:
      throw new Error(`Unknown async action type: ${actionType}`);
    }
  },
);

export default (state = initialState, action) => {
  const actionName = _.findKey(actionTypes, types => _.includes(types, action.type)); // i.e. FETCH_APPS
  if (_.isUndefined(actionName)) {
    return state;
  } else if (action.type === actionTypes.RESET_UI) {
    return initialState;
  }

  let loadingState = null;
  const loadingStatePath = _.has(action.meta, "key") ?
    [actionName, "map", action.meta.key] :
    [actionName];
  switch (actionTypes[actionName].indexOf(action.type)) {
  case LOADING:
    
    if (_.get(state, [...loadingStatePath, "fulfilled"], false)) {
      // Refreshing with data existed
      loadingState = setAsyncStatus(["refreshing", "fulfilled"]);
    } else {
      // First time loading
      loadingState = setAsyncStatus(["pending"]);
    }
    break;
  case SUCCESS:
    loadingState = setAsyncStatus(["fulfilled", "settled"]);
    break;
  case FAIL:
    loadingState = setAsyncStatus(["rejected", "settled"]);
    break;
  default:
    throw new Error(`Unknown async action type: ${action.type}`);
  }
  return _.setWith({ ...state }, loadingStatePath, loadingState, _.clone);
};
