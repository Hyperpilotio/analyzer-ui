import _ from "lodash";
import * as types from "../actions/types";
import { SUCCESS } from "../constants/apiActions";
import { fakeArr } from "../constants/models";
import { resourcesToFront } from "../lib/utils";

const initialState = {
  apps: [],
  editApp: {},
  step: 1,
  addedResourceIds: [],
  k8sResources: [],
  isHPReady: false,
};

export default function apps(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_APPS[SUCCESS]:
    return {
      ...state,
      apps: action.payload.applications,
    };
  case types.ADD_TO_HYPERPILOT:
    return { ...state, addedResourceIds: _.union(state.addedResourceIds, [action.appObj]) };
  case types.REMOVE_FROM_HYPERPILOT:
    return { ...state, addedResourceIds: _.without(state.addedResourceIds, action.appId) };
  case types.UPDATE_SINGLE_SLO_LOADING:
    return {
      ...state,
      ui: _.extend({}, state.ui, { isUpdatingSingleSloLoading: true }),
    };
  case types.UPDATE_SINGLE_SLO_SUCCESS:
    return {
      ...state,
      // TODO: using fake data instead for structing schema in DB
      // apps: action.applications,
      apps: fakeArr,
      ui: _.extend({}, state.ui, { isUpdatingSingleSloLoading: false }),
      isHPReady: true,
    };
  case types.UPDATE_SINGLE_SLO_FAIL:
    console.error("Update SLO failed");
    return state;
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
  case types.FETCH_AVAILABLE_SERVICES_FAIL:
    console.error("Fetch available services failed");
    return state;
  case types.FETCH_AVAILABLE_SERVICES_LOADING:
    return {
      ...state,
      ui: _.extend({}, state.ui, { isK8sResourcesLoading: true }),
    };
  case types.FETCH_AVAILABLE_SERVICES_SUCCESS:
  // TODO: should be transform to the 
    return {
      ...state,
      ui: _.extend({}, state.ui, { isK8sResourcesLoading: false }),
      k8sResources: resourcesToFront(action.k8sResources),
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
  case types.ADD_STEP_NUMBER:
    return {
      ...state,
      step: state.step + 1,
    };
  case types.MINUS_STEP_NUMBER:
    return {
      ...state,
      step: state.step - 1,
    };
  case types.RESET_STEP_NUMBER:
    return {
      ...state,
      step: 1,
    };
  default:
    return state;
  }
}
