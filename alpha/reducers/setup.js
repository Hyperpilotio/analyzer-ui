import _ from "lodash";
import * as types from "../actions/types";
import { fakeArr } from "../constants/models";

const initialState = {
  apps: [],
  addedAppIds: [],
  stepPercent: 34,
  ui: {
    isFetchingAppsLoading: false,
  },
  modal: {
    isModalOpen: false,
    appId: "",
  },
  currentSlo: {
    metric: "",
    type: 0,
    summary: "",
    value: "",
    unit: "",
  },
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
      // TODO: using fake data instead for structing schema in DB
      // apps: action.applications,
      apps: fakeArr,
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
  case types.SUBMIT_SLO_COMMIT:
    return { ...state };
  case types.STRETCH_PROGRESS_BAR:
    return { ...state, stepPercent: state.stepPercent + 33 };
  case types.TOGGLE_EDIT_SLO_MODAL:
    return { ...state, modal: { isModalOpen: !state.modal.isModalOpen }, currentSlo: action.slo };


  default:
    return state;
  }
}
