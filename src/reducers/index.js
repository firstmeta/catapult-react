import { combineReducers } from 'redux';
import AuthReducer from './auth_reducer';
import AccountReducer from './account_reducer';
import CompanyReducer from './company_reducer';

const rootReducer = combineReducers({
	AuthState: AuthReducer,
	AccountState: AccountReducer,
	CompanyState: CompanyReducer
});

export default rootReducer;
