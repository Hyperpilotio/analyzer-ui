import _ from "lodash";
import * as types from "../actions/types";
import { SUCCESS, FAIL } from "../constants/apiActions";

export default (state = [], action) => {
  switch (action.type) {
  case types.FETCH_APPS[SUCCESS]:
    return action.payload.data;
  case types.FETCH_APPS[FAIL]:
    console.error({
      MESSAGE: action.payload.response.message,
    })
    return state;
  case types.UPDATE_REDUX_APPS:
    return _.map(state, d => (d.app_id === action.data.app_id ? action.data : d));
  case types.REMOVE_APP[SUCCESS]:
    return _.filter(state, app => app.app_id !== action.payload.removedAppId);
  case types.REMOVE_APP[FAIL]:
    console.error({
      MESSAGE: action.payload.response.message,
    })
    return state;
  default:
    return state;
  }
};
