import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Button } from "reactstrap";
import { app as AppPropType } from "../../constants/propTypes";
import { beginHyperPiloting } from "../../actions";
import Spinner from "../../components/Spinner";
import CheckMark from "../../components/CheckMark";
import _s from "../style.scss";

class SetupDone extends React.Component {
  componentWillMount() {
    this.props.beginHPClick();
  }
  render() {
    const {
      isBeginHyperPilotingLoading,
      isHPReady,
      editApp,
    } = this.props;
    return (
      <Container className="effect-fade-in">

        { isBeginHyperPilotingLoading ?
          <div className={`spinner-con loading ${_s.spinnerCon}`}>
            <Spinner />
          </div>
          : null
        }
        { !isBeginHyperPilotingLoading && isHPReady ?
          <div className={`check-con done ${_s.checkCon}`}>
            <CheckMark />
          </div>
          : null
        }
        {
          isBeginHyperPilotingLoading ?
            <h4 className={_s.wordLoading}>Setting up HyperPilot ...</h4> : null
        }
        {
          !isBeginHyperPilotingLoading && isHPReady ?
            <div>
              <h4 className={_s.wordSuccess}>HyperPilot is now running for {editApp.name}! </h4>
              <div className="row">
                <Button className={`btn btn-success mt-3 ${_s.btnReturn}`}>
                  <Link to="/setup">
                    Back to App list
                  </Link>
                </Button>
              </div>
            </div>
            : null
        }
      </Container>
    );
  }
}

SetupDone.propTypes = {
  isBeginHyperPilotingLoading: PropTypes.bool.isRequired,
  isHPReady: PropTypes.bool.isRequired,
  beginHPClick: PropTypes.func.isRequired,
  editApp: AppPropType.isRequired,
};

const mapStateToProps = ({ setup, setup: { editApp } }) => ({
  isBeginHyperPilotingLoading: setup.ui.isBeginHyperPilotingLoading,
  isHPReady: setup.isHPReady,
  editApp,
});

const mapDispatchToProps = dispatch => ({
  beginHPClick: () => dispatch(beginHyperPiloting()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupDone);
