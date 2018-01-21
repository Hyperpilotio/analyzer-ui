import React from "react";
import { VictoryArea } from "victory-chart";
import _ from "lodash";
import TopRightLegend from "./TopRightLegend";
import ThresholdLine from "./ThresholdLine";
import GeneralTimeSeriesGraph from "./GeneralTimeSeriesGraph";
import withInfluxData from "../lib/withInfluxData";


const SLOGraph = ({ slo, influxData, ...props }) => {
  const data = influxData.value;
  let dataArea = null;
  if (!_.isNull(data)) {
    dataArea = (
      <VictoryArea
        style={{ data: {
          stroke: "#5677fa",
          strokeWidth: "1.5px",
          fill: "rgba(86, 119, 250, 0.08)",
        } }}
        data={data.values.map(([date, value]) => ({ x: date, y: value }))}
        name={data.name}
        isData
      />
    );
  }

  return (
    <GeneralTimeSeriesGraph yLabel={`${slo.metric.type} (${slo.threshold.unit})`} {...props}>
      <TopRightLegend data={[{ name: slo.metric.name, symbol: { fill: "#5677fa" } }]} />
      { dataArea }
      <ThresholdLine
        area
        style={{
          line: { stroke: "#ff8686", strokeDasharray: "5,5", strokeWidth: "2px" },
          label: { fill: "#ff8686", fontSize: "16px" },
          area: { fill: "#ff8686", fillOpacity: 0.1 },
        }}
        threshold={_.toNumber(slo.threshold.value)}
        type={slo.threshold.type}
        label="SLO"
      />
    </GeneralTimeSeriesGraph>
  );
};

export default withInfluxData(({ slo, timeRange, refreshInterval }) => ({
  db: "snap",
  metric: slo.metric.name,
  tags: slo.metric.tags,
  timeRange,
  refreshInterval,
}))(SLOGraph);
