export const initialEditAppState = {
  name: "",
  type: "",
  services: [],
  slo: {
    metric: "",
    type: "",
    summary: "",
    value: "",
    unit: "",
  },
  management_features: [
    {
      name: "interference_management",
      mode: "Manual",
      policy: [],
    },
    {
      name: "bottleneck_management",
      mode: "Manual",
      policy: [],
    },
    {
      name: "efficiency_management",
      mode: "Manual",
      policy: [],
    },
  ],
  state: "Active",
};

export const editStepNames = [
  null,
  "Step 1: General",
  "Step 2: Underlying Services",
  "Step 3: SLO",
  "Step 4: Management Features",
];

export default initialEditAppState;
