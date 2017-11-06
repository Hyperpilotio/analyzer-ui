import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Table, Button } from "reactstrap";
import MdEdit from "react-icons/lib/md/edit";
import MdDelete from "react-icons/lib/md/cancel";
import { fetchApps, resetStepNumber } from "../../actions";
import { app as appPropType } from "../../constants/propTypes";
import _s from "../style.scss";

class SetupList extends React.Component {
  componentWillMount() {
    this.props.fetchApps();
    this.props.resetStep();
  }

  render() {
    const {
      apps,
    } = this.props;
    return (
      <div className="container">
        <div className="row pt-5">
          <Link
            to={"/setup/add"}
            className="btn btn-primary mt-5 mb-2"
            color="success"
          >
            + Add
          </Link>
        </div>

        <div className="row">
          <Table hover >
            <thead>
              <tr>
                <th>APP Name</th>
                <th>Services</th>
                <th>SLO</th>
                <th>STATE</th>
                <th>{null}</th>
              </tr>
            </thead>
            <tbody>
              {
                apps.map(d => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{d.services.length}</td>
                    <td>{d.slo.type}: {d.slo.value} {d.slo.unit}</td>
                    <td>{d.state}</td>
                    <td>
                      <Link to={`/setup/edit/${d._id}`}><MdEdit className={`mr-3 ${_s.iconGrp}`} /></Link>
                      <Link to="/"><MdDelete className={_s.iconGrp} /></Link>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </Table>
        </div>
        <div className="row mt-4">
          <Button className={`btn btn-success ${_s.btnBegin}`}>
            <Link to="/setup/done">
              Begin Hyperpiloting
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

SetupList.propTypes = {
  apps: PropTypes.arrayOf(appPropType).isRequired,
  fetchApps: PropTypes.func.isRequired,
  resetStep: PropTypes.func.isRequired,
};

const mapStateToProps = ({ setup }) => ({
  stepPercent: setup.stepPercent,
  apps: setup.apps,
});

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(fetchApps()),
  resetStep: () => dispatch(resetStepNumber()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SetupList);
