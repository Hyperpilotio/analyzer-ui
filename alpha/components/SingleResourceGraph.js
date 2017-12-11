import React from "react";
import _ from "lodash";
import { VictoryArea } from "victory-chart";
import { connect as connectRefetch } from "react-refetch";
import TopRightLegend from "./TopRightLegend";
import ThresholdLine from "./ThresholdLine";
import GeneralTimeSeriesGraph from "./GeneralTimeSeriesGraph";

const SingleResourceGraph = ({ problem, influxFetch }) => {
  if (influxFetch.pending) {
    return null;
  }
  const data = influxFetch.value;

  return (
    <GeneralTimeSeriesGraph yLabel="">
      <TopRightLegend data={[{ name: problem.metric.name, symbol: { fill: "#b8e986" } }]} />
      <VictoryArea
        style={{ data: { stroke: "#b8e986", strokeWidth: "1.5px", fill: "rgba(184, 233, 134, 0.19)" } }}
        data={data.values.map(([date, value]) => ({ x: new Date(date), y: value }))}
        name={problem.metric.name}
        isData
      />
      <ThresholdLine
        style={{
          line: { stroke: "#ff8686", strokeDasharray: "5,5", strokeWidth: "2px" },
          label: { fill: "#ff8686", fontSize: "16px" },
        }}
        threshold={problem.threshold.value}
        label={problem.threshold.type === "LB" ? "Lower\nBound" : "Upper\nBound"}
      />
    </GeneralTimeSeriesGraph>
  );
};

export default connectRefetch(({ problem, timeRange }) => ({
  influxFetch: {
    url: "/api/influx-data",
    method: "POST",
    body: JSON.stringify({
      db: "derivedmetrics",
      metric: problem.metric.name,
      tags: [
        { key: "resource_type", value: problem.metric.type },
        ..._.map(problem.labels, (value, key) => ({ key, value })),
      ],
      start: timeRange[0],
      end: timeRange[1],
    }),
  },
}))(SingleResourceGraph);
