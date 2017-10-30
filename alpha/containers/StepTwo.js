import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Control,
  Form,
} from "react-redux-form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { submitSloConfig, toggleModalStatus } from "../actions/index";
import _s from "./style.scss";

const StepTwo = ({ addedApps, isModalOpen, toggleModal, onSubmitClick }) => (

  <div className={`container ${_s.stepTwo}`}>
    <div className="row pt-4">
      { addedApps.length === 0 ?
        <div className="col">
          <p>No apps selected</p>
        </div>
        :
        addedApps.map(app => (
          <div key={app._id} className="col-3 pt-2 pb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ app.name }</h5>
                <Button color="primary" onClick={toggleModal}> Open Modal </Button>
              </div>
            </div>
          </div>
        ))
      }
    </div>

    <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <Form
        model="forms.slo"
        className="modal-form"
        onSubmit={slo => onSubmitClick(slo)}
      >
        <ModalHeader toggle={toggleModal}>Custom SLO configure</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="form-group">
              <label htmlFor="metric">Metric</label>
              <Control.text
                type="text"
                className="form-control"
                model=".type"
              />
            </div>
            <div className="form-group">
              <label htmlFor="latency">Latency</label>
              <Control.text
                type="text"
                className="form-control"
                model=".rate"
              />
            </div>
            <div className="form-group">
              <label htmlFor="form-treshold">Threshold</label>
              <Control.text
                type="text"
                id="form-threshold"
                className="form-control"
                model=".threshold"
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal} type="submit">Save changes</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Form>
    </Modal>
  </div>
);

StepTwo.propTypes = {
  addedApps: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })).isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
};


const mapStateToProps = ({ setup }) => ({
  addedApps: setup.apps.filter(app => setup.addedAppIds.includes(app._id)),
  isModalOpen: setup.modal.isModalOpen,
});

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleModalStatus()),
  onSubmitClick: slo => dispatch(submitSloConfig(slo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepTwo);
