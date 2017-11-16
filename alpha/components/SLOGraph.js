import React from "react";
import { VictoryArea } from "victory-chart";
import moment from "moment";
import { connect as connectRefetch } from "react-refetch";
import TopRightLegend from "./TopRightLegend";
import ThresholdLine from "./ThresholdLine";
import GeneralTimeSeriesGraph from "./GeneralTimeSeriesGraph";

const SLOGraph = ({ app, influxFetch }) => {
  if (influxFetch.pending) {
    return null;
  }
  const data = influxFetch.value;

  return (
    <GeneralTimeSeriesGraph yLabel={`${app.slo.type} (${app.slo.unit})`}>
      <TopRightLegend data={[{ name: app.slo.metric, symbol: { fill: "#5677fa" } }]} />
      <VictoryArea
        style={{ data: { stroke: "#5677fa", strokeWidth: "1.5px", fill: "rgba(86, 119, 250, 0.08)" } }}
        data={data.values.map(([date, value]) => ({ x: new Date(date), y: value }))}
        name={data.name}
        isData
      />
      <ThresholdLine
        style={{
          line: { stroke: "#ff8686", strokeDasharray: "5,5", strokeWidth: "2px" },
          label: { fill: "#ff8686", fontSize: "16px" },
        }}
        threshold={app.slo.value}
        label="SLO"
      />
    </GeneralTimeSeriesGraph>
  );
};

export default connectRefetch(() => ({
  influxFetch: { url: "/api/placeholder/influx-data", refreshInterval: 5 * 1000 },
}))(SLOGraph);
