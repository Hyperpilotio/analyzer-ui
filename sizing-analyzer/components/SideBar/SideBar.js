import React, { Component } from "react";
import CollapseSelect from "../CollapseSelect";
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

class SideBar extends Component {
  state = {
    isOpen: true,
  }
  render() {
    return (
      <div
        className={_s.sideBar}
        style={{ transform: `translateX(${this.state.isOpen ? 0 : 450}px)` }}
      >
        <button
          className={_s.cancel}
          onClick={() => { this.setState({ isOpen: false }); }}
        >cancel</button>
        <h3>Search Label</h3>
        <input />
        <CollapseSelect title="App" list={collapses.App} />
        <CollapseSelect title="Image" list={collapses.Image} />
      </div>
    );
  }
}

export default SideBar;
