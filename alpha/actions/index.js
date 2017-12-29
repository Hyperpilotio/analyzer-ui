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
  const response = await dispatch({
    [RSAA]: {
      endpoint: "/api/new-app",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(basicInfo),
      types: types.CREATE_APP,
    },
  });
  dispatch(updateReduxApps(response.payload.data));
  dispatch(formActions.change("createAppForm.basicInfo.app_id", response.payload.data.app_id));
  next(response.payload.data.app_id);
};

export const updateReduxApps = data => ({
  type: types.UPDATE_REDUX_APPS,
  data,
});

export const updateMicroservices = (microservicesInfo, next) => async (dispatch, getState) => {
  const apps = getState().applications;
  const matchAppsItem = _.pick(
    _.find(apps, { app_id: microservicesInfo.app_id }),
    _.keys(microservicesInfo),
  );
  // update in DB and redux apps if they are different
  if (!_.isEqual(microservicesInfo, matchAppsItem)) {
    const response = await dispatch({
      [RSAA]: {
        endpoint: "/api/save-microservices",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(microservicesInfo),
        types: types.UPDATE_MICROSERVICES,
      },
    });
    dispatch(updateReduxApps(response.payload.data));
    next(response.payload.data.app_id);
  } else {
    next(microservicesInfo.app_id);
  }
};


export const updateApp = (app, next) => async (dispatch, getState) => {
  const apps = getState().applications;
  const matchAppsItem = _.pick(_.find(apps, { app_id: app.app_id }), _.keys(app));
  // update in DB and redux apps if they are different
  if (!_.isEqual(app, matchAppsItem)) {
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


export const activateApp = app => async (dispatch) => {
  const response = await dispatch({
    [RSAA]: {
      endpoint: "/api/activate-app",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(app),
      types: types.ACTIVATE_APP,
    },
  });
  dispatch(updateReduxApps(response.payload.data));
};

export const prepareEditAppForm = appId => async (dispatch, getState) => {
  const { applications, ui } = getState();
  if (applications.length === 0 && !ui.isFetchAppsLoading) {
    await dispatch(fetchApps());
  }
  const app = _.find(getState().applications, { app_id: appId });
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

export const fetchMetrics = sloSource => ({
  [RSAA]: {
    endpoint: "/api/get-metrics",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sloSource),
    types: types.FETCH_METRICS,
  },
});

export const fetchIncidents = () => ({
  [RSAA]: {
    endpoint: "/api/incidents",
    method: "GET",
    types: types.FETCH_INCIDENTS,
  },
});

export const fetchDiagnostics = appId => ({
  [RSAA]: {
    endpoint: `/api/diagnostics/${appId}`,
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

export const removeApp = appId => async (dispatch) => {
  const response = await dispatch({
    [RSAA]: {
      endpoint: "/api/remove-app",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ app_id: appId }),
      types: types.REMOVE_APP,
    },
  });
  dispatch(updateReduxApps(response.payload.data));
};

export const disableSLOConfiguration = () => ({
  type: types.DISABLE_SLO_CONFIGURATION,
});


// Modal
export const toggleModal = () => ({
  type: types.TOGGLE_MODAL,
});

export const openDeleteModal = props => ({
  type: types.OPEN_DELETE_MODAL,
  props,
});

export const openErrorModal = props => ({
  type: types.OPEN_ERROR_MODAL,
  props,
});
