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
import CompanyCreate from './components/company_create';
import CompanyStart from './components/company_start';
import AccountSetting from './components/account_setting';

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
				<Route path="api/accountsetting" component={AccountSetting} />
				<Route path="/company/start" component={CompanyStart} />
				<Route path="/company/:randID/edit" component={CompanyCreate} />
			</Route>
		</ReduxRouter>
	</Provider>
	, document.getElementById('app')
);
