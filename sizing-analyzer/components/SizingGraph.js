import React from "react";
import { VictoryArea, VictoryLine } from "victory-chart";
import _ from "lodash";
// import TopRightLegend from "./TopRightLegend";
// import ThresholdLine from "./ThresholdLine";
import GeneralTimeSeriesGraph from "./GeneralTimeSeriesGraph";
import withInfluxData from "../lib/withInfluxData";
import * as HPPropTypes from "../constants/propTypes";
import { limitData } from "../constants/tempData";

const data = {
  values: [
    { x: new Date(2000, 1, 1), y: 12 },
    { x: new Date(2000, 6, 1), y: 10 },
    { x: new Date(2000, 12, 1), y: 11 },
    { x: new Date(2001, 1, 1), y: 5 },
    { x: new Date(2002, 1, 1), y: 4 },
    { x: new Date(2003, 1, 1), y: 6 },
    { x: new Date(2004, 1, 1), y: 5 },
    { x: new Date(2005, 1, 1), y: 7 },
    { x: new Date(2006, 1, 1), y: 8 },
    { x: new Date(2008, 1, 1, 11, 33, 30, 0), y: 9 },
    { x: new Date(2008, 3, 1, 11, 33, 30, 0), y: 3.5 },
    { x: new Date(2008, 3, 1, 11, 33, 30, 0), y: 2.5 },
    { x: new Date(2008, 3, 1, 11, 33, 30, 0), y: 7.5 },
    { x: new Date(2008, 4, 1, 11, 33, 30, 0), y: 4.5 },
    { x: new Date(2008, 4, 13, 11, 33, 30, 0), y: 8.5 },
    { x: new Date(2008, 5, 1, 11, 33, 30, 0), y: 7.5 },
    { x: new Date(2008, 5, 1, 11, 33, 30, 0), y: 10.5 },
    { x: new Date(2008, 6, 1, 11, 33, 30, 0), y: 3.5 },
    { x: new Date(2008, 7, 1, 11, 33, 30, 0), y: 1.5 },
    { x: new Date(2009, 1, 1), y: 9 },
    { x: new Date(2010, 1, 1), y: 5 },
    { x: new Date(2013, 1, 1), y: 6 },
    { x: new Date(2014, 1, 1), y: 2 },
    { x: new Date(2015, 1, 1), y: 5 },
  ],
};




const SizingGraph = ({ slo, influxData, ...props }) => {
  // const data = influxData.value;
  let dataArea = null;
  let suggestedLimit = null;
  let suggestedRequest = null;
  let currentLimit = null;
  let currentRequest = null;

  if (!_.isEmpty(data)) {
    dataArea = (
      <VictoryLine
        style={{ data: {
          stroke: "#5677fa",
          strokeWidth: "1.5px",
        } }}
        data={data.values}
        isData
      />
    );

    suggestedLimit = (
      <VictoryLine
        style={{ data: {
          stroke: "#8cb1fa",
          strokeWidth: "1.5px",
        } }}
        interpolation="stepAfter"
        data={limitData.suggestedLimit}
        isData
      />
    );

    suggestedRequest = (
      <VictoryLine
        style={{ data: {
          stroke: "#5677fa",
          strokeWidth: "1.5px",
        } }}
        interpolation="stepAfter"
        data={limitData.suggestedRequest}
        isData
      />
    );

    currentLimit = (
      <VictoryLine
        style={{ data: {
          stroke: "#ff8686",
          strokeWidth: "1.5px",
        } }}
        interpolation="stepAfter"
        data={limitData.currentLimit}
        isData
      />
    );

    currentRequest = (
      <VictoryLine
        style={{ data: {
          stroke: "#f5a623",
          strokeWidth: "1.5px",
        } }}
        interpolation="stepAfter"
        data={limitData.currentRequest}
        isData
      />
    );
  }

  return (
    <GeneralTimeSeriesGraph yLabel={`${slo.metric.type} (${slo.threshold.unit})`} {...props}>
      <g stroke="#3778fa" fill="white">
        <rect x="20" y="-50" width="1290" height="300" transform="translate(30,100)" />
      </g>
      { suggestedLimit }
      { suggestedRequest }
      { currentLimit }
      { currentRequest }
      { dataArea }
    </GeneralTimeSeriesGraph>
  );
};

SizingGraph.propTypes = {
  // slo: HPPropTypes.slo.isRequired,
  // influxData: HPPropTypes.refetch.isRequired,
};

export default withInfluxData(({ slo, timeRange, refreshInterval }) => ({
  db: "snap",
  metric: slo.metric.name,
  tags: slo.metric.tags,
  timeRange,
  refreshInterval,
}))(SizingGraph);
