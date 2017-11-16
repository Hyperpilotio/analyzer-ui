import React from "react";
import { VictoryArea } from "victory-chart";
import moment from "moment";
import { connect as connectRefetch } from "react-refetch";
import TopRightLegend from "./TopRightLegend";
import ThresholdLine from "./ThresholdLine";
import GeneralTimeSeriesGraph from "./GeneralTimeSeriesGraph";

const SingleResourceGraph = ({ eventDoc, influxFetch }) => {
  if (influxFetch.pending) {
    return null;
  }
  const data = influxFetch.value;

  return (
    <GeneralTimeSeriesGraph yLabel="">
      <TopRightLegend data={[{ name: eventDoc.metric_name, symbol: { fill: "#b8e986" } }]} />
      <VictoryArea
        style={{ data: { stroke: "#b8e986", strokeWidth: "1.5px", fill: "rgba(184, 233, 134, 0.19)" } }}
        data={data.values.map(([date, value]) => ({ x: new Date(date), y: value }))}
        name={eventDoc.metric_name}
        isData
      />
      <ThresholdLine
        style={{
          line: { stroke: "#ff8686", strokeDasharray: "5,5", strokeWidth: "2px" },
          label: { fill: "#ff8686", fontSize: "16px" },
        }}
        threshold={eventDoc.threshold.value}
        label={eventDoc.threshold.type === "LB" ? "Lower\nBound" : "Upper\nBound"}
      />
    </GeneralTimeSeriesGraph>
  );
};

export default connectRefetch(() => ({
  influxFetch: { url: "/api/placeholder/influx-data", refreshInterval: 5 * 1000 },
}))(SingleResourceGraph);
