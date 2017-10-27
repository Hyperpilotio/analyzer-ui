import { combineReducers } from "redux";
import { combineForms, modelReducer } from "react-redux-form";
import { initialSloState } from "../constants/models";
import setup from "./setup";

const rootReducer = combineReducers({
  deep: combineForms({
    slo: modelReducer("slo", initialSloState),
  }),
  setup,
});

export default rootReducer;
