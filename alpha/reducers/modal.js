import * as types from "../actions/types";
import * as modalTypes from "../constants/modalTypes";

const initialState = {
  isOpen: false,
  modalType: modalTypes.ERROR_MODAL,
  props: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case types.TOGGLE_MODAL:
    return {
      ...state,
      isOpen: !state.isOpen,
    };
  case types.OPEN_MODAL:
    return {
      isOpen: true,
      modalType: action.modalType,
      props: action.props,
    };
  default:
    return state;
  }
};
