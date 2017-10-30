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
    type: "long-running",
    slo: {
      metric: "initial speed",
      type: "Rate",
      summary: "95p",
      value: 400,
      unit: "",
    },
    budget: {
      unit: "dollar",
      value: 300,
    },
    serviceNames: [
      "goddd",
      "pathfinder",
      "mongo",
    ],
    name: "goddd",
  },
  {
    _id: "59f1a327a1619a473de6c5b0",
    type: "long-running",
    slo: {
      metric: "running speed",
      type: "Latency",
      summary: "25p",
      value: 100,
      unit: "",
    },
    budget: {
      unit: "dollar",
      value: 300,
    },
    serviceNames: [
      "kafka-serve",
    ],
    name: "kafka",
  },
  {
    _id: "59f1a327a1619a473de6c5b2",
    type: "long-running",
    slo: {
      metric: "moking size",
      type: "Latency",
      summary: "35p",
      value: 900,
      unit: "",
    },
    serviceNames: [
      "lucene-serve",
    ],
    name: "lucene",
  },
];

export default initialSloState;
