import React from "react";
import { VictoryArea } from "victory-chart";
import { connect as connectRefetch } from "react-refetch";
import _ from "lodash";
import TopRightLegend from "./TopRightLegend";
import ThresholdLine from "./ThresholdLine";
import GeneralTimeSeriesGraph from "./GeneralTimeSeriesGraph";


const SLOGraph = ({ slo, influxFetch, ...props }) => {
  let data = influxFetch.value;
  if (influxFetch.pending) {
    data = { name: slo.metric.name, values: [] };
  }
  let dataArea = null;
  if (!_.isNull(data)) {
    data.values = _.reject(data.values, { 1: null });
    dataArea = (
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

export default connectRefetch(({ slo, start, end, ...props }) => ({
  influxFetch: {
    url: "/api/influx-data",
    method: "POST",
    body: JSON.stringify({
      db: "snap",
      metric: slo.metric.name,
      tags: slo.metric.tags,
      start,
      end,
    }),
    ...props,
  },
}))(SLOGraph);
