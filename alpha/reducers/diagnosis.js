import _ from "lodash";
import { SUCCESS } from "../constants/apiActions";
import * as types from "../actions/types";

const initialState = {
  incidents: {},
  risks: {},
  opportunities: {},
};

export default function diagnosisReducer(state = initialState, action) {
  switch (action.type) {
  case types.FETCH_EVENTS[SUCCESS]:
    return {
      ...state,
      incidents: action.payload.incidents,
      risks: {},
      opportunities: action.payload.opportunities,
    };
  default:
    return state;
  }
}
