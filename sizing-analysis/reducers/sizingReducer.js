import { ADD_ALL, TOGGLE_SELECTED } from "../constants";
//set default values
const initialState = 
  [{
    apps: [{
      "appId": "59306145e3fd9e5094db04e5",
      "appName": "Kafka",
      "sloType": "throughput",
      "sloValue": 57085,
      "budget": 300,
      "sizingRuns": [
        {
          "run": 1,
          "samples": 3,
          "results": [
            {
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
          "results": [
            {
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
      "recommendations": [
        {
          "nodetype": "c4.4xlarge",
          "objective": "MaxPerfOverCost"
        },
        {
          "nodetype": "m3.large",
          "objective": "MinCostWithPerfLimit"
        },
        {
          "nodetype": "r4.xlarge",
          "objective": "MaxPerfWithCostLimit"
        }
      ]
    },
    { appId: "59671042e3fd9e5094df9812", appName: "mongoDB" },
    { appId: "59633e42e3fd9e5094dec25e", appName: "Redis" },
    { appId: "5970eda9ee7da9040499ddaf", appName: "MySQL" },
    { appId: "5988990dafdabc92347fddf9", appName: "Nginx" },],
    selected_apps:[]
  }
]

export default function reducer(state = initialState, action) {
  //clone state first, avoid mutate original state
  let cloneState = Object.assign({}, state);
  
  switch (action.type) {
    case ADD_ALL:
      cloneState[0].selected_apps = [];
      for(let app of cloneState[0].apps){
        cloneState[0].selected_apps.push(Object.assign({}, app));
      }
      return cloneState;

    case TOGGLE_SELECTED:
      //decide push or splice it
      let selected = true;
      for(let i = 0; i <  cloneState[0].selected_apps.length; i++){
        let app = cloneState[0].selected_apps[i];
        if(app.appId === action.selected_app.appId){
          cloneState[0].selected_apps.splice(i, 1);
          selected = false;
          break;  
        }
      }
      //If it is not exist in the selected_apps, push it into selected array
      if(selected){
           cloneState[0].selected_apps.push(action.selected_app);       
      }
      return cloneState;
    case 'persist/REHYDRATE':
        return Object.assign({}, action.payload.reducer);

    default:
      return state
  }
}
