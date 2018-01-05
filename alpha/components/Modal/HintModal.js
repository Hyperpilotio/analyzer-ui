/*
* This modal only shows hint
*/
import React from "react";
import PropTypes from "prop-types";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const HintModal = ({ title, message, messages, toggle }) => (
  <div>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>
      { message ? <p>{ message }</p> : messages.map((m, i) => <p key={i}>{ m }</p>) }
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
  message: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  toggle: PropTypes.func.isRequired,
};

HintModal.defaultProps = {
  message: null,
  messages: [],
};

export default HintModal;
