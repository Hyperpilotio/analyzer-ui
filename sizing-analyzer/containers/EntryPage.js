import React from "react";
import { connect } from "react-redux";
// import _ from "lodash";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { entryList } from "../constants/tempData";
import _s from "./style.scss";

/* eslint-disable */
// @connect(mapStateToProps, mapDispatchToProps)
/* eslint-enable */
/* eslint-disable */
export default class EntryPage extends React.Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        {
          entryList.map( d => (
            <button key={d.key} className={_s.linkBtn} style={{ width: `${d.width}px`}}>
              <Link to={d.link}>{d.text}</Link>
            </button>
          ))
        }
      </div>
    );
  }
}
/* eslint-enable */
