import * as types from "../actions/types";
import * as modalTypes from "../constants/modalTypes";

const initialState = {
  isOpen: false,
  modalType: modalTypes.ERROR_MODAL,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case types.TOGGLE_MODAL:
    return {
      ...state,
      isOpen: !state.isOpen,
    };
  case types.OPEN_DELETE_MODAL:
    return {
      ...action.state,
      isOpen: true,
      modalType: modalTypes.DELETE_MODAL,
    };
  default:
    return state;
  }
};
