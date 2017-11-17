import * as types from "./types";


export const addToHyperPilot = appObj => ({
  type: types.ADD_TO_HYPERPILOT,
  appObj,
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

  const res = await fetch("/mock/api/apps");
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
  const res = await fetch("http://localhost:3007/begin");
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

export const fetchEventsSuccess = ({ incidents, opportunities }) => ({
  type: types.FETCH_EVENTS_SUCCESS,
  incidents,
  opportunities,
});

export const fetchEventsFail = () => ({
  type: types.FETCH_EVENTS_FAIL,
});

export const fetchEvents = () => async (dispatch) => {
  dispatch(fetchEventsLoading());

  const res = await fetch("http://localhost:3007/data");
  if (!res.ok) {
    dispatch(fetchEventsFail());
    return;
  }

  const data = await res.json();
  if (data.success) {
    dispatch(fetchEventsSuccess(data));
  } else {
    dispatch(fetchEventsFail());
  }
};

export const addAppLoading = () => ({
  type: types.ADD_APP_LOADING,
});

export const addAppSuccess = () => ({
  type: types.ADD_APP_SUCCESS,
});

export const addAppFail = () => ({
  type: types.ADD_APP_FAIL,
});

export const addApp = app => async (dispatch) => {
  dispatch(addAppLoading());
  const res = await fetch("/mock/api/add", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(app),
  });
  if (!res.ok) {
    dispatch(addAppFail());
    return;
  }

  const data = await res.json();
  if (data.success) {
    dispatch(addAppSuccess(data));
  } else {
    dispatch(addAppFail());
  }
};


export const removeAppLoading = () => ({
  type: types.REMOVE_APP_LOADING,
});

export const removeAppSuccess = removedAppId => ({
  type: types.REMOVE_APP_SUCCESS,
  removedAppId,
});

export const removeAppFail = () => ({
  type: types.REMOVE_APP_FAIL,
});

export const removeApp = appId => async (dispatch) => {
  dispatch(removeAppLoading());

  const res = await fetch("/mock/api/remove", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appId }),
  });
  if (!res.ok) {
    dispatch(removeAppFail());
    return;
  }

  const data = await res.json();
  if (data.success) {
    dispatch(removeAppSuccess(appId));
  } else {
    dispatch(removeAppFail());
  }
};
