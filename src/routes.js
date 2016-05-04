import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/Main';
import Landing from './components/landing';
import CompanyCreate from './components/company_create';
import AccountSetting from './components/account_setting';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Landing} />
		<Route path="api/accountsetting" component={AccountSetting} />
		<Route path="/companycreate" component={CompanyCreate} />
	</Route>
)
