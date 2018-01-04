import { combineForms } from "react-redux-form";
import reduceReducers from "reduce-reducers";
import _ from "lodash";
import * as types from "../actions/types";
import { flattenResourcesData } from "../lib/utils";
import { SUCCESS } from "../constants/apiActions";

export default reduceReducers(
  combineForms({
    basicInfo: {
      app_id: null,
      name: "",
      type: "long-running",
    },
    microservices: [],
    sloSource: {
      APM_type: "prometheus",
      service: {
        namespace: "",
        kind: "",
        name: "",
      },
      port: 7998,
    },
    slo: {
      threshold: {
        type: "UB",
        value: 0,
        unit: "ms",
      },
      metric: {
        name: "",
        type: "latency",
        tags: [],
      },
    },
    management_features: [
      {
        name: "interference_management",
        status: "Enabled",
        remediation_policy: [
          {
            action_name: "move_container",
            mode: "Manual",
            constraints: {},
          },
          {
            action_name: "resize_container",
            mode: "Manual",
            constraints: {},
          },
          {
            action_name: "resize_node",
            mode: "Manual",
            constraints: {},
          },
        ],
      },
      {
        name: "bottleneck_management",
        status: "Enabled",
        remediation_policy: [
          {
            action_name: "resize_container",
            mode: "Manual",
            constraints: {},
          },
          {
            action_name: "resize_node",
            mode: "Manual",
            constraints: {},
          },
          {
            action_name: "scale_service",
            mode: "Manual",
            constraints: {},
          },
        ],
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
        flattenResourcesData(action.payload.data),
        _.clone,
      );
    case types.FETCH_METRICS[SUCCESS]:
      return _.setWith(
        { ...state },
        "forms.slo.$form.metricOptions",
        action.payload.metrics,
        _.clone,
      );
    case types.EMPTY_METRIC_OPTIONS:
      return _.setWith(
        { ...state },
        "forms.slo.$form.metricOptions",
        [],
        _.clone,
      );
    case types.TOGGLE_RIGHT_SIDE_STATE:
      return _.setWith(
        { ...state },
        "forms.slo.$form.isDisable",
        !action.isDisable,
        _.clone,
      );
    default:
      return state;
    }
  },
);
