import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';

const rootReducer = combineReducers({
	AuthState: AuthReducer
});

export default rootReducer;
