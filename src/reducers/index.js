import { combineReducers } from 'redux';
import LoginReducer from './login_reducer';

const rootReducer = combineReducers({
	LoginState: LoginReducer
});

export default rootReducer;
