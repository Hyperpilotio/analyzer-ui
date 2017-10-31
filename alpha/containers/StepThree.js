import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { beginHyperPiloting } from "../actions";
import _s from "./style.scss";

class StepThree extends React.Component {
  componentWillMount() {
    this.props.beginHPClick();
  }
  render() {
    const {
      isBeginHyperPilotingLoading,
      isHPReady,
    } = this.props;
    return (
      <Container>

        { isBeginHyperPilotingLoading ?
          <div className="spinner-con loading">
            <div className="first spinner-grp">
              <div className="second spinner-grp">
                <div className="third spinner-grp" />
              </div>
            </div>
          </div>
          : null
        }
        { !isBeginHyperPilotingLoading && isHPReady ?
          <div className={`check-con done ${_s.checkCon}`}>
            <svg
              className="checkmark"
              viewBox="0 0 52 52"
            >
              <circle
                className="checkmark__circle"
                cx="26"
                cy="26"
                r="25"
                fill="none"
              />
              <path
                className="checkmark__check"
                fill="none"
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>

          </div>
          : null
        }
        {
          isBeginHyperPilotingLoading ?
            <h4 className={_s.wordLoading}>Setting up HyperPilot ...</h4> : null
        }
        {
          !isBeginHyperPilotingLoading && isHPReady ?
            <h4 className={_s.wordSuccess}>HyperPilot is now running! </h4> : null
            
        }

      </Container>
    );
  }
}

StepThree.propTypes = {
  isBeginHyperPilotingLoading: PropTypes.bool.isRequired,
  isHPReady: PropTypes.bool.isRequired,
  beginHPClick: PropTypes.func.isRequired,
};

const mapStateToProps = ({ setup }) => ({
  isBeginHyperPilotingLoading: setup.ui.isBeginHyperPilotingLoading,
  isHPReady: setup.isHPReady,
});

const mapDispatchToProps = dispatch => ({
  beginHPClick: () => dispatch(beginHyperPiloting()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepThree);
