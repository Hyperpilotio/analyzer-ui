import React from "react";
import { connect } from "react-redux";
import ProgressBar from "~/commons/components/ProgressBar";
import { addToHyperPilot, removeFromHyperPilot } from "../actions";


const SetupPage = ({ availableApps, addedApps, onAddClick, onRemoveClick }) => (
  <div className="container">
    <div className="row pt-5">
      <div className="col">
        <h3>SETUP HYPERPILOT</h3>
        <ProgressBar percent={33} />
      </div>
    </div>
    <div className="row pt-3">
      <div className="col">
        <nav className="nav nav-secondary nav-pills nav-fill">
          <a href="#" className="nav-item nav-link">Step 1: Select Applications</a>
          <a href="#" className="nav-item nav-link text-secondary">Step 2: Define SLO</a>
          <a href="#" className="nav-item nav-link text-secondary">Step 3: Begin HyperPiloting</a>
        </nav>
      </div>
    </div>
    <div className="row pt-4 pb-1">
      <div className="col-sm-12">
        <h4>Step 1: Add Applications to HyperPilot</h4>
      </div>
    </div>
    <div className="row" style={{ maxHeight: "300px", overflow: "scroll" }}>
      {
        availableApps.map(app => (
          <div className="col-3 pt-2 pb-2" key={app.id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ app.name }</h5>
                <a onClick={() => onAddClick(app.id)} href="#" className="card-link">Add</a>
              </div>
            </div>
          </div>
        ))
      }
    </div>
    <hr />
    <div className="row pt-2">
      <div className="col">
        <h4 className="text-secondary">Selected Applications</h4>
      </div>
    </div>
    <div className="row">
      <div className="col-9 p-0">
        <div className="row m-0">
          {
            addedApps.map(app => (
              <div className="col-4 pt-2 pb-2" key={app.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{ app.name }</h5>
                    <a href="#" onClick={() => onRemoveClick(app.id)} className="card-link">Remove</a>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="col-3">
        <h5 className="text-secondary">Done, next step:</h5>
        <a className="btn btn-primary" href="#">Define SLO</a>
      </div>
    </div>
  </div>
);


const mapStateToProps = ({ apps, addedAppIds }) => ({
  availableApps: apps.filter(app => !addedAppIds.includes(app.id)),
  addedApps: apps.filter(app => addedAppIds.includes(app.id)),
});

const mapDispatchToProps = dispatch => ({
  onAddClick: id => dispatch(addToHyperPilot(id)),
  onRemoveClick: id => dispatch(removeFromHyperPilot(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupPage);
