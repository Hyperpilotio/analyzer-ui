import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// import * as Common from "../actions/common";

export default function bindActionCreatorHoc(WrappedComponent) {
  // const Wrapper = () => (<WrappedComponent {...this.props} />);
  class Wrapper extends React.Component {
    render = () => (<WrappedComponent {...this.props} />);
  }

  const mapDispatchToProps = dispatch => ({
    // adminAction: bindActionCreators(Admin, dispatch),
  });
  return connect(null, mapDispatchToProps)(Wrapper);
}
