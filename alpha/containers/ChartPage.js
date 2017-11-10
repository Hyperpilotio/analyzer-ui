import React from "react";
import { VictoryChart, VictoryArea, VictoryTheme } from "victory";
import _ from "lodash";

class ChartPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scatterData: this.getScatterData(),
    };
  }

  componentDidMount() {
    this.setStateInterval = window.setInterval(() => {
      this.setState({
        scatterData: this.getScatterData(),
      });
    }, 5000);
  }

  componentWillUnmount() {
    window.clearInterval(this.setStateInterval);
  }


  getScatterData = () => {
    const colors = [
      "violet", "cornflowerblue", "gold", "orange",
      "turquoise", "tomato", "greenyellow",
    ];
    const symbols = [
      "circle", "star", "square", "triangleUp",
      "triangleDown", "diamond", "plus",
    ];
    const data = _.range(25).map((index) => {
      const scaledIndex = Math.floor(index % 7);
      return {
        x: index,
        y: _.random(2, 100),
        fill: colors[_.random(0, 6)],
        opacity: 0.6,
      };
    });

    console.log("data", data);
    return data;
  }

  render() {
    return (
      <VictoryChart
        theme={VictoryTheme.material}
        animate={{ duration: 2000, easing: "bounce" }}
      >
        <VictoryArea
          style={{ data: { fill: "#c43a31" } }}
          data={this.state.scatterData}
        />
      </VictoryChart>
    );
  }
}

export default ChartPage;
