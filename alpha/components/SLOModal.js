import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


class SLOModal extends React.Component {
  render() {
    const {
      modalState,
      toggle,
    } = this.props;
    return (
      <div>
        <Modal isOpen={this.props.modalState} toggle={toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Something wrong</ModalHeader>
          <ModalBody>
            Unable to connect slo metric.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>OK</Button>{' '}
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default SLOModal;
