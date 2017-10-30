import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import {
  Control,
  Form,
  actions,
} from "react-redux-form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { submitSloConfig, toggleModalStatus, stretchProgressBar } from "../actions/index";
import _s from "./style.scss";

const StepTwo = ({
  addedApps,
  isModalOpen,
  toggleModal,
  onSubmitClick,
  editSloClick,
  stepNext,
}) => (
  <div className={`container ${_s.stepTwo}`}>
    <div className="row pt-4">
      { addedApps.length === 0 ?
        <div className="col">
          <p>No apps selected</p>
        </div>
        :
        addedApps.map(({ _id, slo, name }) => (
          <div key={_id} className="col-3 pt-2 pb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ name }</h5>
                <div className="card-info">
                  <p>metric: { slo.metric }</p>
                  <p>type: { slo.type }</p>
                  <p>summary: { slo.summary }</p>
                  <p>value: { slo.value }</p>
                  <p>unit: { slo.unit }</p>

                </div>
                <Button
                  color="primary"
                  onClick={() => {
                    toggleModal();
                    editSloClick(slo);
                  }}
                >Edit</Button>
              </div>
            </div>
          </div>
        ))
      }
    </div>

    <div className="col-3">
      <h5 className="text-secondary">Done, next step:</h5>
      <Link
        to="/setup/stepThree"
        onClick={stepNext}
        className={classnames("btn btn-primary", { disabled: addedApps.length === 0 })}
      > Begin HyperPiloting </Link>
    </div>

    <Modal isOpen={isModalOpen} toggle={toggleModal}>
      <Form
        model="forms.slo"
        className="modal-form"
        onSubmit={slo => onSubmitClick(slo)}
      >
        <ModalHeader toggle={toggleModal}>Edit SLO Configuration</ModalHeader>
        <ModalBody>
          <div className="container">
            <div className="form-group">
              <label htmlFor="form-metric">Metric</label>
              <Control.text
                id="form-metric"
                className="form-control"
                model=".metric"
              />
            </div>
            <div className="form-group">
              <label htmlFor="form-type">Type</label>
              <Control.select
                id="form-type"
                className="form-control"
                model=".type"
              >
                <option value="rate">Rate</option>
                <option value="latency">Latency</option>
              </Control.select>
            </div>
            <div className="form-group">
              <label htmlFor="form-summary">Summary</label>
              <Control.text
                id="form-summary"
                className="form-control"
                model=".summary"
              />
            </div>
            <div className="form-group">
              <label htmlFor="form-value">Value</label>
              <Control.text
                id="form-value"
                className="form-control"
                model=".value"
              />
            </div>
            <div className="form-group">
              <label htmlFor="form-unit">Unit</label>
              <Control.text
                id="form-unit"
                className="form-control"
                model=".unit"
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
  stepNext: PropTypes.func.isRequired,
  editSloClick: PropTypes.func.isRequired,
};


const mapStateToProps = ({ setup }) => ({
  addedApps: setup.apps.filter(app => setup.addedAppIds.includes(app._id)),
  isModalOpen: setup.modal.isModalOpen,
});

const mapDispatchToProps = dispatch => ({
  toggleModal: () => dispatch(toggleModalStatus()),
  onSubmitClick: slo => dispatch(submitSloConfig(slo)),
  stepNext: () => dispatch(stretchProgressBar()),
  editSloClick: slo => dispatch(actions.change("slo", slo)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepTwo);
