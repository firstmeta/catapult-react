require('normalize.css/normalize.css');
require('styles/App.css');

import React, { Component } from 'react';
import HeaderNav from './header_nav';

// let yeomanImage = require('../images/yeoman.png');

class App extends Component {
  render() {

    return (
      <div>
      <HeaderNav />
      {this.props.children}
      	
      </div>
    );
  }
}

App.defaultProps = {
};

export default App;
