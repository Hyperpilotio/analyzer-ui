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
      results: _.unionBy(data.results, state.results, "incident_id"),
      incidents: _.unionBy(data.incidents, state.incidents, "incident_id"),
      problems: _.unionBy(data.problems, state.problems, "problem_id"),
    };
  case types.FETCH_INCIDENTS[SUCCESS]:
    data = action.payload.data;
    return {
      ...state,
      incidents: data,
    };
  default:
    return state;
  }
};
