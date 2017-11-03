import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ReactRouterPropTypes from "react-router-prop-types";
import _ from "lodash";

const Linked = ({ to, replace, tag, history, ...props }) => (
  React.createElement(tag, {
    onClick: () => {
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    },
    ..._.omit(props, ["match", "location", "staticContext"]),
  })
);

Linked.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, ReactRouterPropTypes.location]).isRequired,
  replace: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
};

Linked.defaultProps = {
  replace: false,
};

export default withRouter(Linked);
