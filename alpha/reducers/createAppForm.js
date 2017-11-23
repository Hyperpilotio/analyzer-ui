import { combineForms } from "react-redux-form";
import reduceReducers from "reduce-reducers";
import _ from "lodash";
import * as types from "../actions/types";
import { flattenResourcesData } from "../lib/utils";
import { SUCCESS } from "../constants/apiActions";

export default reduceReducers(
  combineForms({
    basicInfo: {
      name: "",
      type: "long-running",
    },
    microservices: [],
    sloSource: {
      APM_type: "prometheus",
      service_name: "",
      port: 9090,
    },
    slo: {
      metric: "",
      type: "latency",
      summary: "",
      value: 0,
      unit: "ms",
    },
    management_features: [
      {
        name: "interference_management",
        status: "Enabled",
        remediation_policy: [
          // {
          //   action_name: "move_container",
          //   mode: "Manual",
          //   constraints: {},
          // },
          // {
          //   action_name: "resize_node",
          //   mode: "Manual",
          //   constraints: {},
          // }
        ],
      },
      {
        name: "bottleneck_management",
        status: "Enabled",
        remediation_policy: [],
      },
      {
        name: "efficiency_management",
        status: "Enabled",
        remediation_policy: [],
      },
    ],
  }, "createAppForm"),

  (state, action) => {
    switch (action.type) {
    case types.FETCH_AVAILABLE_SERVICES[SUCCESS]:
      return _.setWith(
        { ...state },
        "forms.microservices.$form.options",
        flattenResourcesData(action.payload.namespaces),
        _.clone,
      );
    case types.SAVE_SLO_SOURCE[SUCCESS]:
      return _.setWith(
        { ...state },
        "forms.slo.$form.metricOptions",
        action.payload.metrics,
        _.clone,
      )
    default:
      return state;
    }
  }
)
