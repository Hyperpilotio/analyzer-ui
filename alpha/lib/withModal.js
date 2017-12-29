import { connect } from "react-redux";
import { openModal } from "../actions/index";

const withModal = (Component) => {
  const mapDispatchToProps = dispatch => ({
    openModal: (...args) => dispatch(openModal(...args)),
  });
  const C = connect(null, mapDispatchToProps)(Component);
  C.displayName = `withModal(${Component.displayName || Component.name})`;
  return C;
};

export default withModal;
