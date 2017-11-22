import { combineReducers } from "redux";
import applications from "./applications";
import createAppForm from "./createAppForm";
import diagnosis from "./diagnosis";
import ui from "./ui";

const rootReducer = combineReducers({
  createAppForm,
  applications,
  diagnosis,
  ui,
});

export default rootReducer;
