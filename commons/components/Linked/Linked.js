import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import ReactRouterPropTypes from "react-router-prop-types";
import classnames from "classnames";
import _ from "lodash";
import styles from "./Linked.scss";

const Linked = ({ to, replace, tag, history, className, ...props }) => (
  React.createElement(tag, {
    onClick: () => {
      if (replace) {
        history.replace(to);
      } else {
        history.push(to);
      }
    },
    className: classnames(styles.Linked, className),
    ..._.omit(props, ["match", "location", "staticContext"]),
  })
);

Linked.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, ReactRouterPropTypes.location]).isRequired,
  replace: PropTypes.bool,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
  history: ReactRouterPropTypes.history.isRequired,
  className: PropTypes.string,
};

Linked.defaultProps = {
  replace: false,
  className: "",
};

export default withRouter(Linked);
