import { ADD_ALL, TOGGLE_SELECTED } from "../constants";
import mongoDBLogo from "assets/images/asset_mongoDB_logo.svg";
import kafkaLogo from "assets/images/asset_kafka_logo.svg";
import redisLogo from "assets/images/asset_redis_logo.svg";

//set default values
const initialState = {
  apps: [{
      "appId": "59306145e3fd9e5094db04e5",
      "appName": "Kafka",
      "sloType": "throughput",
      "sloValue": 57085,
      "budget": 380,
      "sizingRuns": [{
          "run": 1,
          "samples": 3,
          "results": [{
              "nodetype": "c3.4xlarge",
              "status": "done",
              "qosValue": 480000.0,
              "cost": 420.48,
              "perfOverCost": 1141.553
            },
            {
              "nodetype": "m3.large",
              "status": "done",
              "qosValue": 60000.0,
              "cost": 68.40,
              "perfOverCost": 877.193
            },
            {
              "nodetype": "r4.xlarge",
              "status": "done",
              "qosValue": 120000.0,
              "cost": 120.96,
              "perfOverCost": 992.063
            }
          ]
        },
        {
          "run": 2,
          "samples": 2,
          "results": [{
              "nodetype": "p2.16xlarge",
              "status": "done",
              "qosValue": 1920000.0,
              "cost": 7076.16,
              "perfOverCost": 271.334
            },
            {
              "nodetype": "c4.4xlarge",
              "status": "done",
              "qosValue": 480000.0,
              "cost": 362.88,
              "perfOverCost": 1322.751
            }
          ]
        }
      ],
      "status": "complete",
      "recommendations": [{
          "nodetype": "c4.4xlarge",
          "objective": "MaxPerfOverCost",
          "performance": 680,
          "cost": 250
        },
        {
          "nodetype": "m3.large",
          "objective": "MinCostWithPerfLimit",
          "performance": 270,
          "cost": 60.25
        },
        {
          "nodetype": "r4.xlarge",
          "objective": "MaxPerfWithCostLimit",
          "performance": 600,
          "cost": 230.78
        }
      ]
    },
    {
      "appId": "59671042e3fd9e5094df9812",
      "appName": "mongoDB",
      "budget": 450,
      "sizingRuns": [{
          "run": 1,
          "samples": 2,
          "results": [{
              "nodetype": "c3.4xlarge",
              "status": "done",
              "qosValue": 480000.0,
              "cost": 410.48,
              "perfOverCost": 900.99
            },
            {
              "nodetype": "m3.large",
              "status": "done",
              "qosValue": 60000.0,
              "cost": 70.40,
              "perfOverCost": 810.19
            },
            {
              "nodetype": "r4.xlarge",
              "status": "done",
              "qosValue": 120000.0,
              "cost": 110.6,
              "perfOverCost": 780.063
            }
          ]
        }
      ],
      "status": "complete",
      "recommendations": [{
          "nodetype": "c4.3xlarge",
          "objective": "MaxPerfOverCost",
          "performance": 450,
          "cost": 230
        },
        {
          "nodetype": "m3.large",
          "objective": "MinCostWithPerfLimit",
          "performance": 200,
          "cost": 50.3
        },
        {
          "nodetype": "r4.xlarge",
          "objective": "MaxPerfWithCostLimit",
          "performance": 400,
          "cost": 180.32
        }
      ]
    },
    {
      "appId": "59633e42e3fd9e5094dec25e",
      "appName": "Redis",
      "budget": 300,
      "sizingRuns": [{
          "run": 1,
          "samples": 1,
          "results": [{
              "nodetype": "c3.4xlarge",
              "status": "done",
              "qosValue": 480000.0,
              "cost": 425.48,
              "perfOverCost": 940.553
            },
            {
              "nodetype": "m3.large",
              "status": "done",
              "qosValue": 60000.0,
              "cost": 69.40,
              "perfOverCost": 870.193
            }
          ]
        },
        {
          "run": 2,
          "samples": 3,
          "results": [{
              "nodetype": "p2.16xlarge",
              "status": "done",
              "qosValue": 1920000.0,
              "cost": 7999.16,
              "perfOverCost": 1271.334
            },
            {
              "nodetype": "c4.4xlarge",
              "status": "done",
              "qosValue": 480000.0,
              "cost": 500.88,
              "perfOverCost": 1100.751
            },
            {
              "nodetype": "c4.2xlarge",
              "status": "done",
              "qosValue": 480000.0,
              "cost": 489.88,
              "perfOverCost": 987.751
            }
          ]
        }
      ],
      "status": "complete",
      "recommendations": [{
          "nodetype": "c4.4xlarge",
          "objective": "MaxPerfOverCost",
          "performance": 290,
          "cost": 245
        },
        {
          "nodetype": "m3.large",
          "objective": "MinCostWithPerfLimit",
          "performance": 180,
          "cost": 58.23
        },
        {
          "nodetype": "r4.xlarge",
          "objective": "MaxPerfWithCostLimit",
          "performance": 270,
          "cost": 190
        }
      ]
    },
    {
      "appId": "5970eda9ee7da9040499ddaf",
      "appName": "MySQL"
    },
    {
      "appId": "5988990dafdabc92347fddf9",
      "appName": "Nginx"
    },
  ],
  selectedApps: [],
  current_appId: null,
  logoMap: {
    "mongodb": mongoDBLogo,
    "kafka": kafkaLogo,
    "redis": redisLogo
  },
  version: "0.0.0.3"
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
        action.payload.version === "0.0.0.3") {
        return Object.assign({}, action.payload);
      }

    default:
      return state
  }
}
