import { RSAA } from "redux-api-middleware";
import _ from "lodash";
import { actions as formActions } from "react-redux-form";
import * as types from "./types";
import { appToForm } from "../lib/utils";


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
};

export const updateReduxApps = data => ({
  type: types.UPDATE_REDUX_APPS,
  data,
});

export const updateApp = (app, next) => async (dispatch, getState) => {
  const apps = getState().applications.apps;
  const appsItem = _.pick(_.find(apps, { app_id: app.app_id }), _.keys(app));

  // update in DB and redux apps if they are different
  if (!_.isEqual(app, appsItem)) {
    const response = await dispatch({
      [RSAA]: {
        endpoint: "/api/update-app",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(app),
        types: types.UPDATE_APP,
      },
    });
    dispatch(updateReduxApps(response.payload.data));
    next(response.payload.data.app_id);
  } else {
    next(app.app_id);
  }
};

export const prepareEditAppForm = appId => async (dispatch, getState) => {
  const { applications, ui } = getState();
  if (applications.apps.length === 0 && !ui.isFetchAppsLoading) {
    await dispatch(fetchApps());
  }
  const app = _.find(getState().applications.apps, { app_id: appId });
  if (!_.isUndefined(app)) {
    _.forEach(appToForm(app), (value, part) => (
      dispatch(formActions.change(`createAppForm.${part}`, value))
    ));
  }
};

export const fetchAvailableServices = () => ({
  [RSAA]: {
    endpoint: "/api/get-cluster-mapping",
    method: "GET",
    types: types.FETCH_AVAILABLE_SERVICES,
  },
});

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

export const fetchDiagnostics = () => ({
  [RSAA]: {
    endpoint: "/api/diagnostics",
    method: "GET",
    types: types.FETCH_DIAGNOSTICS,
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
