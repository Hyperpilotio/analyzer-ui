import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect as connectRefetch, PromiseState } from "react-refetch";

const withInfluxData = propsToQuery => (WrappedComponent) => {
  @connectRefetch((props) => {
    const { db, metric, tags, timeRange, refreshInterval } = propsToQuery(props);
    const influxFetch = {
      url: "/api/influx-data",
      method: "POST",
      body: JSON.stringify({
        db,
        metric,
        tags,
        start: _.isEmpty(timeRange) ? "now() - 10m" : `${timeRange[0]}ms`,
        end: _.isEmpty(timeRange) ? "now()" : `${timeRange[1]}ms`,
      }),
    };
    if (_.isEmpty(timeRange)) {
      influxFetch.refreshInterval = refreshInterval || 5 * 1000;
    }
    return { influxFetch, influxFetchMeta: { value: { db, metric, tags, timeRange } } };
  })
  class WithInfluxData extends React.Component {
    static displayName = `withInfluxData(${WrappedComponent.displayName || WrappedComponent.name})`
    static propTypes = {
      influxFetch: PropTypes.instanceOf(PromiseState).isRequired,
      influxFetchMeta: PropTypes.instanceOf(PromiseState).isRequired,
    }

    constructor(props) {
      super(props);
      if (props.influxFetch.pending && _.isNull(props.influxFetch.value)) {
        this.state = {
          influxData: _.assign(
            PromiseState.create(props.influxFetch.meta),
            { value: { name: props.influxFetchMeta.value.metric, values: [] } },
          ),
        };
      } else {
        this.state = { influxData: props.influxFetch };
      }
    }

    componentWillReceiveProps(nextProps) {
      const currentQuery = this.props.influxFetchMeta.value;
      const nextQuery = nextProps.influxFetchMeta.value;
      // If the query regardless of time range is the same, then it's refreshing
      if (_.every(["db", "metric", "tags"], k => _.isEqual(currentQuery[k], nextQuery[k]))) {
        if (nextProps.influxFetch.pending) {
          this.setState({
            influxData: PromiseState.refresh(this.state.influxData, nextProps.influxFetch.meta),
          });
          return;
        } else if (nextProps.influxFetch.fulfilled) {
          const data = nextProps.influxFetch.value;
          if (!_.isNull(data)) {
            // Filter null values
            data.values = _.reject(data.values, { 1: null });
          }
          this.setState({
            // Copy the next influxFetch with value field replaced
            influxData: _.assign(PromiseState.create(), nextProps.influxFetch, { value: data }),
          });
          return;
        }
      }
      this.setState({ influxData: nextProps.influxFetch });
    }
    render() {
      return (
        <WrappedComponent
          {..._.omit(this.props, ["influxFetch", "influxFetchMeta"])}
          {...this.state}
        />
      );
    }
  }
  return WithInfluxData;
};

export default withInfluxData;
