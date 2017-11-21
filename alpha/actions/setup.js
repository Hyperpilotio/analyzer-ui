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

// [stepEdit] fetch available resources  
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

  const res = await fetch("/mock/cluster/mappings/all");
  if (!res.ok) {
    dispatch(fetchAvailableServicesFail());
    return;
  }

  const data = await res.json();
  if (data.success) {
    dispatch(fetchAvailableServicesSuccess(data.namespaces));
  } else {
    dispatch(fetchAvailableServicesFail());
  }
};

export const updateResourcesInAnalyzerLoading = () => ({
  type: types.UPDATE_RESOURCES_IN_ANALYZER_LOADING,
});

export const updateResourcesInAnalyzerSuccess = resourcesIds => ({
  type: types.UPDATE_RESOURCES_IN_ANALYZER_SUCCESS,
  resourcesIds,
});

export const updateResourcesInAnalyzerFail = () => ({
  type: types.UPDATE_RESOURCES_IN_ANALYZER_FAIL,
});

export const updateResourcesInAnalyzer = services => async (dispatch) => {
  dispatch(updateResourcesInAnalyzerLoading());

  const res = await fetch("/mock/v1/k8s_services", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ services }),
  });
  if (!res.ok) {
    dispatch(updateResourcesInAnalyzerFail());
    return;
  }

  const data = await res.json();
  if (data.success) {
    dispatch(updateResourcesInAnalyzerSuccess(data.resourcesIds));
  } else {
    dispatch(updateResourcesInAnalyzerFail());
  }
};
