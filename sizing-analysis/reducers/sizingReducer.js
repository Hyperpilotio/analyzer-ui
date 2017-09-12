import PropTypes from "prop-types";
import mongoDBLogo from "~/assets/images/asset_mongoDB_logo.svg";
import kafkaLogo from "~/assets/images/asset_kafka_logo.svg";
import redisLogo from "~/assets/images/asset_redis_logo.svg";
import mysqlLogo from "~/assets/images/asset_mysql_logo.svg";
import nginxLogo from "~/assets/images/asset_nginx_logo.svg";
import { ADD_ALL, TOGGLE_SELECTED } from "../constants";


const initialState = {
  apps: [
    {
      name: "kafka",
      displayName: "Kafka",
      logo: kafkaLogo,
      selected: false,
    },
    {
      name: "mongodb",
      displayName: "mongoDB",
      logo: mongoDBLogo,
      selected: false,
    },
    {
      name: "redis",
      displayName: "Redis",
      logo: redisLogo,
      selected: false,
    },
    {
      name: "mysql",
      displayName: "MySQL",
      logo: mysqlLogo,
      selected: false,
    },
    {
      name: "nginx",
      displayName: "Nginx",
      logo: nginxLogo,
      selected: false,
    },
  ],
  selectedApps: [],
  version: "0.0.0.4",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case ADD_ALL:
    return {
      ...state,
      apps: state.apps.map(app => ({
        ...app,
        selected: true,
      })),
    };

  case TOGGLE_SELECTED:
    return {
      ...state,
      apps: state.apps.map(app => ({
        ...app,
        selected: app.name === action.appName ? !app.selected : app.selected,
      })),
    };

  case "persist/REHYDRATE":
    if (!!action.payload && !!action.payload.version &&
      action.payload.version === "0.0.0.4") {
      return { ...action.payload };
    }
    return state;

  default:
    return state;
  }
}

export const AnalyzerPropTypes = {
  app: PropTypes.shape({
    name: PropTypes.string,
    displayName: PropTypes.string,
    logo: PropTypes.string,
    selected: PropTypes.bool,
  }),

  sizingRun: PropTypes.shape({
    appName: PropTypes.string,
    status: PropTypes.string,
    budget: PropTypes.number,
    sloType: PropTypes.string,
    sloValue: PropTypes.number,
    sizingRuns: PropTypes.arrayOf(PropTypes.shape({
      run: PropTypes.number,
      samples: PropTypes.number,
      results: PropTypes.arrayOf(PropTypes.shape({
        nodetype: PropTypes.string,
        status: PropTypes.string,
        cost: PropTypes.number,
        qosValue: PropTypes.number,
        perfOverCost: PropTypes.number,
      })),
    })),
    recommendations: PropTypes.arrayOf(PropTypes.shape({
      nodetype: PropTypes.string,
      objective: PropTypes.string,
    })),
  }),

  instanceSpec: PropTypes.shape({
    name: PropTypes.string,
    cpu: PropTypes.string,
    memory: PropTypes.string,
    network: PropTypes.string,
    storage: PropTypes.string,
  }),
};
