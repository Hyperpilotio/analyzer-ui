import _ from "lodash";
import * as types from "../actions/types";

const initialState = {
  apps: [],
  addedAppIds: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case types.ADD_TO_HYPERPILOT:
    return { ...state, addedAppIds: _.union(state.addedAppIds, [action.appId]) };

  case types.REMOVE_FROM_HYPERPILOT:
    return { ...state, addedAppIds: _.without(state.addedAppIds, action.appId) };

  default:
    return state;
  }
};

export default reducer;
