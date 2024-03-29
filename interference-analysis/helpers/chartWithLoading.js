import Spinner from "react-spinkit";
import React from "react";
import "./chartDefaults";

// chartWithLoading is a component composer
export default ChartComponent => (
  ({ data, loading }) => {
    return <div className="chart-container">
      { loading
        ? <Spinner fadeIn="quarter" name="ball-grid-pulse" />
        : <ChartComponent data={data} /> }
    </div>
  }
)
