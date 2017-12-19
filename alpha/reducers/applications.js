import _ from "lodash";
import * as types from "../actions/types";
import { SUCCESS } from "../constants/apiActions";

export default (state = [], action) => {
  switch (action.type) {
  case types.FETCH_APPS[SUCCESS]:
    return action.payload.data;
  case types.UPDATE_REDUX_APPS:
    return _.map(state, d => (d.app_id === action.data.app_id ? action.data : d));
  case types.REMOVE_APP[SUCCESS]:
    return _.filter(state, app => app.app_id !== action.payload.removedAppId);
  default:
    return state;
  }
};
