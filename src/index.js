import 'core-js/fn/object/assign';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers,compose, applyMiddleware } from 'redux';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';
import { reduxReactRouter, routerStateReducer, ReduxRouter } from 'redux-router';
import { createHistory } from 'history';
import thunk from 'redux-thunk';

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
import AccountSetting from './components/account_setting';
import Admin from './components/admin';

const store = compose(
	applyMiddleware(thunk),
	reduxReactRouter({
		createHistory
	})
)(createStore)(reducers);


render(
	<Provider store={store}>
		<ReduxRouter>
			<Route path="/" component={App}>
				<IndexRoute component={Landing} />
				<Route path="/account/settings" component={AccountSetting} />
				<Route path="/company/browse" component={CompanyBrowse} />
				<Route path="/company/start" component={CompanyStart} />
				<Route path="/company/:randID/edit" component={CompanyCreate} />
				<Route path="/company/view/:randID" component={CompanyView} />
				<Route path="/companies-campaigns-mine" component={CompaniesAndCampaignsMine} />
				<Route path="/campaign/:campaignRandID/edit" component={CampaignCreate} />
				<Route path="/keeper" component={Admin} />
			</Route>
		</ReduxRouter>
	</Provider>
	, document.getElementById('app')
);
