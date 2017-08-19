import { ADD_ALL, TOGGLE_SELECTED } from "../constants";

function mapStateToProps(state) {
  return state;
}

const addAll = () => ({ type: ADD_ALL });
const toggleSelected = (selectedApp) => ({ type: TOGGLE_SELECTED, selectedApp: selectedApp });

function mapDispatchToProps(dispatch){
  return {
    addAll: function(){
      dispatch({ type: ADD_ALL });
    },
    toggleSelected: function(selectedApp) {       
        dispatch({ type: TOGGLE_SELECTED, selectedApp: selectedApp }); 
    }
    
  };
}
export { mapDispatchToProps, mapStateToProps, addAll, toggleSelected };
