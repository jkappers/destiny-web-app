import { combineReducers } from 'redux'
import authReducer from './auth';
import historyReducer from './history';

export default history => combineReducers({
  router: historyReducer(history),
  auth: authReducer
})