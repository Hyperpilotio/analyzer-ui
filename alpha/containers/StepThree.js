import React from "react";
import { connect } from "react-redux";
import { Container } from "reactstrap";

const StepThree = ({ isUpdatingSingleSloLoading, }) => (
  <Container>

    <div className="spinner-con loading">
      <div className="first spinner-grp">
        <div className="second spinner-grp">
          <div className="third spinner-grp" />
        </div>
      </div>
    </div>

    <div className="check-con done">
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
    {
      isUpdatingSingleSloLoading ? <h4>Sending Configuration to DB ...</h4> : <h4>Done</h4>
    }

  </Container>
);

const mapStateToProps = ({ setup }) => ({
  isUpdatingSingleSloLoading: setup.ui.isUpdatingSingleSloLoading,
});

const mapDispatchToProps = () => {

};


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StepThree);
