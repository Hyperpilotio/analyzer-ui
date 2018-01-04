/*
* This modal only shows hint
*/
import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const HintModal = ({ title, message, toggle }) => (
  <div>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>
      <p>{message}</p>
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={toggle}
      >
        OK</Button>
    </ModalFooter>
  </div>
);

HintModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

const mapStateToProps = ({ modal: { props } }) => ({
  title: props.title,
  message: props.message,
  onSubmit: props.onSubmit,
});

export default connect(
  mapStateToProps,
)(HintModal);
