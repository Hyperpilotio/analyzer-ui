import * as types from "../actions/types";
import { SUCCESS } from "../constants/apiActions";

const InitialState = {
  isLogin: false,
  userInfo: {},
};

export default (state = InitialState, action) => {
  switch (action.type) {
  case types.SET_LOGIN:
    return {
      ...state,
      isLogin: action.isLogin,
    };
  default:
    return state;
  }
};
