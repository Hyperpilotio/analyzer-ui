import { combineReducers } from 'redux';
import reducer from './sizingReducer';

const rootReducer = combineReducers({
  reducer: reducer
})

export default rootReducer