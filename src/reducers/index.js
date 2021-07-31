import {combineReducers} from 'redux';
import RegistrationReducer from './RegistrationReducer';

// combine all reducers
const rootReducer = combineReducers({
  RegistrationReducer,
});

export default rootReducer;
