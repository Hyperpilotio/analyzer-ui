import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button } from "reactstrap";
import { app as AppPropType } from "../../constants/propTypes";
import Spinner from "../../components/Spinner";
import CheckMark from "../../components/CheckMark";
import _s from "../style.scss";

const SetupDone = ({
  LoadingState,
  appName,
}) => (
  <Container className="effect-fade-in">
    { LoadingState.activateApp ?
      <div className={`spinner-con loading ${_s.spinnerCon}`}>
        <Spinner />
      </div>
      : null
    }
    { !LoadingState.activateApp ?
      <div className={`check-con done ${_s.checkCon}`}>
        <CheckMark />
      </div>
      : null
    }
    {
      LoadingState.activateApp ?
        <h4 className={_s.wordLoading}>Setting up HyperPilot ...</h4> : null
    }
    {
      !LoadingState.activateApp ?
        <div>
          <h4 className={_s.wordSuccess}>HyperPilot is now running for {appName}! </h4>
          <div className="row">
            <Button className={`btn btn-success mt-3 ${_s.btnReturn}`}>
              <Link to="/dashboard">
                Back to App list
              </Link>
            </Button>
          </div>
        </div>
        : null
    }
  </Container>
);

SetupDone.propTypes = {
  appName: PropTypes.string,
  LoadingState: PropTypes.object.isRequired,
};

const mapStateToProps = ({ createAppForm, ui }) => ({
  appName: createAppForm.basicInfo.name,
  LoadingState: {
    activateApp: ui.isActivateAppLoading,
  },
});

export default connect(
  mapStateToProps,
)(SetupDone);
