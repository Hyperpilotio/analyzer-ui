import React, { Component } from "react";
import {
  Collapse, Button,
  CardBody, Card, Select
} from "reactstrap";
import _s from "./style.scss";




class CollapseSelect extends Component {
  state = {
    collapse: true,
  }

  toggle = () => {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const {
      title,
      list,
    } = this.props;
    return (
      <div className={_s.collapseSelect} >
        <h3>Select existing labels</h3>
        <button className={_s.collapseBtn} onClick={this.toggle}>{`${title}(${list.length})`}</button>
        <Collapse isOpen={this.state.collapse}>
          <Card>
            <CardBody>
              <ul>
                {list.map(d => (
                  <li className={_s.option}>{d}</li>
                ))}
              </ul>
            </CardBody>
          </Card>
        </Collapse>
      </div>
    );
  }
}

export default CollapseSelect;
