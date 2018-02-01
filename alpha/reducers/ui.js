import _ from "lodash";
import * as actionTypes from "../actions/types";
import { makeLoadingState } from "../lib/utils";
import { LOADING, SUCCESS, FAIL } from "../constants/apiActions";


const { asyncActionTypes } = actionTypes;
const initialLoadingState = makeLoadingState([]);
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
  if (action.type === actionTypes.RESET_LOADING_STATE) {
    return _.setWith(
      { ...state },
      _.has(action, "key") ? [action.actionName, "map", action.key] : action.actionName,
      makeLoadingState(),
      _.clone,
    );
  }

  const actionName = _.findKey(actionTypes, types => _.includes(types, action.type));

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
  loadingState = { ..._.get(state, loadingStatePath), ...loadingState };
  return _.setWith({ ...state }, loadingStatePath, loadingState, _.clone);
};
