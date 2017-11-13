import { combineReducers } from "redux";
import { combineForms, modelReducer } from "react-redux-form";
import { initialEditAppState } from "../constants/models";
import setup from "./setup";
import diagnosis from "./diagnosis";

const rootReducer = combineReducers({
  forms: combineForms({
    editApp: modelReducer("editApp", initialEditAppState),
  }, "forms"),
  setup,
  diagnosis,
});

export default rootReducer;
