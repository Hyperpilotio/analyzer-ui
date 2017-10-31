import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import PropTypes from "prop-types";
import ReactRouterPropTypes from "react-router-prop-types";
import { addToHyperPilot, removeFromHyperPilot, stretchProgressBar } from "../actions";
import { app as appPropType } from "../constants/propTypes";
import _s from "./style.scss";

const StepOne = ({
  availableApps,
  addedApps,
  onAddClick,
  onRemoveClick,
  stepNext,
  location,
}) => (
  <div className={`container ${_s.stepOneCon}`}>
    <div className="row pt-4 pb-1">
      <div className="col-sm-12">
        <h4>Step 1: Add Applications to HyperPilot</h4>
      </div>
    </div>
    <div className={`row ${_s.cardsPool}`}>
      {
        availableApps.map(app => (
          <div className="col-3 pt-2 pb-2" key={app._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{ app.name }</h5>
                <Link
                  to={location}
                  onClick={() => onAddClick(app._id)}
                  className="card-link"
                >Add</Link>
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
          { addedApps.length === 0 ?
            <div className="col">
              <p>No applications selected yet, click &quot;Add&quot; to add an app to HyperPilot</p>
            </div> :
            addedApps.map(app => (
              <div className="col-4 pt-2 pb-2" key={app._id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{ app.name }</h5>
                    <Link
                      to={location}
                      onClick={() => onRemoveClick(app._id)}
                      className="card-link"
                    >Remove</Link>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <div className="col-3">
        <h5 className="text-secondary">Done, next step:</h5>
        <Link
          to="/setup/stepTwo"
          onClick={stepNext}
          className={classnames("btn btn-primary", { disabled: addedApps.length === 0 })}
        > Define SLO </Link>
      </div>
    </div>
  </div>
);

StepOne.propTypes = {
  availableApps: PropTypes.arrayOf(appPropType).isRequired,
  addedApps: PropTypes.arrayOf(appPropType).isRequired,
  onAddClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  stepNext: PropTypes.func.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

const mapStateToProps = ({ setup: { apps, addedAppIds } }) => ({
  availableApps: apps.filter(app => !addedAppIds.includes(app._id)),
  addedApps: apps.filter(app => addedAppIds.includes(app._id)),
});

const mapDispatchToProps = dispatch => ({
  onAddClick: id => dispatch(addToHyperPilot(id)),
  onRemoveClick: id => dispatch(removeFromHyperPilot(id)),
  stepNext: () => dispatch(stretchProgressBar()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepOne);

