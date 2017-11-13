import React from "react";
import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryAxis,
} from "victory-chart";
import {
  VictoryLabel,
  VictoryLegend,
  VictoryTooltip,
} from "victory-core";
import moment from "moment";
import _ from "lodash";
import { scaleTime } from "d3-scale";
import { connect as connectRefetch } from "react-refetch";
import _s from "./style.scss";

const data = {"name":"hyperpilot/billing_service/request_latency_milliseconds","columns":["time","value"],"values":[["2017-11-08T10:42:37.843Z",272.2912922144449],["2017-11-08T10:41:37.843Z",176.08477639445397],["2017-11-08T10:40:37.843Z",31.68259513482541],["2017-11-08T10:39:37.843Z",916.9879627085793],["2017-11-08T10:38:37.844Z",838.5784570675312],["2017-11-08T10:37:37.844Z",387.2521581307542],["2017-11-08T10:36:37.844Z",442.6990845644123],["2017-11-08T10:35:37.844Z",950.8382323296416],["2017-11-08T10:34:37.844Z",150.7027605123401],["2017-11-08T10:33:37.844Z",390.52786829957563],["2017-11-08T10:32:37.844Z",552.6220415930657],["2017-11-08T10:31:37.844Z",780.2610829366052],["2017-11-08T10:30:37.844Z",552.2034987159133],["2017-11-08T10:29:37.844Z",908.0041786887674],["2017-11-08T10:28:37.844Z",321.41744724656473],["2017-11-08T10:27:37.844Z",509.40348699935623],["2017-11-08T10:26:37.844Z",38.316029066309376],["2017-11-08T10:25:37.844Z",94.48591408869311],["2017-11-08T10:24:37.844Z",683.5911408823172],["2017-11-08T10:23:37.844Z",146.24864564452022],["2017-11-08T10:22:37.844Z",307.880858277459],["2017-11-08T10:21:37.844Z",92.22029627840445],["2017-11-08T10:20:37.844Z",82.07627112096372],["2017-11-08T10:19:37.845Z",429.63442931108807],["2017-11-08T10:18:37.845Z",377.6902079020334],["2017-11-08T10:17:37.845Z",483.4042136902339],["2017-11-08T10:16:37.845Z",63.26008820904461],["2017-11-08T10:15:37.845Z",755.0774215736025],["2017-11-08T10:14:37.845Z",874.7558555824621],["2017-11-08T10:13:37.845Z",424.47506627025166],["2017-11-08T10:12:37.845Z",863.665914969215],["2017-11-08T10:11:37.845Z",470.2986440374042],["2017-11-08T10:10:37.845Z",849.4129479497703],["2017-11-08T10:09:37.845Z",600.32534204937],["2017-11-08T10:08:37.845Z",384.2931254992128],["2017-11-08T10:07:37.845Z",542.6525764464238],["2017-11-08T10:06:37.845Z",158.58483345527708],["2017-11-08T10:05:37.845Z",77.13406893283681],["2017-11-08T10:04:37.845Z",851.2052324441665],["2017-11-08T10:03:37.845Z",691.2511666356604],["2017-11-08T10:02:37.845Z",212.66002819139462],["2017-11-08T10:01:37.845Z",863.8591259957904],["2017-11-08T10:00:37.845Z",806.0028642567025],["2017-11-08T09:59:37.845Z",47.58957298984656],["2017-11-08T09:58:37.845Z",26.006245788172233],["2017-11-08T09:57:37.845Z",460.6518260226622],["2017-11-08T09:56:37.845Z",619.2393502538409],["2017-11-08T09:55:37.845Z",833.4407274214601],["2017-11-08T09:54:37.845Z",304.39769755359646],["2017-11-08T09:53:37.845Z",961.094078762663],["2017-11-08T09:52:37.845Z",733.7305586827827],["2017-11-08T09:51:37.845Z",488.84912859982757],["2017-11-08T09:50:37.845Z",260.23334318600024],["2017-11-08T09:49:37.845Z",218.07415023312493],["2017-11-08T09:48:37.845Z",482.7075618434593],["2017-11-08T09:47:37.845Z",267.3444729913881],["2017-11-08T09:46:37.845Z",371.5487518160394],["2017-11-08T09:45:37.845Z",818.5698118118128],["2017-11-08T09:44:37.845Z",553.2040634855972],["2017-11-08T09:43:37.845Z",37.749970009722134],["2017-11-08T09:42:37.845Z",537.0676578198488],["2017-11-08T09:41:37.845Z",350.72663077346],["2017-11-08T09:40:37.845Z",887.5234544930435],["2017-11-08T09:39:37.845Z",690.3678394183137],["2017-11-08T09:38:37.845Z",261.5923566518099],["2017-11-08T09:37:37.845Z",957.0558848919544],["2017-11-08T09:36:37.845Z",303.3203608386894],["2017-11-08T09:35:37.845Z",909.9835816185913],["2017-11-08T09:34:37.845Z",850.0188891537106],["2017-11-08T09:33:37.845Z",216.5750435516838],["2017-11-08T09:32:37.845Z",85.40328719593137],["2017-11-08T09:31:37.845Z",318.30067144619],["2017-11-08T09:30:37.845Z",68.22585009548732],["2017-11-08T09:29:37.845Z",349.8485869514163],["2017-11-08T09:28:37.845Z",766.2937140408694],["2017-11-08T09:27:37.845Z",205.92763659756486],["2017-11-08T09:26:37.845Z",131.24429563132622],["2017-11-08T09:25:37.845Z",426.28997720413884],["2017-11-08T09:24:37.845Z",637.4745870791489],["2017-11-08T09:23:37.845Z",205.6245788999267],["2017-11-08T09:22:37.845Z",234.3098846412559],["2017-11-08T09:21:37.845Z",300.71570280490124],["2017-11-08T09:20:37.845Z",297.5206619755373],["2017-11-08T09:19:37.845Z",809.7935676923364],["2017-11-08T09:18:37.845Z",327.9218434599405],["2017-11-08T09:17:37.845Z",247.64009803497666],["2017-11-08T09:16:37.845Z",419.66289319227326],["2017-11-08T09:15:37.845Z",467.3938558938604],["2017-11-08T09:14:37.845Z",350.6586190191461],["2017-11-08T09:13:37.845Z",173.59951718627786],["2017-11-08T09:12:37.845Z",183.3184572639388],["2017-11-08T09:11:37.845Z",482.597652303804],["2017-11-08T09:10:37.845Z",142.3900382238803],["2017-11-08T09:09:37.845Z",818.9825822664643],["2017-11-08T09:08:37.845Z",957.8854241155072],["2017-11-08T09:07:37.845Z",494.8209196339144],["2017-11-08T09:06:37.845Z",613.0063451379855],["2017-11-08T09:05:37.846Z",345.5970034799856],["2017-11-08T09:04:37.846Z",625.1073977330872],["2017-11-08T09:03:37.846Z",812.8632872932747],["2017-11-08T09:02:37.846Z",280.22466950922853],["2017-11-08T09:01:37.846Z",788.2718249309195],["2017-11-08T09:00:37.846Z",25.25359187425358],["2017-11-08T08:59:37.846Z",497.6176817788027],["2017-11-08T08:58:37.846Z",966.6873829428433],["2017-11-08T08:57:37.846Z",655.2706716441155],["2017-11-08T08:56:37.846Z",890.4943715889741],["2017-11-08T08:55:37.846Z",773.8569109202535],["2017-11-08T08:54:37.846Z",358.3642778642937],["2017-11-08T08:53:37.846Z",534.3248781499464],["2017-11-08T08:52:37.846Z",417.26228395278133],["2017-11-08T08:51:37.846Z",820.94960673525],["2017-11-08T08:50:37.846Z",881.643950445769],["2017-11-08T08:49:37.846Z",419.69458650534386],["2017-11-08T08:48:37.846Z",275.27240007366373],["2017-11-08T08:47:37.846Z",661.4116809982224],["2017-11-08T08:46:37.846Z",460.031313661736],["2017-11-08T08:45:37.846Z",693.3983621237217],["2017-11-08T08:44:37.846Z",451.9603520472706],["2017-11-08T08:43:37.846Z",349.7580694202598]]};

class SLOGraph extends React.Component {
  render() {
    if (this.props.influxFetch.pending) {
      return null;
    }
    const data = this.props.influxFetch.value;
    return (
      <VictoryChart width={1400} height={400} style={{ parent: { background: "#f7f9fc", border: "1px solid #e2e8fb", borderRadius: "4px" } }}>
        <VictoryLegend
          data={[
            { name: "hyperpilot/goddd/request_latency_milliseconds", symbol: { fill: "#5677fa" } }
          ]}
          style={{ labels: { fill: "#606175" } }}
          groupComponent={<g transform="translate(1000 -20)" />}
        />
        <VictoryAxis
          dependentAxis
          style={{
            axis: { stroke: "none" },
            grid: { stroke: "#eef0fa", transform: "translateX(1px)" },
            tickLabels: { fill: "#b9bacb" },
          }}
          tickFormat={y => y}
        />
        <VictoryArea
          style={{ data: { stroke: "#5677fa", strokeWidth: "1.5px", fill: "rgba(86, 119, 250, 0.08)" } }}
          data={ data.values.map(row => ({ x: new Date(row[0]), y: row[1] })) }
          labelComponent={<VictoryTooltip />}
        />
        <VictoryAxis
          tickFormat={t => moment(t).format("LTS")}
          scale={ scaleTime().domain([ new Date(data.values[0][0]), new Date(_.last(data.values)[0]) ]) }
          style={{
            axis: { stroke: "#b9bacb", strokeWidth: "2px" },
            tickLabels: { fill: "#b9bacb" },
          }}
          tickCount={10}
        />
        <VictoryLine
          style={{ data: { stroke: "#ff8686", strokeDasharray: "5,5" } }}
          data={[
            { x: new Date(data.values[0][0]), y: 500 },
            { x: new Date(data.values[data.values.length - 1][0]), y: 500 },
          ]}
        />
        <VictoryLabel text="latency (ms)" style={{ fill: "#606175", fontSize: "16px" }} x={15} y={30} />
        <VictoryLabel text="SLO" style={{ fill: "#ff8686", fontSize: "16px" }} x={1360} y={195} />
      </VictoryChart>
    )
  }
}

export default connectRefetch(props => ({
  influxFetch: { url: "/api/placeholder/influx-data", refreshInterval: 5 * 1000 },
}))(SLOGraph)
