import { combineReducers } from 'redux';
import {routerStateReducer} from 'redux-router';
import AuthReducer from './auth_reducer';
import AccountReducer from './account_reducer';
import CompanyReducer from './company_reducer';

const rootReducer = combineReducers({
	router: routerStateReducer,
	AuthState: AuthReducer,
	AccountState: AccountReducer,
	CompanyState: CompanyReducer
});

export default rootReducer;
