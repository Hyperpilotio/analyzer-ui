import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { toggleModal, removeApp } from "../../actions";

const DeleteModal = ({ closeModal, removeTheApp, appId }) => (
  <div>
    <ModalHeader>Delete app</ModalHeader>
    <ModalBody>
      <p>Are you sure you want to delete this app?</p>
    </ModalBody>
    <ModalFooter>
      <Button
        color="secondary"
        onClick={closeModal}
      >Cancel</Button>
      <Button
        color="primary"
        onClick={() => {
          removeTheApp(appId);
          closeModal();
        }}
      >Yes</Button>
    </ModalFooter>
  </div>
);

DeleteModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  removeTheApp: PropTypes.func.isRequired,
  appId: PropTypes.string.isRequired,
};

const mapStateToProps = ({ modal: { props } }) => ({
  appId: props.appId,
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(toggleModal()),
  removeTheApp: appId => dispatch(removeApp(appId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteModal);
