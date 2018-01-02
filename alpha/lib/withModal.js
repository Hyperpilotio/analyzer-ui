import { connect } from "react-redux";
import { openModal, closeModal } from "../actions/index";

const withModal = (Component) => {
  const mapDispatchToProps = dispatch => ({
    openModal: (...args) => dispatch(openModal(...args)),
    closeModal: () => dispatch(closeModal()),
  });
  const C = connect(null, mapDispatchToProps)(Component);
  C.displayName = `withModal(${Component.displayName || Component.name})`;
  return C;
};

export default withModal;
