import { combineReducers } from "redux";
import applications from "./applications";
import createAppForm from "./createAppForm";
import authForm from "./authForm";
import diagnosis from "./diagnosis";
import modal from "./modal";
import auth from "./auth";
import ui from "./ui";

const rootReducer = combineReducers({
  createAppForm,
  authForm,
  applications,
  diagnosis,
  modal,
  auth,
  ui,
});

export default rootReducer;
