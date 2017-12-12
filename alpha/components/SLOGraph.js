import React from "react";
import { VictoryArea } from "victory-chart";
import { connect as connectRefetch } from "react-refetch";
import TopRightLegend from "./TopRightLegend";
import ThresholdLine from "./ThresholdLine";
import GeneralTimeSeriesGraph from "./GeneralTimeSeriesGraph";

const SLOGraph = ({ incident: { metric, threshold }, influxFetch }) => {
  if (influxFetch.pending) {
    return null;
  }
  const data = influxFetch.value;

  return (
    <GeneralTimeSeriesGraph yLabel={`${metric.type} (${threshold.unit})`}>
      <TopRightLegend data={[{ name: metric.name, symbol: { fill: "#5677fa" } }]} />
      <VictoryArea
        style={{ data: {
          stroke: "#5677fa",
          strokeWidth: "1.5px",
          fill: "rgba(86, 119, 250, 0.08)",
        } }}
        data={data.values.map(([date, value]) => ({ x: new Date(date), y: value }))}
        name={data.name}
        isData
      />
      <ThresholdLine
        style={{
          line: { stroke: "#ff8686", strokeDasharray: "5,5", strokeWidth: "2px" },
          label: { fill: "#ff8686", fontSize: "16px" },
        }}
        threshold={threshold.value}
        label="SLO"
      />
    </GeneralTimeSeriesGraph>
  );
};

export default connectRefetch(({ incident }) => ({
  influxFetch: {
    url: "/api/influx-data",
    method: "POST",
    body: JSON.stringify({
      db: "snap",
      metric: incident.metric.name,
      tags: incident.metric.tags,
      start: incident.timestamp - 5 * 60 * 1000 ** 3,
      end: incident.timestamp,
    }),
  },
}))(SLOGraph);
