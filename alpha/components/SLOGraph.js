import React from "react";
import {
  VictoryChart,
  VictoryArea,
  VictoryAxis,
} from "victory-chart";
import { VictoryLabel } from "victory-core";
import moment from "moment";
import _ from "lodash";
import { scaleTime } from "d3-scale";
import TopRightLegend from "./TopRightLegend";
import ThresholdLine from "./ThresholdLine";
import TimeSeriesTooltipContainer from "./TimeSeriesTooltipContainer";
import { connect as connectRefetch } from "react-refetch";


class SLOGraph extends React.Component {

  render() {
    if (this.props.influxFetch.pending) {
      return null;
    }
    const data = this.props.influxFetch.value;
    return (
      <VictoryChart
        width={1400}
        height={400}
        style={{
          parent: { background: "#f7f9fc", border: "1px solid #e2e8fb", borderRadius: "4px" }
        }}
        containerComponent={<TimeSeriesTooltipContainer />}
      >
        <TopRightLegend
          data={[ { name: data.name, symbol: { fill: "#5677fa" } } ]}
          style={{
            labels: { fill: "#606175", fontSize: 16 },
            border: { stroke: "#e2e8fb" }
          }}
          marginRight={50}
          marginTop={10}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "none" },
            grid: { stroke: "#eef0fa" },
            tickLabels: { fill: "#b9bacb" },
          }}
          tickFormat={y => y}
        />
        <VictoryArea
          style={{ data: { stroke: "#5677fa", strokeWidth: "1.5px", fill: "rgba(86, 119, 250, 0.08)" } }}
          data={ data.values.map(([date, value]) => ({ x: new Date(date), y: value })) }
          name={ data.name }
          isData
        />
        <VictoryAxis
          tickFormat={t => moment(t).format("LTS")}
          scale={ scaleTime().domain( [_.first, _.last].map(f => new Date(f(data.values)[0])) ) }
          style={{
            axis: { stroke: "#b9bacb", strokeWidth: "2px" },
            tickLabels: { fill: "#b9bacb" },
          }}
          tickCount={10}
        />
        <ThresholdLine
          style={{
            line: { stroke: "#ff8686", strokeDasharray: "5,5", strokeWidth: "2px" },
            label: { fill: "#ff8686", fontSize: "16px" }
          }}
          threshold={500}
          label="SLO"
        />
        <VictoryLabel text="latency (ms)" style={{ fill: "#606175", fontSize: "16px" }} x={15} y={30} />
      </VictoryChart>
    )
  }
}

export default connectRefetch(props => ({
  influxFetch: { url: "/api/placeholder/influx-data", refreshInterval: 5 * 1000 },
}))(SLOGraph)
