import React from "react";
import { Link } from "react-router-dom";
import { Row, Table } from "reactstrap";
import FaEdit from "react-icons/lib/fa/edit";
import MdDelete from "react-icons/lib/md/delete";
import _ from "lodash";
import PropTypes from "prop-types";
import Spinner from "react-spinkit";
import Linked from "~/commons/components/Linked";
import AppStatusBadge from "../AppStatusBadge";
import { getSLODisplay } from "../../lib/utils";
import * as modalTypes from "../../constants/modalTypes";
import withModal from "../../lib/withModal";
import _s from "./style.scss";

const DashboardAppsTable = ({
  isLoading, applications,
  incidents, openRemoveModal,
}) => (
  <Table className={_s.DashboardAppsTable} hover>
    <thead>
      <tr>
        <th>App Name</th>
        <th>Type</th>
        <th>Services</th>
        <th>SLO</th>
        <th>Issues detected</th>
        <th>State</th>
        <th />
      </tr>
    </thead>
    <tbody>
      { isLoading ?
        <tr>
          <td colSpan="7" style={{ textAlign: "center" }}>
            <div className={_s.loaderCon}>
              <Spinner fadeIn="quarter" name="pacman" className={_s.loader} />
            </div>
          </td>
        </tr>
        :
        applications.map((app) => {
          if (app.state === "Registered") {
            return (
              <Linked tag="tr" to={`/apps/${app.app_id}/edit/1`} key={app.app_id}>
                <td>{ app.name }</td>
                <td>{ app.type }</td>
                <td />
                <td />
                <td />
                <td>{ app.state }</td>
                <td>
                  <Link className="mr-2" to={`/apps/${app.app_id}/edit/1`}>
                    <FaEdit className={_s.iconGrp} />
                  </Link>
                  <MdDelete
                    className={_s.iconGrp}
                    onClick={(e) => {
                      e.stopPropagation();
                      openRemoveModal(app.app_id);
                    }}
                  />
                </td>
              </Linked>
            );
          } else if (app.state === "Unregistered") {
            return null;
          }

          return (
            <Linked tag="tr" to={`/dashboard/${app.app_id}`} key={app.app_id}>
              <td>{ app.name }</td>
              <td>{ app.type }</td>
              <td>{ _.size(app.microservices) }</td>
              <td>{ getSLODisplay(app.slo) }</td>
              <td><AppStatusBadge className={_s.Badge} app={app} /></td>
              <td>{ app.state }</td>
              <td>
                <Link onClick={e => e.stopPropagation()} className="mr-2" to={`/apps/${app.app_id}/edit/1`}>
                  <FaEdit className={_s.iconGrp} />
                </Link>
                <MdDelete
                  className={_s.iconGrp}
                  onClick={(e) => {
                    e.stopPropagation();
                    openRemoveModal(app.app_id);
                  }}
                />
              </td>
            </Linked>
          );
        })
      }
    </tbody>
  </Table>
);

DashboardAppsTable.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  incidents: PropTypes.array.isRequired,
  removeApp: PropTypes.func.isRequired,
};

export default (DashboardAppsTable);
