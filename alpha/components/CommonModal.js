import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import PropTypes from "prop-types";
import { toggleModal, removeApp } from "../actions";
import * as modalTypes from "../constants/modalTypes";
import ActionModal from "./Modal/ActionModal";
import HintModal from "./Modal/HintModal";

const CommonModal = ({
  isOpen,
  modalType,
  toggle,
}) => {
  let modalElement = null;
  switch (modalType) {
  case modalTypes.ACTION_MODAL:
    modalElement = <ActionModal toggle={toggle} />;
    break;
  case modalTypes.HINT_MODAL:
    modalElement = <HintModal toggle={toggle} />;
    break;
  default:
    modalElement = <div />;
  }
  return (
    <Modal isOpen={isOpen}>
      {modalElement}
    </Modal>
  );
};

CommonModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  modalType: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

const mapStateToProps = ({ modal }) => ({
  isOpen: modal.isOpen,
  modalType: modal.modalType,
});

const mapDispatchToProps = dispatch => ({
  removeApp: appId => dispatch(removeApp(appId)),
  toggle: () => dispatch(toggleModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommonModal);