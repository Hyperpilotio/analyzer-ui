import { combineReducers } from "redux";
// import applications from "./applications";
// import createAppForm from "./createAppForm";
// import diagnosis from "./diagnosis";
// import modal from "./modal";
import result from "./result";
import comps from "./comps";
import ui from "./ui";

const rootReducer = combineReducers({
  result,
  comps,
  // createAppForm,
  // applications,
  // diagnosis,
  // modal,
  // ui,
  ui,
});

export default rootReducer;
