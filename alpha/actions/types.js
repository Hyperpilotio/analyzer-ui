import _ from "lodash";

const SIMPLE = "SIMPLE";
const TRACKABLE = "TRACKABLE";
const SIMPLE_AND_TRACKABLE = "SIMPLE_AND_TRACKABLE";
exports.asyncActionTypes = { SIMPLE, TRACKABLE, SIMPLE_AND_TRACKABLE };

const asyncActions = [
  ["FETCH_APPS", SIMPLE_AND_TRACKABLE],
  ["FETCH_APP_LATEST_INCIDENT", TRACKABLE],
  ["FETCH_DIAGNOSIS", TRACKABLE],
  ["CREATE_APP", SIMPLE],
  ["UPDATE_APP", TRACKABLE],
  ["FETCH_AVAILABLE_SERVICES", SIMPLE],
  ["FETCH_METRICS", SIMPLE],
  ["UPDATE_MICROSERVICES", TRACKABLE],
  ["ACTIVATE_APP", TRACKABLE],
  ["REMOVE_APP", TRACKABLE],
  ["MANUAL_LOGIN", SIMPLE],
];
_.assign(exports,
  _.fromPairs(
    _.map(
      asyncActions,
      ([name]) => ([name, [`${name}_LOADING`, `${name}_SUCCESS`, `${name}_FAIL`]]),
    ),
  ),
);
exports.actionTypeRegistry = _.fromPairs(asyncActions);

const pureActions = [
  "UPDATE_REDUX_APPS",
  "EMPTY_METRIC_OPTIONS",
  "TOGGLE_MODAL",
  "OPEN_MODAL",
  "EMPTY_METRIC_OPTIONS",
  "SET_SLO_CONFIG_EDITABILITY",
  "RESET_LOADING_STATE",
  "SET_LOGIN",
];
_.assign(exports, _.zipObject(pureActions, pureActions));
