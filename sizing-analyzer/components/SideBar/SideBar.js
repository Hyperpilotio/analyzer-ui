import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import CollapseSelect from "../CollapseSelect";
import bindActionCreatorHoc from "../../lib/bindActionCreatorHoc";
import _s from "./style.scss";

const collapses = {
  App: [
    "action",
    "action-canry",
    "action-classify",
  ],
  Image: [
    "action",
    "action-canry",
    "action-classify",
  ],
};

/* eslint-disable */
class SideBar extends Component {

  toggleSideBar = () => {
    this.props.compsAction.toggleSideBar();
  }

  render() {
    const {
      isOpen,
      compsAction,
    } = this.props;
    return (
      <div
        className={_s.sideBar}
        style={{ transform: `translateX(${isOpen ? 0 : 450}px)` }}
      >
        <button
          className={_s.cancel}
          onClick={this.toggleSideBar}
        >cancel</button>
        <h3>Search Label</h3>
        <input />
        <h3>Select existing labels</h3>
        <CollapseSelect title="App" list={collapses.App} />
        <CollapseSelect title="Image" list={collapses.Image} />
      </div>
    );
  }
}
/* eslint-enable */

const mapStateToProps = ({ comps }) => ({
  isOpen: comps.sideBar.isOpen,
});

export default compose(
  connect(mapStateToProps),
  bindActionCreatorHoc,
)(SideBar);
