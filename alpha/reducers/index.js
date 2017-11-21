import { combineReducers } from "redux";
import { combineForms, modelReducer } from "react-redux-form";
import { initialEditAppState } from "../constants/models";
import applications from "./applications";
import diagnosis from "./diagnosis";
import ui from "./ui";

const rootReducer = combineReducers({
  forms: combineForms({
    editApp: modelReducer("editApp", initialEditAppState),
  }, "forms"),
  applications,
  diagnosis,
  ui,
});

export default rootReducer;
