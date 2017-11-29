import { actions } from "react-redux-form";
import _ from "lodash";
import { RSAA } from "redux-api-middleware";
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
