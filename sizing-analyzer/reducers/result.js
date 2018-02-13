import _ from "lodash";
import { SUCCESS } from "../constants/apiActions";
import * as types from "../actions/types";

const initialState = {
  currData: {
    object_type: "node",
    resource: "cpu",
    unit: "cores",
    end_time: 1517016459493000000,
    duration_days: 7,
    labels: ["node_pool"],
    results: [
      {
        label_values: {
          node_pool: "druid-preempt",
        },
        summary_stats: {
          cpu_usage: {
            mean: 0.32,
            fifty_p: 0.79,
            ninety_five_p: 1.93,
            ninety_nine_p: 2.5,
            max: 0.71,
          },

        },
        current_settings: {
          size: 16,
        },
        recommended_settings: {
          size: 4,
        },
      }, {
        label_values: {
          node_pool: "nginx",
        },
        summary_stats: {
          cpu_usage: {
            mean: 0.32,
            p90: 0.79,
            ninety_five_p: 1.93,
            ninety_nine_p: 2.5,
            max: 0.71,
          },
        },
        current_settings: {
          size: 8,
        },
        recommended_settings: {
          size: 1,
        },
      },
    ],
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
  default:
    return state;
  }
};
