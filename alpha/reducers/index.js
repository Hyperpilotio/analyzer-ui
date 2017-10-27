import _ from "lodash";
import * as types from "../actions/types";

const initialState = {
  apps: [],
  addedAppIds: [],
  ui: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case types.FETCH_APPS_LOADING:
    return {
      ...state,
      ui: _.extend({}, state.ui, { isFetchAppsLoading: true }),
    };
  case types.FETCH_APPS_SUCCESS:
    return {
      ...state,
      apps: action.applications,
      ui: _.extend({}, state.ui, { isFetchAppsLoading: false }),
    };
  case types.FETCH_APPS_FAIL:
    console.error("Fetch apps failed");
    return state;

  case types.ADD_TO_HYPERPILOT:
    return { ...state, addedAppIds: _.union(state.addedAppIds, [action.appId]) };

  case types.REMOVE_FROM_HYPERPILOT:
    return { ...state, addedAppIds: _.without(state.addedAppIds, action.appId) };

  default:
    return state;
  }
};

export default reducer;
