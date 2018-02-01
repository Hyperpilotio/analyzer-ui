/*
* This modal only shows hint
*/
import React from "react";
import PropTypes from "prop-types";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

const HintModal = ({ title, message, messages, onClose, toggle }) => (
  <div>
    <ModalHeader>{title}</ModalHeader>
    <ModalBody>
      { message ?
        <p>{ message }</p> :
        messages.map((m, i) => <p key={i}>{ m }</p>) // eslint-disable-line react/no-array-index-key
        // There's nothing else we can use as keys other than index
      }
    </ModalBody>
    <ModalFooter>
      <Button
        color="primary"
        onClick={() => [onClose, toggle].forEach(f => f())}
      >
        OK</Button>
    </ModalFooter>
  </div>
);

HintModal.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  messages: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func,
  toggle: PropTypes.func.isRequired,
};

HintModal.defaultProps = {
  message: null,
  messages: [],
  onClose: () => {},
};

export default HintModal;
