import { ADD_ALL, TOGGLE_SELECTED } from "../constants";
import mongoDBLogo from "assets/images/asset_mongoDB_logo.svg";
import kafkaLogo from "assets/images/asset_kafka_logo.svg";
import redisLogo from "assets/images/asset_redis_logo.svg";
import mysqlLogo from "assets/images/asset_mysql_logo.svg";
import nginxLogo from "assets/images/asset_nginx_logo.svg";

//set default values
const initialState = {
  apps: [
    {
      "appId": "59306145e3fd9e5094db04e5",
      "appName": "Kafka",
    },
    {
      "appId": "59671042e3fd9e5094df9812",
      "appName": "mongoDB",
    },
    {
      "appId": "59633e42e3fd9e5094dec25e",
      "appName": "Redis",
    },
    {
      "appId": "5970eda9ee7da9040499ddaf",
      "appName": "MySQL"
    },
    {
      "appId": "5988990dafdabc92347fddf9",
      "appName": "Nginx"
    }
  ],
  selectedApps: [],
  logoMap: {
    "mongodb": mongoDBLogo,
    "kafka": kafkaLogo,
    "redis": redisLogo,
    "mysql": mysqlLogo,
    "nginx": nginxLogo
  },
  version: "0.0.0.4"
};

export default function reducer(state = initialState, action) {
  //clone state first, avoid mutate original state
  let cloneState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case ADD_ALL:
      cloneState.selectedApps = [];
      for (let app of cloneState.apps) {
        cloneState.selectedApps.push(Object.assign({}, app));
      }
      return cloneState;

    case TOGGLE_SELECTED:
      //decide push or splice it
      let selected = true;
      for (let i = 0; i < cloneState.selectedApps.length; i++) {
        let app = cloneState.selectedApps[i];
        if (app.appId === action.selectedApp.appId) {
          cloneState.selectedApps.splice(i, 1);
          selected = false;
          break;
        }
      }
      //If it is not exist in the selectedApps, push it into selected array
      if (selected) {
        cloneState.selectedApps.push(action.selectedApp);
      }
      return cloneState;

    case 'persist/REHYDRATE':
      if (!!action.payload && !!action.payload.version &&
        action.payload.version === "0.0.0.4") {
        return Object.assign({}, action.payload);
      }

    default:
      return state
  }
}
