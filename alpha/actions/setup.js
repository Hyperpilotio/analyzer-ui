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


export const fetchAvaliableServicesLoading = () => ({
  type: types.FETCH_AVALIABLE_SERVICES_LOADING,
});

export const fetchAvaliableServicesSuccess = k8sResources => ({
  type: types.FETCH_AVALIABLE_SERVICES_SUCCESS,
  k8sResources,
});

export const fetchAvaliableServicesFail = () => ({
  type: types.FETCH_AVALIABLE_SERVICES_FAIL,
});

export const fetchAvaliableServices = () => async (dispatch) => {
  dispatch(fetchAvaliableServicesLoading());

  const res = await fetch("http://localhost:3007/data");
  if (!res.ok) {
    dispatch(fetchAvaliableServicesFail());
    return;
  }

  const data = await res.json();
  if (data.success) {
    dispatch(fetchAvaliableServicesSuccess(data.k8s_resources));
  } else {
    dispatch(fetchAvaliableServicesFail());
  }
};
