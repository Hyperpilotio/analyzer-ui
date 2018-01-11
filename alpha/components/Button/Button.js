import React from "react";
import PropTypes from "prop-types";
import FaLoadingCircle from "react-icons/lib/fa/circle-o-notch";
import { Button as BSButton } from "reactstrap";
import _s from "./style.scss";

const Button = ({ isDisabled, isLoading, children, ...props }) => (
  <BSButton {...props} disabled={isDisabled}>
    { isLoading ? <FaLoadingCircle className={`mr-1 mb-1 ${_s.rotating}`} /> : null }
    { children }
  </BSButton>
);

Button.propTypes = {
  ...BSButton.propTypes,
  isLoading: PropTypes.bool,
  isDisabled: PropTypes.bool,
};

Button.defaultProps = {
  ...BSButton.defaultProps,
  isLoading: false,
  isDisabled: false,
};

export default Button;
