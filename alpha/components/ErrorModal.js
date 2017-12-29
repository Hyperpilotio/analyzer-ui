import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PropTypes from "prop-types";

const ErrorModal = ({
  modalState,
  className,
  toggle,
  errorMessage,
  disableConfiguration,
}) => (
  <div>
    <Modal isOpen={modalState} toggle={toggle} className={className}>
      <ModalHeader>Something wrong</ModalHeader>
      <ModalBody>
        <p>{errorMessage}</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={() => { toggle(false); disableConfiguration(); }}
        >
          OK</Button>
      </ModalFooter>
    </Modal>
  </div>
);

ErrorModal.propTypes = {
  modalState: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired,
  // errorMessage: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  disableConfiguration: PropTypes.func.isRequired,
};

export default ErrorModal;
