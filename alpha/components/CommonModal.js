import React from "react";
import { connect } from "react-redux";
import { Modal } from "reactstrap";
import PropTypes from "prop-types";
import { toggleModal, removeApp } from "../actions";
import * as modalTypes from "../constants/modalTypes";
import DeleteModal from "./Modal/DeleteModal";
import ErrorModal from "./Modal/ErrorModal";

const CommonModal = ({
  isOpen,
  modalType,
  toggle,
}) => {
  let modalElement = null;
  switch (modalType) {
  case modalTypes.ERROR_MODAL:
    modalElement = <ErrorModal />;
    break;
  case modalTypes.DELETE_MODAL:
    modalElement = <DeleteModal />;
    break;
  default:
    modalElement = <div />;
  }
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
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
