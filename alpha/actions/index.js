import { RSAA } from "redux-api-middleware";
import _ from "lodash";
import { actions as formActions } from "react-redux-form";
import * as types from "./types";
import { appToForm } from "../lib/utils";
import * as modalTypes from "../constants/modalTypes";


// --------  Modal  ----------------
export const toggleModal = () => ({
  type: types.TOGGLE_MODAL,
});

export const openModal = (modalType, props) => ({
  type: types.OPEN_MODAL,
  modalType,
  props,
});
//----------------------------------

export const fetchApps = () => async (dispatch) => {
  const response = await dispatch({
    [RSAA]: {
      endpoint: "/api/apps",
      method: "GET",
      types: types.FETCH_APPS,
    },
  });

  // Open modal when fetching apps fail
  if (!response.payload.success) {
    dispatch(openModal(
      modalTypes.HINT_MODAL,
      {
        title: "Fetch apps error",
        message: response.payload.response.message,
      },
    ));
  }
};


export const updateReduxApps = data => ({
  type: types.UPDATE_REDUX_APPS,
  data,
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

  // Open error modal
  if (!response.payload.success) {
    dispatch(openModal(
      modalTypes.HINT_MODAL,
      {
        title: "Create app error",
        message: response.payload.response.message,
      },
    ));
  }

  dispatch(updateReduxApps(response.payload.data));
  dispatch(formActions.change("createAppForm.basicInfo.app_id", response.payload.data.app_id));
  next(response.payload.data.app_id);
};

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
        types: [
          {
            type: types.UPDATE_MICROSERVICES[0],
            meta: { key: microservicesInfo.app_id },
          },
          {
            type: types.UPDATE_MICROSERVICES[1],
            meta: { key: microservicesInfo.app_id },
          },
          types.UPDATE_MICROSERVICES[2],
        ],
      },
    });

    // Open error modal
    if (!response.payload.success) {
      dispatch(openModal(
        modalTypes.HINT_MODAL,
        {
          title: "Update microservices fail",
          message: response.payload.response.message,
        },
      ));
    }

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
        types: [
          {
            type: types.UPDATE_APP[0],
            meta: { key: app.app_id },
          },
          {
            type: types.UPDATE_APP[1],
            meta: { key: app.app_id },
          },
          types.UPDATE_APP[2],
        ],
      },
    });
    dispatch(updateReduxApps(response.payload.data));

    // Open error modal
    if (!response.payload.success) {
      dispatch(openModal(
        modalTypes.HINT_MODAL,
        {
          title: "Update app error",
          message: response.payload.response.message,
        },
      ));
    }
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
      types: [
        {
          type: types.ACTIVATE_APP[0],
          meta: { key: app.app_id },
        },
        {
          type: types.ACTIVATE_APP[1],
          meta: { key: app.app_id },
        },
        types.ACTIVATE_APP[2],
      ],
    },
  });

  // Open error modal
  if (!response.payload.success) {
    dispatch(openModal(
      modalTypes.HINT_MODAL,
      {
        title: "Activate app fail",
        message: response.payload.response.message,
      },
    ));
  }

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

export const fetchAvailableServices = () => async (dispatch) => {
  const response = await dispatch({
    [RSAA]: {
      endpoint: "/api/get-cluster-mapping",
      method: "GET",
      types: types.FETCH_AVAILABLE_SERVICES,
    },
  });

  // Open error modal
  if (!response.payload.success) {
    dispatch(openModal(
      modalTypes.HINT_MODAL,
      {
        title: "Fetch microservices error",
        message: response.payload.response.message,
      },
    ));
  }
};

export const fetchMetrics = sloSource => async (dispatch) => {
  const response = await dispatch({
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

  // Open error modal
  if (!response.payload.success) {
    dispatch(openModal(
      modalTypes.HINT_MODAL,
      {
        title: "Fetch metrics error",
        message: response.payload.response.message,
      },
    ));
  }

  return response;
};

export const fetchAppLatestIncident = appId => async (dispatch) => {
  const response = await dispatch({
    [RSAA]: {
      endpoint: `/api/apps/${appId}/incidents/last`,
      method: "GET",
      types: [
        {
          type: types.FETCH_APP_LATEST_INCIDENT[0],
          meta: { key: appId },
        },
        {
          type: types.FETCH_APP_LATEST_INCIDENT[1],
          meta: { key: appId },
        },
        types.FETCH_APP_LATEST_INCIDENT[2],
      ],
    },
  });

  // Open error modal
  if (!response.payload.success) {
    dispatch(openModal(
      modalTypes.HINT_MODAL,
      {
        title: "Fetch incidents error",
        message: response.payload.response.message,
      },
    ));
  }
};

export const fetchDiagnosis = (appId, incidentId) => async (dispatch) => {
  const response = await dispatch({
    [RSAA]: {
      endpoint: `/api/apps/${appId}/incidents/${incidentId}/diagnosis`,
      method: "GET",
      types: types.FETCH_DIAGNOSIS,
    },
  });
  // Open error modal
  if (!response.payload.success) {
    dispatch(openModal(
      modalTypes.HINT_MODAL,
      {
        title: "Fetch diagnosis error",
        message: response.payload.response.message,
      },
    ));
  }
};

export const removeApp = appId => async (dispatch) => {
  const response = await dispatch({
    [RSAA]: {
      endpoint: "/api/remove-app",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ app_id: appId }),
      types: [
        {
          type: types.REMOVE_APP[0],
          meta: { key: appId },
        },
        {
          type: types.REMOVE_APP[1],
          meta: { key: appId },
        },
        types.REMOVE_APP[2],
      ],
    },
  });

  // Open error modal
  if (!response.payload.success) {
    dispatch(openModal(
      modalTypes.HINT_MODAL,
      {
        title: "Remove app fail",
        message: response.payload.response.message,
      },
    ));
  }

  dispatch(updateReduxApps(response.payload.data));
};


export const emptyMetricOptions = () => ({
  type: types.EMPTY_METRIC_OPTIONS,
});

export const setSloConfigEditability = isEditable => ({
  type: types.SET_SLO_CONFIG_EDITABILITY,
  isEditable,
});

