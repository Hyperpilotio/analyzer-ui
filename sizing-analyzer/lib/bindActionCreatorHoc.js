import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as Comps from "../actions/comps";

export default function bindActionCreatorHoc(WrappedComponent) {
  /* eslint-disable */
  class Wrapper extends React.Component {
    render = () => (<WrappedComponent {...this.props} />);
  }
  /* eslint-enable */
  const mapDispatchToProps = dispatch => ({
    compsAction: bindActionCreators(Comps, dispatch),
  });
  return connect(null, mapDispatchToProps)(Wrapper);
}
