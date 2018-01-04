/*
* This modal provide an onSubmit function
*/
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const ActionModal = ({ title, message, question, cancelWord, submitWord, toggle, onSubmit }) => (
  <div>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>
      <p>{message}</p>
      <p>{question}</p>
    </ModalBody>
    <ModalFooter>
      <Button
        color="secondary"
        onClick={() => {
          toggle();
        }}
      >{cancelWord}</Button>
      <Button
        color="primary"
        onClick={() => {
          onSubmit();
          toggle();
        }}
      >{submitWord}</Button>
    </ModalFooter>
  </div>
);

ActionModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  question: PropTypes.string,
  cancelWord: PropTypes.string,
  submitWord: PropTypes.string,
  toggle: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

ActionModal.defaultProps = {
  question: null,
  cancelWord: "Cancel",
  submitWord: "Yes",
};

const mapStateToProps = ({ modal: { props } }) => ({
  title: props.title,
  message: props.message,
  question: props.question,
  cancelWord: props.cancelWord,
  submitWord: props.submitWord,
  onSubmit: props.onSubmit,
});

export default connect(
  mapStateToProps,
)(ActionModal);
