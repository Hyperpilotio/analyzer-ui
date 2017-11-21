import React from "react";
import { VictoryLine } from "victory-chart";
import { connect as connectRefetch } from "react-refetch";
import TopRightLegend from "./TopRightLegend";
import GeneralTimeSeriesGraph from "./GeneralTimeSeriesGraph";

const InterferenceGraph = ({ influxFetch }) => {
  if (influxFetch.pending) {
    return null;
  }
  const data = influxFetch.value;
  data.values = data.values.map(row => [...row, Math.random() * 800]);

  return (
    <GeneralTimeSeriesGraph yLabel="metric/of/some/resource">
      <TopRightLegend
        data={[
          { name: "container_id=spark-worker-1", symbol: { fill: "#fdbd39" } },
          { name: "container_id=goddd-goddd", symbol: { fill: "#78c1fa" } },
        ]}
      />
      <VictoryLine
        style={{ data: { stroke: "#fdbd39", strokeWidth: "2px" } }}
        data={data.values.map(([date, value]) => ({ x: new Date(date), y: value }))}
        name={"container_id=spark-worker-1"}
        isData
      />
      <VictoryLine
        style={{ data: { stroke: "#78c1fa", strokeWidth: "2px" } }}
        data={data.values.map(([date, , value]) => ({ x: new Date(date), y: value }))}
        name={"container_id=goddd-goddd"}
        isData
      />
    </GeneralTimeSeriesGraph>
  );
};

export default connectRefetch(() => ({
  influxFetch: { url: "/api/placeholder/influx-data", refreshInterval: 5 * 1000 },
}))(InterferenceGraph);
