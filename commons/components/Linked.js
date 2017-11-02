import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ReactRouterPropTypes from "react-router-prop-types";

const Linked = ({ to, replace, tag, history, ...props }) => (
  React.createElement(tag, {
    onClick: () => {
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    },
    ...props,
  })
);

Linked.propTypes = {
  to: ReactRouterPropTypes.location.isRequired,
  replace: PropTypes.bool,
  tag: PropTypes.oneOf([PropTypes.string, PropTypes.func]).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

Linked.defaultProps = {
  replace: false,
};

export default withRouter(Linked);
