import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toggleModal } from "../../actions";


const DeleteModal = ({ toggle }) => (
  <div>
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader>Delete app</ModalHeader>
      <ModalBody>
        <p>Are you sure you want to delete this app?</p>
      </ModalBody>
      <ModalFooter>
        <Button
          color="secondary"
          onClick={removeApp()}
        >Cancel</Button>

        {/* <Button
          color="primary"
          onClick={() => {
            onSubmit();
          }}
        >Yes</Button> */}
      </ModalFooter>
    </Modal>
  </div>
);

DeleteModal.propTypes = {
  toggle: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  toggle: dispatch(toggleModal()),
});

export default connect(
  mapStateToProps,
)(DeleteModal);
