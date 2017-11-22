import { combineForms } from "react-redux-form";

export default combineForms({
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
}, "createAppForm")
