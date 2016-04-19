import 'core-js/fn/object/assign';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import thunk from 'redux-thunk';

// import App from './components/Main';
import reducers from './reducers';
import routes from './routes';

let createStoreWithMiddleware = applyMiddleware(
	thunk
)(createStore);

let store = createStoreWithMiddleware(reducers);

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes} />
	</Provider>
	, document.getElementById('app')
);

// Render the main component into the dom
// ReactDOM.render(<App />, document.getElementById('app'));
