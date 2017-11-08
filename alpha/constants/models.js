export const initialGeneralState = {
  name: "",
  type: "",
};

export const initialSloState = {
  metric: "",
  type: "",
  summary: "",
  value: "",
};

export const initialFeaturesState = {
  management_features: [
    {
      name: "interference_management",
      mode: "Disabled",
      policy: [],
    },
    {
      name: "bottleneck_management",
      mode: "Semi-Auto",
      policy: [],
    },
    {
      name: "efficiency_management",
      mode: "Auto",
      policy: [],
    },
  ],
};

export const initialEditAppState = {
  name: "",
  type: "",
  services: [],
  slo: {
    metric: "",
    type: "",
    summary: "",
    value: "",
  },
  management_features: [
    {
      name: "interference_management",
      mode: "Disabled",
      policy: [],
    },
    {
      name: "bottleneck_management",
      mode: "Semi-Auto",
      policy: [],
    },
    {
      name: "efficiency_management",
      mode: "Auto",
      policy: [],
    },
  ],
};

export const editStepNames = [
  null,
  "Step 1: General",
  "Step 2: Underlying Services",
  "Step 3: SLO",
  "Step 4: Management Features",
];

export default initialEditAppState;
