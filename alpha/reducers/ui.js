import _ from "lodash";
import * as actionTypes from "../actions/types";
import { asyncActionTypes } from "../actions/types";
import { LOADING, SUCCESS, FAIL } from "../constants/apiActions";

const initialLoadingState = {
  pending: true,
  refreshing: false,
  fulfilled: false,
  rejected: false,
  settled: false,
};
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
  }

  let loadingState = null;
  const loadingStatePath = _.has(action.meta, "key") ?
    [actionName, "map", action.meta.key] :
    [actionName];

  switch (actionTypes[actionName].indexOf(action.type)) {
  case LOADING:
    if (_.get(state, [...loadingStatePath, "fulfilled"], false)) {
      loadingState = {
        ..._.get(state, loadingStatePath),
        refreshing: true,
      };
    } else {
      loadingState = initialLoadingState;
    }
    break;
  case SUCCESS:
    loadingState = {
      ..._.get(state, loadingStatePath),
      pending: false,
      refreshing: false,
      fulfilled: true,
      settled: true,
    };
    break;
  case FAIL:
    loadingState = {
      ..._.get(state, loadingStatePath),
      pending: false,
      refreshing: false,
      fulfilled: false,
      rejected: true,
      settled: true,
    };
    break;
  default:
    throw new Error(`Unknown async action type: ${action.type}`);
  }
  return _.setWith({ ...state }, loadingStatePath, loadingState, _.clone);
};
