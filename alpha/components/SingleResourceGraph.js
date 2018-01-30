import React from "react";
import _ from "lodash";
import { format } from "d3-format";
import { VictoryArea } from "victory-chart";
import TopRightLegend from "./TopRightLegend";
import ThresholdLine from "./ThresholdLine";
import GeneralTimeSeriesGraph from "./GeneralTimeSeriesGraph";
import { tsToMoment } from "../lib/utils";
import withInfluxData from "../lib/withInfluxData";

const f = format(".2f");


const SingleResourceGraph = ({ problem, metric, influxData, ...props }) => {
  const data = influxData.value;
  const stats = metric.analysis_result;

  return (
    <GeneralTimeSeriesGraph yLabel={`Correlation: ${f(stats.correlation)}, Severity: ${f(stats.severity)}, Score: ${f(stats.score)}\n \nThreshold: ${metric.threshold.value} ${metric.threshold.unit}`} {...props}>
      <TopRightLegend data={[{ name: metric.source, symbol: { fill: "#b8e986" } }]} />
      <VictoryArea
        style={{ data: { stroke: "#b8e986", strokeWidth: "1.5px", fill: "rgba(184, 233, 134, 0.19)" } }}
        data={data.values.map(([date, value]) => ({ x: date, y: value }))}
        name={metric.source}
        isData
      />
      {metric.threshold.value > _.max(_.map(data.values, 1)) ? null : (
        <ThresholdLine
          area
          style={{
            line: { stroke: "#ff8686", strokeDasharray: "5,5", strokeWidth: "2px" },
            label: { fill: "#ff8686", fontSize: "16px" },
            area: { fill: "#ff8686", fillOpacity: 0.1 },
          }}
          threshold={metric.threshold.value}
          type={metric.threshold.type}
          label={metric.threshold.type === "LB" ? "Lower\nBound" : "Upper\nBound"}
        />
      )}
    </GeneralTimeSeriesGraph>
  );
};

export default withInfluxData(({ problem, metric, timeRange }) => ({
  db: "snapaverage",
  metric: metric.source,
  tags: _.filter([
    { key: "nodename", value: _.get(problem, "description.node_name") },
    { key: "io.kubernetes.pod.name", value: _.get(problem, "description.pod_name") },
  ], "value"),
  timeRange: timeRange || [
    tsToMoment(problem.timestamp).subtract(5, "m").valueOf(),
    tsToMoment(problem.timestamp).add(5, "m").valueOf(),
  ],
}))(SingleResourceGraph);
