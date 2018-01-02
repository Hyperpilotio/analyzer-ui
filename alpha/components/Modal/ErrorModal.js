import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toggleModal } from "../../actions/index";

const ErrorModal = ({ title, message, closeModal, onSubmit }) => (
  <div>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>
      <p>{message}</p>
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={() => {
          onSubmit();
          closeModal();
        }}
      >
        OK</Button>
    </ModalFooter>
  </div>
);

ErrorModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ modal: { props } }) => ({
  title: props.title,
  message: props.message,
  onSubmit: props.onSubmit,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(toggleModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorModal);
