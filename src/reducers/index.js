import { combineReducers } from 'redux';
import {routerStateReducer} from 'redux-router';
import AuthReducer from './auth_reducer';
import AccountReducer from './account_reducer';
import CompanyReducer from './company_reducer';
import CampaignState from './campaign_reducer';

const rootReducer = combineReducers({
	router: routerStateReducer,
	AuthState: AuthReducer,
	AccountState: AccountReducer,
	CompanyState: CompanyReducer,
	CampaignState: CampaignState
});

export default rootReducer;
