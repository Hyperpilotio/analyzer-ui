import * as types from "./types";


export const addToHyperPilot = appId => ({
  type: types.ADD_TO_HYPERPILOT,
  appId,
});

export const removeFromHyperPilot = appId => ({
  type: types.REMOVE_FROM_HYPERPILOT,
  appId,
});

export const stretchProgressBar = () => ({
  type: types.STRETCH_PROGRESS_BAR,
});

export const fetchAppsLoading = () => ({
  type: types.FETCH_APPS_LOADING,
});

export const fetchAppsSuccess = applications => ({
  type: types.FETCH_APPS_SUCCESS,
  applications,
});

export const fetchAppsFail = () => ({
  type: types.FETCH_APPS_FAIL,
});

export const fetchApps = () => async (dispatch) => {
  dispatch(fetchAppsLoading());

  const res = await fetch("http://localhost:3007/data");
  if (!res.ok) {
    dispatch(fetchAppsFail());
    return;
  }
  const data = await res.json();
  if (data.success) {
    dispatch(fetchAppsSuccess(data.applications));
  } else {
    dispatch(fetchAppsFail());
  }
};

export const editSingleApp = appId => ({
  type: types.EDIT_SINGLE_APP,
  appId,
});

export const submitSloConfig = data => ({
  type: types.SUBMIT_SLO_CONFIG,
  data,
});

export const toggleModalStatus = () => ({
  type: types.TOGGLE_MODAL,
});


export const updateSingleSloLoading = () => ({
  type: types.UPDATE_SINGLE_SLO_LOADING,
});

export const updateSingleSloSuccess = status => ({
  type: types.UPDATE_SINGLE_SLO_SUCCESS,
  status,
});

export const updateSingleSloFail = () => ({
  type: types.UPDATE_SINGLE_SLO_FAIL,
});

export const updateSingleSlo = () => async (dispatch) => {
  dispatch(updateSingleSloLoading());

  const res = await fetch("/api/update");
  if (!res.ok) {
    dispatch(updateSingleSloFail());
    return;
  }

  const data = await res.json();
  if (data.success) {
    dispatch(updateSingleSloSuccess(data.applications));
  } else {
    dispatch(updateSingleSloFail());
  }
};


export const beginHyperPilotingLoading = () => ({
  type: types.BEGIN_HYPER_PILOTING_LOADING,
});

export const beginHyperPilotingSuccess = status => ({
  type: types.BEGIN_HYPER_PILOTING_SUCCESS,
  status,
});

export const beginHyperPilotingFail = () => ({
  type: types.BEGIN_HYPER_PILOTING_FAIL,
});

export const beginHyperPiloting = () => async (dispatch) => {
  dispatch(beginHyperPilotingLoading());
  // TODO: replace url when DB is done
  const res = await fetch("http://localhost:3000/api/apps");
  if (!res.ok) {
    dispatch(beginHyperPilotingFail());
    return;
  }
  const data = await res.json();
  if (data.success) {
    dispatch(beginHyperPilotingSuccess(data));
  } else {
    dispatch(beginHyperPilotingFail());
  }
};

export const addStepNumber = () => ({
  type: types.ADD_STEP_NUMBER,
  status,
});

export const minusStepNumber = () => ({
  type: types.MINUS_STEP_NUMBER,
  status,
});

export const resetStepNumber = () => ({
  type: types.RESET_STEP_NUMBER,
  status,
});

export const fetchEventsLoading = () => ({
  type: types.FETCH_EVENTS_LOADING,
});

export const fetchEventsSuccess = applications => ({
  type: types.FETCH_EVENTS_SUCCESS,
  applications,
});

export const fetchEventsFail = () => ({
  type: types.FETCH_EVENTS_FAIL,
});

export const fetchEvents = () => async (dispatch) => {
  dispatch(fetchEventsLoading());

  const res = await fetch("/api/apps");
  if (!res.ok) {
    dispatch(fetchEventsFail());
    return;
  }

  if (res.ok) {
    // TODO: Change to connecting real API
    dispatch(fetchEventsSuccess({}));
  } else {
    dispatch(fetchEventsFail());
  }
};
