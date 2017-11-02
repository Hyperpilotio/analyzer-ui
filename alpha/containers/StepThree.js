import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "reactstrap";
import { beginHyperPiloting } from "../actions";
import Spinner from "../components/Spinner";
import CheckMark from "../components/CheckMark";
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
