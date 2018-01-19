import React from "react";
import { Link } from "react-router-dom";
import { Table, Badge } from "reactstrap";
import FaTimesCircle from "react-icons/lib/fa/times-circle";
import FaLightbulbO from "react-icons/lib/fa/lightbulb-o";
import FaEdit from "react-icons/lib/fa/edit";
import MdDelete from "react-icons/lib/md/delete";
import _ from "lodash";
import PropTypes from "prop-types";
import Spinner from "react-spinkit";
import Linked from "~/commons/components/Linked";
import { getSLODisplay } from "../../lib/utils";
import _s from "./style.scss";

const DashboardAppsTable = ({
  applications, openRemoveModal, ui,
}) => (
  <Table className={_s.DashboardAppsTable} hover>
    <thead>
      <tr>
        <th>App Name</th>
        <th>Type</th>
        <th>Services</th>
        <th>SLO</th>
        <th>App Status</th>
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
                  { app.app_id === ui.removeApp.map ?
                    <div className={_s.loaderCon}>
                      <Spinner fadeIn="quarter" name="wave" className={_s.loader} />
                      <span>Deleting...</span>
                    </div>
                    :
                    <div>
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
                    </div>
                  }
                </td>
              </Linked>
            );
          } else if (app.state === "Unregistered") {
            return null;
          }

          const badge = app.hasIncident ?
            (
              <Badge className={_s.Badge} color="danger" >
                <FaTimesCircle className="mr-1" />
                Incidents
              </Badge>

            ) : null;
          return (
            <Linked tag="tr" to={`/dashboard/${app.app_id}`} key={app.app_id}>
              <td>{ app.name }</td>
              <td>{ app.type }</td>
              <td>{ _.size(app.microservices) }</td>
              <td>{ getSLODisplay(app.slo) }</td>
              <td>{ badge }</td>
              <td>{ app.state }</td>
              <td>
                {
                  app.app_id === ui.removeApp.map ?
                    <div className={_s.loaderCon}>
                      <Spinner fadeIn="quarter" name="wave" className={_s.loader} />
                      <span>Deleting...</span>
                    </div>
                    :
                    <div>
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
                    </div>
                }
              </td>
            </Linked>
          );
        })
      }
    </tbody>
  </Table>
);

DashboardAppsTable.propTypes = {
  applications: PropTypes.array.isRequired,
  openRemoveModal: PropTypes.func.isRequired,
  ui: PropTypes.object,
};

export default (DashboardAppsTable);
