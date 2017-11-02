export const initialSloState = {
  metric: "",
  type: "",
  summary: "",
  value: 0,
  unit: "",
};

export const fakeArr = [
  {
    _id: "59f1a327a1619a473de6c5ae",
    name: "goddd",
    type: "long-running",
    services: [{
      name: "goddd",
      state: "Running",
    }, {
      name: "pathfinder",
      state: "Running",
    }, {
      name: "mongo",
      state: "Running",
    }],
    slo: {
      metric: "initial speed",
      type: "throughput",
      summary: "95p",
      value: 300,
      unit: "req/s",
    },
    budget: {
      unit: "dollar",
      value: 300,
    },
    state: "Active",
  },
  {
    _id: "59f1a327a1619a473de6c5b0",
    name: "kafka",
    type: "long-running",
    services: [{
      name: "kafka-serve",
      state: "Pending",
    }, {
      name: "zookeeper",
      state: "Running",
    }],
    slo: {
      metric: "running speed",
      type: "latency",
      summary: "25p",
      value: 500,
      unit: "ms",
    },
    budget: {
      unit: "dollar",
      value: 300,
    },
    state: "Inactive",
  },
  {
    _id: "59f1a327a1619a473de6c5b2",
    name: "lucene",
    type: "batch-processing",
    services: [{
      name: "analyzer",
      state: "Pending",
    }, {
      name: "workload-profiler",
      state: "Pending",
    }],
    slo: {
      metric: "moking size",
      type: "latency",
      summary: "35p",
      value: 500,
      unit: "ms",
    },
    state: "Registered",
  },
];

export const fakeIncidents = {
  "59f1a327a1619a473de6c5ae": [
    {
      id: 1,
      type: "SLO_violation",
      timestamp: new Date(),
    },
  ],
  "59f1a327a1619a473de6c5b0": [
    {
      id: 1,
      type: "SLO_violation",
      timestamp: new Date(),
    },
  ],
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
