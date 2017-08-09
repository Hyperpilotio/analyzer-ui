import { ADD_ALL, TOGGLE_SELECTED } from "../constants";
//set default values
const initialState = [
  {
    apps: [{id: "594c38f8e3fd9e5094dc312a",  name: "Kafka"},
           {id: "59671042e3fd9e5094df9812",  name: "mongoDB"},
           {id: "59633e42e3fd9e5094dec25e",  name: "Redis"},
           {id: "5970eda9ee7da9040499ddaf",  name: "MySQL"},
           {id: "5988990dafdabc92347fddf9",  name: "Nginx"}, ],
    selected_apps:[]
  }
]

export default function reducer(state = initialState, action) {
  //clone state first, avoid mutate original state
  let cloneState = Object.assign({}, state);
  
  switch (action.type) {
    case ADD_ALL:
      state[0].selected_apps = cloneState[0].apps;
      return Object.assign({}, state);

    case TOGGLE_SELECTED:
      //decide push or splice it
      let selected = true;
      for(let i = 0; i <  cloneState[0].selected_apps.length; i++){
        let app = cloneState[0].selected_apps[i];
        if(app.id === action.selected_app.id){
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

    default:
      return state
  }
}
