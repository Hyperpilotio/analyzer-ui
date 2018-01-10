import React from "react";
import PropTypes from "prop-types";
import FaLoadingCircle from "react-icons/lib/fa/circle-o-notch";
import Button from "reactstrap";
import _s from "./style.scss";

class AsyncButton extends React.Component {
  static propTypes = {
    isDisabled: PropTypes.bool,
    isLoading: PropTypes.bool.isRequired,
    color: PropTypes.string,
    text: PropTypes.string.isRequired,
  }

  render = () => {
    const { isDisabled, isLoading, color, text } = this.props;
    return (
      <button className={`btn btn-${color}`} type="submit" disabled={isDisabled || false}>
        { isLoading ? <FaLoadingCircle className={`mr-1 mb-1 ${_s.rotating}`} /> : null}
        {text}
      </button>
    );
  }
}

export default AsyncButton;
