import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import AccountReducer from './account_reducer';

const rootReducer = combineReducers({
	AuthState: AuthReducer,
	AccountState: AccountReducer
});

export default rootReducer;
