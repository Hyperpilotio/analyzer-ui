import { RSAA } from "redux-api-middleware";
import * as types from "./types";


export const fetchApps = () => ({
  [RSAA]: {
    endpoint: "/api/apps",
    method: "GET",
    types: types.FETCH_APPS,
  },
});

export const createApp = (basicInfo, next) => async (dispatch) => {
  const payload = {
    [RSAA]: {
      endpoint: "/api/new-app",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(basicInfo),
      types: types.CREATE_APP,
    },
  };
  const response = await dispatch(payload);
  next(response.payload.data.app_id);
}

export const editSingleApp = appId => ({
  type: types.EDIT_SINGLE_APP,
  appId,
});

export const saveSloSourceConfig = sloSource => ({
  [RSAA]: {
    endpoint: "/mock/api/slo-source",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sloSource),
    types: types.SAVE_SLO_SOURCE,
  },
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
