// require('bootstrap/dist/css/bootstrap.min.css');
require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/landing.css')
require('styles/animate.css');
require('styles/alloy-editor-ocean-min.css');
require('react-bootstrap-table/css/react-bootstrap-table-all.min.css')
// require('bootstrap/dist/js/bootstrap.min.js');

import React, { Component } from 'react';
import HeaderNav from './header_nav';
import FooterNav from './footer_nav';

// let yeomanImage = require('../images/yeoman.png');

class App extends Component {
  render() {

    return (
		<div>
			<div className="wrap">
				<HeaderNav />
				<div className="main">
					{this.props.children}
				</div>
			</div>

			<FooterNav />

		</div>
    );
  }
}

App.defaultProps = {
};

export default App;
