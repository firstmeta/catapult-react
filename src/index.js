import 'core-js/fn/object/assign';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers,compose, applyMiddleware } from 'redux';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';

import thunk from 'redux-thunk';
import { CheckAuthMiddleware } from './middlewares/check_auth_mddlw';

import reducers from './reducers';
import routes from './routes';

import App from './components/Main';
import Landing from './components/landing';
import CompanyBrowse from './components/company_browse';
import CompanyCreate from './components/company_create';
import CompanyStart from './components/company_start';
import CompanyView from './components/company_view';
import CompaniesAndCampaignsMine from './components/companies_campaigns_mine';
import CampaignCreate from './components/campaign_create';
import Investors from './components/investors';
import AboutUs from './components/aboutus';
import AccountSetting from './components/account_setting';
import PasswordReset from './components/account_pwd_reset';
import EmailVerification from './components/email_verification';
import Admin from './components/admin';
import Policy from './components/policy';

const store = compose(
	applyMiddleware(thunk, CheckAuthMiddleware),
	reduxReactRouter({
		createHistory
	})
)(createStore)(reducers);


render(
	<Provider store={store}>
		<ReduxRouter>
			<Route path="/" component={App}>
				<IndexRoute component={Landing} />
				<Route path="/account/verify_email" component={EmailVerification} />
				<Route path="/account/settings" component={AccountSetting} />
				<Route path="/account/reset_pwd" component={PasswordReset} />
				<Route path="/company/browse" component={CompanyBrowse} />
				<Route path="/company/start" component={CompanyStart} />
				<Route path="/company/:randID/edit" component={CompanyCreate} />
				<Route path="/company/view/:randID" component={CompanyView} />
				<Route path="/companies-campaigns-mine" component={CompaniesAndCampaignsMine} />
				<Route path="/campaign/:campaignRandID/edit" component={CampaignCreate} />
				<Route path="/investors" component={Investors} />
				<Route path="/aboutus" component={AboutUs} />
				<Route path="/policy" component={Policy} />
				<Route path="/keeper" component={Admin} />
			</Route>
		</ReduxRouter>
	</Provider>
	, document.getElementById('app')
);
