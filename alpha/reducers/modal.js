import * as types from "../actions/types";

const initialState = {
  isOpen: false,
  modalType: "",
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
