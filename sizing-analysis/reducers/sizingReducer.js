import { ADD_ALL, TOGGLE_SELECTED } from "../constants";
import mongoDBLogo from "~/assets/images/asset_mongoDB_logo.svg";
import kafkaLogo from "~/assets/images/asset_kafka_logo.svg";
import redisLogo from "~/assets/images/asset_redis_logo.svg";
import mysqlLogo from "~/assets/images/asset_mysql_logo.svg";
import nginxLogo from "~/assets/images/asset_nginx_logo.svg";

//set default values
const initialState = {
  apps: [
    {
      name: "kafka",
      displayName: "Kafka",
      logo: kafkaLogo,
      selected: false
    },
    {
      name: "mongodb",
      displayName: "mongoDB",
      logo: mongoDBLogo,
      selected: false
    },
    {
      name: "redis",
      displayName: "Redis",
      logo: redisLogo,
      selected: false
    },
    {
      name: "mysql",
      displayName: "MySQL",
      logo: mysqlLogo,
      selected: false
    },
    {
      name: "nginx",
      displayName: "Nginx",
      logo: nginxLogo,
      selected: false
    }
  ],
  selectedApps: [],
  version: "0.0.0.4"
};

export default function reducer(state = initialState, action) {

  switch (action.type) {
    case ADD_ALL:
      return {
        ...state,
        apps: state.apps.map(app => ({
          ...app,
          selected: true
        }))
      };

    case TOGGLE_SELECTED:
      return {
        ...state,
        apps: state.apps.map(app => ({
          ...app,
          selected: app.name === action.appName ? !app.selected : app.selected
        }))
      };

    case 'persist/REHYDRATE':
      if (!!action.payload && !!action.payload.version &&
        action.payload.version === "0.0.0.4") {
        return Object.assign({}, action.payload);
      }

    default:
      return state
  }
}
