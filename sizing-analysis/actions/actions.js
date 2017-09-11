import { ADD_ALL, TOGGLE_SELECTED } from "../constants";

const mapStateToProps = state => state;

const mapDispatchToProps = dispatch => ({
  addAll: () => dispatch({ type: ADD_ALL }),
  toggleSelected: appName => dispatch({ type: TOGGLE_SELECTED, appName }),
});

export { mapDispatchToProps, mapStateToProps };
