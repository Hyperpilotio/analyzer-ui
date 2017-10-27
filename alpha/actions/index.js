import * as types from "./types";


export const addToHyperPilot = appId => ({
  type: types.ADD_TO_HYPERPILOT,
  appId,
});

export const removeFromHyperPilot = appId => ({
  type: types.REMOVE_FROM_HYPERPILOT,
  appId,
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

  const res = await fetch("/api/apps");
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

export const submitSloCommit = data => ({
  type: types.SUBMIT_SLO_COMMIT,
  data,
});

export const closeModal = () => ({
  type: types.CLOSE_MODAL,
});
