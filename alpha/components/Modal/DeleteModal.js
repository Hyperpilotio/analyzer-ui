import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toggleModal, removeApp } from "../../actions";

const DeleteModal = ({ toggleTheModal, removeAppInModal }) => (
  <div>
    <ModalHeader>Delete app</ModalHeader>
    <ModalBody>
      <p>Are you sure you want to delete this app?</p>
    </ModalBody>
    <ModalFooter>
      <Button
        color="secondary"
        onClick={toggleTheModal}
      >Cancel</Button>

      <Button
        color="primary"
        onClick={removeAppInModal}
      >Yes</Button>
    </ModalFooter>
  </div>
);

DeleteModal.propTypes = {
  toggleTheModal: PropTypes.func.isRequired,
  removeAppInModal: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  toggleTheModal: dispatch(toggleModal()),
  removeAppInModal: dispatch(removeApp()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteModal);
