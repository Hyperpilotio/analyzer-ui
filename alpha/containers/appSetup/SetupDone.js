import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button } from "reactstrap";
import _ from "lodash";
import { app as AppPropType } from "../../constants/propTypes";
import Spinner from "../../components/Spinner";
import CheckMark from "../../components/CheckMark";
import _s from "../style.scss";

const SetupDone = ({
  basicInfo,
  loadingState,
}) => (
  <Container className="effect-fade-in">
    { _.get(loadingState.activateApp.map, [basicInfo.app_id, "pending"], false) ?
      <div className={`spinner-con loading ${_s.spinnerCon}`}>
        <Spinner />
      </div>
      : null
    }
    { !_.get(loadingState.activateApp.map, [basicInfo.app_id, "pending"], false) ?
      <div className={`check-con done ${_s.checkCon}`}>
        <CheckMark />
      </div>
      : null
    }
    {
      _.get(loadingState.activateApp.map, [basicInfo.app_id, "pending"], false) ?
        <h4 className={_s.wordLoading}>Setting up HyperPilot ...</h4> : null
    }
    {
      !_.get(loadingState.activateApp.map, [basicInfo.app_id, "pending"], false) ?
        <div>
          <h4 className={_s.wordSuccess}>HyperPilot is now running for {basicInfo.name}! </h4>
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
  basicInfo: PropTypes.object.isRequired,
  loadingState: PropTypes.object.isRequired,
};

const mapStateToProps = ({ createAppForm, ui }) => ({
  basicInfo: createAppForm.basicInfo,
  loadingState: {
    activateApp: ui.ACTIVATE_APP,
  },
});

export default connect(
  mapStateToProps,
)(SetupDone);
