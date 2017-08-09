import { ADD_ALL, TOGGLE_SELECTED } from "../constants";

function mapStateToProps(state) {
  return state;
}

const addAll = () => ({ type: ADD_ALL });
const toggleSelected = (selected_app) => ({ type: TOGGLE_SELECTED, selected_app: selected_app });

function mapDispatchToProps(dispatch){
  return {
    addAll: function(){
      dispatch({ type: ADD_ALL });
    },
    toggleSelected: function(selected_app) {       
        dispatch({ type: TOGGLE_SELECTED, selected_app: selected_app }); 
    }
    
  };
}
export { mapDispatchToProps, mapStateToProps, addAll, toggleSelected };