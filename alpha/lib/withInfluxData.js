import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect as connectRefetch, PromiseState } from "react-refetch";


const withInfluxData = propsToQuery => (WrappedComponent) => {
  @connectRefetch((props) => {
    const { db, metric, tags, timeRange, refreshInterval = 5 * 1000 } = propsToQuery(props);
    const createFetch = (start, end, options) => ({
      url: "/api/influx-data",
      method: "POST",
      body: JSON.stringify({ db, metric, tags, start, end }),
      ...options,
    });
    let influxFetch;
    if (_.isEmpty(timeRange)) {
      influxFetch = createFetch("now() - 10m", "now()", { refreshInterval });
    } else if (_.every(timeRange, _.isNumber)) {
      // If both elements of timeRange are numbers, then user is zooming into a specific range,
      // which we don't and shouldn't refresh it for every certain interval
      influxFetch = createFetch(...timeRange.map(t => `${t}ms`), {});
    } else {
      influxFetch = createFetch(...timeRange, { refreshInterval });
    }
    const wrappedProps = {
      influxFetch,
      influxFetchMeta: { value: { db, metric, tags, timeRange } },
    };
    // The parent component can pass a customized withTimeRange function to achieve things like
    // syncing multiple charts' domains, see containers/IncidentDiagnosis.js
    if (_.isEmpty(props.withTimeRange)) {
      wrappedProps.withTimeRange = ([newStart, newEnd]) => ({
        influxFetch: createFetch(
          _.isNumber(newStart) ? `${newStart}ms` : newStart,
          _.isNumber(newEnd) ? `${newEnd}ms` : newEnd,
          // If the numbers of the range are not pure numbers, refresh it for every certain interval
          _.every([newStart, newEnd], _.isNumber) ?
            { force: true } :
            { refreshInterval, force: true },
        ),
        influxFetchMeta: {
          // Pass the influx query building blocks as a static value
          value: { db, metric, tags, timeRange },
          force: true,
        },
      });
    }
    return wrappedProps;
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
        } else if (nextProps.influxFetch.fulfilled) {
          const data = nextProps.influxFetch.value;
          if (!_.isNull(data)) {
            // Filter null values, but leave the leading and trailing nulls to ensure the chart
            // domain is the same
            const notNull = _.negate(_.matches({ 1: null }));
            const firstNotNullIndex = _.findIndex(data.values, notNull);
            const lastNotNullIndex = _.findLastIndex(data.values, notNull);
            data.values = _.concat(
              data.values.slice(0, firstNotNullIndex),
              data.values.slice(firstNotNullIndex, lastNotNullIndex + 1).filter(notNull),
              data.values.slice(lastNotNullIndex + 1),
            );
          }
          this.setState({
            // Copy the next influxFetch with value field replaced
            influxData: _.assign(PromiseState.create(), nextProps.influxFetch, { value: data }),
          });
        }
      } else if (nextProps.influxFetch.pending) {
        this.setState({
          influxData: _.assign(
            PromiseState.create(nextProps.influxFetch.meta),
            { value: { name: nextProps.influxFetchMeta.value.metric, values: [] } },
          ),
        });
      } else {
        this.setState({ influxData: nextProps.influxFetch });
      }
    }

    render() {
      const { timeRange } = this.props.influxFetchMeta.value;
      return (
        <WrappedComponent
          autoRefreshing={_.isUndefined(timeRange) || !_.every(timeRange, _.isNumber)}
          {..._.omit(this.props, ["influxFetch", "influxFetchMeta"])}
          {...this.state}
        />
      );
    }
  }

  return class extends WithInfluxData {
    // Override to make sure it doesn't reinvoke propsToRequestsToProps
    // again when the queries are identical
    componentWillReceiveProps(nextProps, nextContext) {
      if (!_.isEqual(this.props, nextProps)) {
        super.componentWillReceiveProps(nextProps, nextContext);
      }
    }
  };
};

export default withInfluxData;
