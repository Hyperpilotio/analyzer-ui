import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
          <p>No apps selected</p>
        </div>
        :
        addedApps.map(app => (
          <div key={app._id} className="col-3 pt-2 pb-2">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ app.name }</h5>
                
                <button type="button" className="card-link" data-toggle="modal" data-target="#exampleModal">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))
      }
    </div>

    <div id="exampleModal" className="modal fade">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
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
              <div className="btn-con">
                <button className={`btn btn-default ${_s.btnGrp}`} onClick={onCancelClick}>Cancel</button>
                <button type="submit" className={`btn btn-primary ${_s.btnGrp}`}>Submit</button>
              </div>
            </Form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-primary">Save changes</button>
            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
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
