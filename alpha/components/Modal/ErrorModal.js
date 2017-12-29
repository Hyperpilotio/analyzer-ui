import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ModalHeader, ModalBody, ModalFooter, Button} from "reactstrap";
import { toggleModal } from "../../actions/index";

const ErrorModal = () => (
  <div>
    <ModalHeader>Something wrong</ModalHeader>
    <ModalBody>
      <p>{123}</p>
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

ErrorModal.propTypes = {


};

const mapStateToProps = state => ({
  ...state,
});

const mapDispatchToProps = dispatch => ({
  toggle: dispatch(toggleModal()),
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ErrorModal);
