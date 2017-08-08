import { ADD_ALL, TOGGLE_SELECTED } from "../constants";

const initialState = [
  {
    apps: [],
    selected_apps:[]
  }
]

export default function reducer(state = initialState, action) {
  //clone state first, avoid mutate original state
  let cloneState = Object.assign({}, state);
  switch (action.type) {
    case ADD_ALL:
      return Object.assign({}, state, {selected_apps: state.apps});

    case TOGGLE_SELECTED:
      //decide push or splice it
      let selectedApp = cloneState.selected_apps.filter(function(app, index){
        if(app.id === action.selected_app.id){
          cloneState.selected_apps.splice(index, 1)
          return true;
        }else{
          return false;
        }
      });
      //If it is not exist in the selected_apps, push it into selected array
      //if it is exist, remove it from array
      if(!!selectedApp){
           return Object.assign({}, state, 
                {selected_apps: cloneState.selected_apps.push(action.selected_app)});        
      } else { 
           return Object.assign({}, state, 
              {selected_apps: cloneState.selected_apps});
      }

    default:
      return state
  }
}
