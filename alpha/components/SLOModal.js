import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


class SLOModal extends React.Component {
  static propTypes = {

  }

  render() {
    const {
      modalState,
      toggle,
      errorMessage,
    } = this.props;
    return (
      <div>
        <Modal isOpen={this.props.modalState} toggle={toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Something wrong</ModalHeader>
          <ModalBody>
            <p>{errorMessage}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => toggle(false)}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SLOModal;
