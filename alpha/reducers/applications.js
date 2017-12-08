import _ from "lodash";
import * as types from "../actions/types";
import { SUCCESS } from "../constants/apiActions";
import { fakeArr } from "../constants/models";

const initialState = {
  apps: [],
  editApp: {},
  isHPReady: false,
};

export default function apps(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_APPS[SUCCESS]:
    return {
      ...state,
      apps: action.payload.data,
    };
  case types.UPDATE_REDUX_APPS:
    return {
      ...state,
      apps: _.map(state.apps, d => (d.app_id === action.data.app_id ? action.data : d)),
    };
  case types.REMOVE_APP[SUCCESS]:
    return {
      ...state,
      apps: _.filter(state.apps, app => app._id !== action.payload.removedAppId),
    };
  case types.BEGIN_HYPERPILOTING[SUCCESS]:
    return {
      ...state,
      isHPReady: true,
    };
  case types.FETCH_EDIT_APP_FAIL:
    console.error("Fetch edit app failed");
    return state;
  case types.FETCH_EDIT_APP_LOADING:
    return {
      ...state,
      ui: _.extend({}, state.ui, { isEditAppLoading: true }),
    };
  case types.FETCH_EDIT_APP_SUCCESS:
    return {
      ...state,
      ui: _.extend({}, state.ui, { isEditAppLoading: false }),
      editApp: action.editApp,
    };
  case types.BEGIN_HYPER_PILOTING_FAIL:
    console.error("Begin HP failed");
    return {
      ...state,
      isHPReady: false,
    };
  default:
    return state;
  }
}
