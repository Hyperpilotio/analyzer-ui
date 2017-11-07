export const getSLODisplay = slo => (
  `${slo.type} ${slo.type === "throughput" ? ">" : "<"} ${slo.value}${slo.unit}`
);
