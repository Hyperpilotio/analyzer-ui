import React from "react";
import PropTypes from "prop-types";
import { Table } from "reactstrap";
import Spinner from "react-spinkit";
import _ from "lodash";
import _s from "../containers/style.scss";


const getDisplayKind = kind => (
  _.get({ services: "Service", deployments: "Deployment", statefulsets: "StatefulSet" }, kind)
);

const MicroservicesTable = ({
  tbodyStyle, microservices,
  buttonElement, buttonOnClick,
  loadingState,
}) => (
  <div className={_s.MicroservicesTable}>
    <Table>
      <thead className="text-secondary">
        <tr className="row m-0">
          <th className="col">Namespace</th>
          <th className="col">Kind</th>
          <th className="col">Name</th>
          <th className="col" />
        </tr>
      </thead>
      <tbody style={tbodyStyle} className="d-block">
        { loadingState.fetchAvailableServices.pending ?
          <tr className={_s.loaderTr}>
            <td colSpan="7" className={_s.loaderTd}>
              <div className={_s.loaderCon}>
                <Spinner fadeIn="quarter" name="pacman" />
              </div>
            </td>
          </tr> :
          microservices.map(({ namespace, kind, name }) => (
            <tr className="row m-0" key={`${namespace}-${kind}-${name}`}>
              <td className="col">{ namespace }</td>
              <td className="col">{ getDisplayKind(kind) }</td>
              <td className="col">{ name }</td>
              <td className="col">
                { React.cloneElement(buttonElement, {
                  onClick: () => buttonOnClick({ namespace, kind, name }),
                })
                }
              </td>
            </tr>
          ))
        }
      </tbody>
    </Table>
  </div>
);

MicroservicesTable.propTypes = {
  tbodyStyle: PropTypes.object.isRequired,
  microservices: PropTypes.array.isRequired,
  buttonElement: PropTypes.object.isRequired,
  buttonOnClick: PropTypes.func.isRequired,
  loadingState: PropTypes.object.isRequired,
};


export default MicroservicesTable;
