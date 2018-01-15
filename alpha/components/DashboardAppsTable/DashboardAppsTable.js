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
  isLoading, applications,
  incidents, openRemoveModal,
  isRemoveAppLoading, deletingAppId,
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
                  { isRemoveAppLoading && app.app_id === deletingAppId ?
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
          // if (_.size(incidents[app._id]) !== 0) {
          //   badge = (
          //     <Badge className={_s.Badge} color="danger">
          //       <FaTimesCircle className="mr-1" />
          //       Incidents
          //     </Badge>
          //   );
          // Hiding this section for only doing P0
          // } else if (_.size(risks[app._id]) !== 0) {
          //   badge = (
          //     <Badge className={_s.Badge} color="warning">
          //       <FaExclamationCircle className="mr-1" />
          //       Risks
          //     </Badge>
          //   )
          // } else if (_.size(opportunities[app._id]) !== 0) {
          //   badge = (
          //     <Badge className={_s.Badge} color="success">
          //       <FaLightbulbO className="mr-1" />
          //       Opportunities
          //     </Badge>
          //   );
          // }
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
                  isRemoveAppLoading && app.app_id === deletingAppId ?
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
  isLoading: PropTypes.bool.isRequired,
  isRemoveAppLoading: PropTypes.bool,
  incidents: PropTypes.array.isRequired,
  removeApp: PropTypes.func,
};

export default (DashboardAppsTable);
