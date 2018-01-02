/*
* This modal provide an onSubmit function
*/
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ActionModal = ({ title, message, toggle, onSubmit }) => (
  <div>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>
      <p>{message}</p>
    </ModalBody>
    <ModalFooter>
      <Button
        color="secondary"
        onClick={() => {
          toggle();
        }}
      >Cancel</Button>
      <Button
        color="primary"
        onClick={() => {
          onSubmit();
          toggle();
        }}
      >Yes</Button>
    </ModalFooter>
  </div>
);

ActionModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ modal: { props } }) => ({
  title: props.title,
  message: props.message,
  onSubmit: props.onSubmit,
});

export default connect(
  mapStateToProps,
)(ActionModal);
