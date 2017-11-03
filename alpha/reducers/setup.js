import _ from "lodash";
import * as types from "../actions/types";
import { fakeArr } from "../constants/models";

const initialState = {
  apps: [],
  step: 1,
  addedAppIds: [],
  stepPercent: 34,
  ui: {
    isFetchingAppsLoading: false,
    isUpdatingSingleSloLoading: false,
    isBeginHyperPilotingLoading: false,
  },
  modal: {
    isModalOpen: false,
    appId: "",
  },
  isHPReady: false,
};

export default function setup(state = initialState, action) {
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
  case types.EDIT_SINGLE_APP:
    return { ...state, modal: { isModalOpen: true } };
  case types.CLOSE_MODAL:
    return { ...state, modal: { isModalOpen: false } };
  case types.TOGGLE_MODAL:
    return { ...state, modal: { isModalOpen: !state.modal.isModalOpen } };
  case types.STRETCH_PROGRESS_BAR:
    return { ...state, stepPercent: state.stepPercent + 33 };
  case types.TOGGLE_EDIT_SLO_MODAL:
    return { ...state, modal: { isModalOpen: !state.modal.isModalOpen }, currentSlo: action.slo };
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
  case types.BEGIN_HYPER_PILOTING_LOADING:
    return {
      ...state,
      ui: _.extend({}, state.ui, { isBeginHyperPilotingLoading: true }),
    };
  case types.BEGIN_HYPER_PILOTING_SUCCESS:
    return {
      ...state,
      ui: _.extend({}, state.ui, { isBeginHyperPilotingLoading: false }),
      isHPReady: true,
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
