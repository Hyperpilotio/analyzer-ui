import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Modal from "react-modal";
import {
  Control,
  Form,
} from "react-redux-form";
import { editSingleApp, submitSloConfig, closeModal } from "../actions/index";
import _s from "./style.scss";

const StepTwo = ({ addedApps, isModalOpen, onEditClick, onSloSubmit, onCancelClick }) => (

  <div className={`container ${_s.stepTwo}`}>
    <div className="row pt-4">
      { addedApps.length === 0 ?
        <div className="col">
          <p>There is no addedApps yet.</p>
        </div>
        :
        addedApps.map(app => (
          <div key={app._id} className="col-3 pt-2 pb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ app.name }</h5>
                <Link
                  to={location}
                  onClick={() => onEditClick(app._id)}
                  className="card-link"
                >Edit</Link>
              </div>
            </div>
          </div>
        ))
      }
    </div>
    <Modal isOpen={isModalOpen}>
      <div className="modal-bg">
        <Form
          model="deep.slo"
          className="modal-form"
          onSubmit={slo => onSloSubmit(slo)}
        >
          <h2>Please choose a custom SLO configure</h2>
          <div className="container">
            <div className="form-group">
              <label htmlFor="metric">Metric</label>
              <Control.text
                type="text"
                className="form-control"
                model=".metric"
              />
            </div>
            <div className="form-group">
              <label htmlFor="latency">Latency</label>
              <Control.text
                type="text"
                className="form-control"
                model=".latency"
              />
            </div>
            <div className="form-group">
              <label htmlFor="form-treshold">Threshold</label>
              <Control.text
                type="text"
                id="form-threshold"
                className="form-control"
                model=".treshold"
              />
            </div>
          </div>
          <div className="btn-con">
            <button className={`btn btn-default ${_s.btnGrp}`} onClick={onCancelClick}>Cancel</button>
            <button type="submit" className={`btn btn-primary ${_s.btnGrp}`}>Submit</button>
          </div>
        </Form>
      </div>
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
  onEditClick: PropTypes.func.isRequired,
  onSloSubmit: PropTypes.func.isRequired,
};


const mapStateToProps = ({ setup }) => ({
  addedApps: setup.apps.filter(app => setup.addedAppIds.includes(app._id)),
  isModalOpen: setup.modal.isModalOpen,
});

const mapDispatchToProps = dispatch => ({
  onEditClick: id => dispatch(editSingleApp(id)),
  onSloSubmit: slo => dispatch(submitSloConfig(slo)),
  onCancelClick: () => dispatch(closeModal()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepTwo);
