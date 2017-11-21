import { RSAA } from "redux-api-middleware";
import * as types from "./types";


export const addToHyperPilot = appObj => ({
  type: types.ADD_TO_HYPERPILOT,
  appObj,
});

export const removeFromHyperPilot = appId => ({
  type: types.REMOVE_FROM_HYPERPILOT,
  appId,
});

export const fetchApps = () => ({
  [RSAA]: {
    endpoint: "/mock/api/apps",
    method: "GET",
    types: types.FETCH_APPS,
  },
});

export const editSingleApp = appId => ({
  type: types.EDIT_SINGLE_APP,
  appId,
});

export const submitSloConfig = data => ({
  type: types.SUBMIT_SLO_CONFIG,
  data,
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

export const beginHyperpiloting = () => ({
  [RSAA]: {
    endpoint: "http://localhost:3007/begin",
    method: "POST",
    types: types.BEGIN_HYPERPILOTING,
  },
});

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

export const fetchEvents = () => ({
  [RSAA]: {
    endpoint: "http://localhost:3007/data",
    method: "GET",
    types: types.FETCH_EVENTS,
  },
});

export const addApp = app => ({
  [RSAA]: {
    endpoint: "/mock/api/add",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(app),
    types: types.ADD_APP,
  },
});

export const removeApp = appId => ({
  [RSAA]: {
    endpoint: "/mock/api/remove",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ appId }),
    types: types.REMOVE_APP,
  },
});
