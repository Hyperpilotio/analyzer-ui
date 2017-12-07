import _ from "lodash";
import { SUCCESS } from "../constants/apiActions";
import * as types from "../actions/types";

const initialState = {
  results: [],
  incidents: [],
  problems: [],
};

export default (state = initialState, action) => {
  let data;
  switch (action.type) {
  case types.FETCH_DIAGNOSTICS[SUCCESS]:
    data = action.payload.data;
    return {
      ...state,
      results: _.unionBy(state.results, data.results, "app_id"),
      incidents: _.unionBy(state.incidents, data.incidents, "id"),
      problems: _.unionBy(state.problems, data.problems, "id"),
    };
  default:
    return state;
  }
};
