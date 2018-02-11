import * as types from "../actions/types";
import { SUCCESS } from "../constants/apiActions";

const InitialState = {
  isLogin: false,
  userInfo: {},
};

export default (state = InitialState, action) => {
  switch (action.type) {
  case types.SET_USER_INFO:
    return {
      ...state,
      isLogin: true,
      userInfo: action.userInfo,
    };
  case types.LOGOUT:
    return {
      ...state,
      isLogin: false,
      userInfo: {},
    };
  default:
    return state;
  }
};
