import * as types from "../actions/types";

const initialState = {
  modal: {
    isOpen: false,
    modalType: "",
    props: {},
  },
  sideBar: {
    isOpen: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
  case types.TOGGLE_MODAL:
    return {
      ...state,
      modal: {
        ...state.modal,
        isOpen: !state.modal.isOpen,
      },
    };
  case types.OPEN_MODAL:
    return {
      ...state,
      modal: {
        ...state.modal,
        isOpen: true,
        modalType: action.modalType,
        props: action.props,
      },
    };
  case types.TOGGLE_SIDE_BAR:
    return {
      ...state,
      sideBar: {
        ...state.sideBar,
        isOpen: !state.sideBar.isOpen,
      },
    };
  default:
    return state;
  }
};
