import { actions } from "react-redux-form";
import _ from "lodash";
import * as types from "./types";

export const fetchEditAppLoading = () => ({
  type: types.FETCH_EDIT_APP_LOADING,
});

export const fetchEditAppSuccess = editApp => ({
  type: types.FETCH_EDIT_APP_SUCCESS,
  editApp,
});

export const fetchEditAppFail = () => ({
  type: types.FETCH_EDIT_APP_FAIL,
});

export const fetchEditApp = appId => async (dispatch) => {
  dispatch(fetchEditAppLoading());

  const res = await fetch("/api/apps");
  if (!res.ok) {
    dispatch(fetchEditAppFail());
    return;
  }

  const data = await res.json();
  if (data.success) {
    const editApp = _.find(data.applications, { _id: appId });
    dispatch(fetchEditAppSuccess(editApp));
    dispatch(actions.change("editApp", editApp));
  } else {
    dispatch(fetchEditAppFail());
  }
};


export const fetchAvailableServicesLoading = () => ({
  type: types.FETCH_AVAILABLE_SERVICES_LOADING,
});

export const fetchAvailableServicesSuccess = k8sResources => ({
  type: types.FETCH_AVAILABLE_SERVICES_SUCCESS,
  k8sResources,
});

export const fetchAvailableServicesFail = () => ({
  type: types.FETCH_AVAILABLE_SERVICES_FAIL,
});

export const fetchAvailableServices = () => async (dispatch) => {
  dispatch(fetchAvailableServicesLoading());

  const res = await fetch("/mock/k8sResources");
  if (!res.ok) {
    dispatch(fetchAvailableServicesFail());
    return;
  }

  const data = await res.json();
  if (data.success) {
    dispatch(fetchAvailableServicesSuccess(data.k8s_resources));
  } else {
    dispatch(fetchAvailableServicesFail());
  }
};
