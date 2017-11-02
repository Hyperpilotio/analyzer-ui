export const initialSloState = {
  metric: "running speed",
  type: "Rate",
  summary: "25p",
  value: 0,
  unit: "USD",
};


export const editStepNames = [
  null,
  "Step 1: General",
  "Step 2: Underlying Services",
  "Step 3: SLO",
  "Step 4: Management Features",
];

export const fakeIncidents = {
  "59f1a327a1619a473de6c5ae": [
    {
      id: 1,
      type: "SLO_violation",
      timestamp: new Date(),
    },
  ],
  "59f1a327a1619a473de6c5b0": [],
  "59f1a327a1619a473de6c5b2": [],
};

export const fakeRisks = {
  "59f1a327a1619a473de6c5ae": [],
  "59f1a327a1619a473de6c5b0": [
    {
      id: 1,
      type: "resource_bottleneck",
      timestamp: new Date(),
    },
  ],
  "59f1a327a1619a473de6c5b2": [],
};

export const fakeOpportunities = {
  "59f1a327a1619a473de6c5ae": [],
  "59f1a327a1619a473de6c5b0": [],
  "59f1a327a1619a473de6c5b2": [
    {
      id: 1,
      type: "node_saturation",
      timestamp: new Date(),
    },
  ],
};

export default initialSloState;
