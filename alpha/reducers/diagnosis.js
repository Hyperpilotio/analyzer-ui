import _ from "lodash";
import * as types from "../actions/types";
import { fakeIncidents, fakeRisks, fakeOpportunities } from "../constants/models";

const initialState = {
  incidents: {},
  risks: {},
  opportunities: {},
  ui: {
    isEventsLoading: false,
  },
};

export default function diagnosisReducer(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_EVENTS_LOADING:
    return { ...state, ui: _.extend({}, state.ui, { isEventsLoading: true }) };
  case types.FETCH_EVENTS_SUCCESS:
    return {
      ...state,
      incidents: action.incidents,
      risks: {},
      opportunities: action.opportunities,
      ui: _.extend({}, state.ui, { isEventsLoading: false }),
    };
  case types.FETCH_EVENTS_FAIL:
    console.error("Fetch events failed");
    return state;

  default:
    return state;
  }
}
