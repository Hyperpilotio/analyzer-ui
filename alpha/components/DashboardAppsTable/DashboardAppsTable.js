import React from "react";
import { Link } from "react-router-dom";
import { Table, Badge } from "reactstrap";
import FaTimesCircle from "react-icons/lib/fa/times-circle";
import FaLightbulbO from "react-icons/lib/fa/lightbulb-o";
import _ from "lodash";
import MdDelete from "react-icons/lib/md/cancel";
import Linked from "~/commons/components/Linked";
import { getSLODisplay } from "../../lib/utils";
import _s from "./style.scss";


const DashboardAppsTable = ({ isLoading, apps, incidents, risks, opportunities, removeApp }) => (
  <Table className={_s.DashboardAppsTable} hover>
    <thead>
      <tr>
        <th>App Name</th>
        <th>Type</th>
        <th>Services</th>
        <th>SLO</th>
        <th>Issues detected</th>
        <th>State</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      { isLoading ? null :
        apps.map((app) => {
          if (app.state === "Registered") {
            return (
              <Linked tag="tr" to={`/apps/${app.app_id}/edit/1`} key={app.app_id}>
                <td>{ app.name }</td>
                <td>{ app.type }</td>
                <td />
                <td />
                <td />
                <td>{ app.state }</td>
                <td />
              </Linked>
            );
          }
          let badge;
          if (_.size(incidents[app._id]) !== 0) {
            badge = (
              <Badge className={_s.Badge} color="danger">
                <FaTimesCircle className="mr-1" />
                Incidents
              </Badge>
            );
          // Hiding this section for only doing P0
          // } else if (_.size(risks[app._id]) !== 0) {
          //   badge = (
          //     <Badge className={_s.Badge} color="warning">
          //       <FaExclamationCircle className="mr-1" />
          //       Risks
          //     </Badge>
          //   )
          } else if (_.size(opportunities[app._id]) !== 0) {
            badge = (
              <Badge className={_s.Badge} color="success">
                <FaLightbulbO className="mr-1" />
                Opportunities
              </Badge>
            );
          }
          return (
            <Linked tag="tr" to={`/dashboard/${app.app_id}`} key={app.app_id}>
              <td>{ app.name }</td>
              <td>{ app.type }</td>
              <td>{ _.size(app.microservices) }</td>
              <td>{ getSLODisplay(app.slo) }</td>
              <td>{ badge }</td>
              <td>{ app.state }</td>
              <td>
                {/* TODO: call delete item API */}
                <MdDelete
                  className={_s.iconGrp}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeApp(app._id);
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


export default DashboardAppsTable;
