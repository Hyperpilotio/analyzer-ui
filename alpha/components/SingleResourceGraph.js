import React from "react";
import _ from "lodash";
import { format } from "d3-format";
import { VictoryArea } from "victory-chart";
import { connect as connectRefetch } from "react-refetch";
import TopRightLegend from "./TopRightLegend";
import ThresholdLine from "./ThresholdLine";
import GeneralTimeSeriesGraph from "./GeneralTimeSeriesGraph";

const f = format(".2f");

const SingleResourceGraph = ({ problem, metric, influxFetch, ...props }) => {
  if (influxFetch.pending) {
    return null;
  }
  const data = influxFetch.value;
  const stats = metric.analysis_result;

  return (
    <GeneralTimeSeriesGraph yLabel={`Correlation: ${f(stats.correlation)}, Severity: ${f(stats.severity)}, Score: ${f(stats.score)}\n \nThreshold: ${metric.threshold.value} ${metric.threshold.unit}`} {...props}>
      <TopRightLegend data={[{ name: metric.source, symbol: { fill: "#b8e986" } }]} />
      <VictoryArea
        style={{ data: { stroke: "#b8e986", strokeWidth: "1.5px", fill: "rgba(184, 233, 134, 0.19)" } }}
        data={data.values.map(([date, value]) => ({ x: new Date(date), y: value }))}
        name={metric.source}
        isData
      />
      {metric.threshold.value > _.max(_.map(data.values, 1)) ? null : (
        <ThresholdLine
          style={{
            line: { stroke: "#ff8686", strokeDasharray: "5,5", strokeWidth: "2px" },
            label: { fill: "#ff8686", fontSize: "16px" },
          }}
          threshold={metric.threshold.value}
          label={metric.threshold.type === "LB" ? "Lower\nBound" : "Upper\nBound"}
        />
      )}
    </GeneralTimeSeriesGraph>
  );
};

export default connectRefetch(({ problem, metric }) => ({
  influxFetch: {
    url: "/api/influx-data",
    method: "POST",
    body: JSON.stringify({
      db: "snapaverage",
      metric: metric.source,
      tags: _.filter([
        { key: "nodename", value: _.get(problem, "description.node_name") },
        { key: "io.kubernetes.pod.name", value: _.get(problem, "description.pod_name") },
      ], "value"),
      start: problem.timestamp - 5 * 60 * 1000 ** 3,
      end: problem.timestamp,
    }),
  },
}))(SingleResourceGraph);
