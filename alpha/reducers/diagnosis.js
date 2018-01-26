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
  case types.FETCH_DIAGNOSIS[SUCCESS]:
    data = action.payload.data;
    return {
      ...state,
      results: _.unionBy([data.diagnosis], state.results, "incident_id"),
      problems: _.unionBy(data.problems, state.problems, "problem_id"),
    };
  case types.FETCH_APP_LATEST_INCIDENT[SUCCESS]:
    return {
      ...state,
      incidents: _.unionBy([action.payload.data], state.incidents, "incident_id"),
    };
  default:
    return state;
  }
};
