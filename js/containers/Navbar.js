import React, { Component } from "react";
import _ from "lodash";
import NavbarComponent from "../components/Navbar";


export default class Navbar extends Component {

  state = { calibration: [], profiling: [], validation: [] }

  async fetchData() {
    const res = await fetch("/api/available-apps");
    const data = await res.json();
    this.setState(data);
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return <NavbarComponent availableApps={this.state} />
  }
}
