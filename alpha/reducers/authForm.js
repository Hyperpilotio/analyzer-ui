import { combineForms } from "react-redux-form";
import reduceReducers from "reduce-reducers";
import _ from "lodash";
import * as types from "../actions/types";
import { flattenResourcesData } from "../lib/utils";
import { SUCCESS } from "../constants/apiActions";

export default reduceReducers(
  combineForms({
    login: {
      email: null,
      password: null,
    },
  }, "authForm"),

  (state, action) => {
    switch (action.type) {
    // case types.FETCH_AVAILABLE_SERVICES[SUCCESS]:
    //   return _.setWith(
    //     { ...state },
    //     "forms.microservices.$form.options",
    //     flattenResourcesData(action.payload.data),
    //     _.clone,
    //   );
    default:
      return state;
    }
  },
);
