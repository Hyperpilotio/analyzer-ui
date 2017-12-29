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
  case types.OPEN_DELETE_MODAL:
    return {
      isOpen: true,
      modalType: modalTypes.DELETE_MODAL,
      props: action.props,
    };
  case types.OPEN_ERROR_MODAL:
    return {
      isOpen: true,
      modalType: modalTypes.ERROR_MODAL,
      props: action.props,
    };
  default:
    return state;
  }
};
