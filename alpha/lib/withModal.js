import { connect } from "react-redux";
import PropTypes from "prop-types";
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

withModal.propTypes = {
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
};

export default withModal;
