import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './components/Main';
import Landing from './components/landing';
import AccountSetting from './components/account_setting'

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Landing} />
		<Route path="/accountsetting" component={AccountSetting} />
	</Route>
)