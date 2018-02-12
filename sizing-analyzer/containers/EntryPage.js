import React from "react";
import { connect } from "react-redux";
// import _ from "lodash";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { entryList } from "../constants/tempData";
import _s from "./style.scss";

const mapStateToProps = ({
  
});

const mapDispatchToProps = dispatch => ({
  
});

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
            <Button className={_s.linkBtn}>
              <Link to={d.link}>{d.text}</Link>
            </Button>
          ))
        }
      </div>
    );
  }
}
/* eslint-enable */
