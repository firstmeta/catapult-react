import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Login from './login';
import Logout from './Logout';
import Signup from './signup';
import CatapultLogo from '../images/catapult_logo.png';

class HeaderNav extends Component {
	render() {

    const { isLogined } = this.props;

		return (
				<div className="header-nav">
          <nav className="navbar navbar-default navbar-fixed-top ">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link className="navbar-brand" to="/"><img src={CatapultLogo}/></Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li>
                    <Link to="/company/browse">Browse Companies<span className="sr-only">(current)</span></Link>
                </li>
                <li className="dropdown">
									<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Entrepreneurs <span className="caret"></span></a>
									<ul className="dropdown-menu" aria-labelledby="dropdownMenu3">
										<li><Link to="/companies-campaigns-mine">My companies</Link></li>
										<li role="separator" className="divider"></li>
										<li><Link to="/company/start">Set up company</Link></li>
									</ul>
                </li>
                <li>
                	<Link to="/investers">Investers</Link>
                </li>
              </ul>
              <form className="navbar-form navbar-left" role="search">
                <div className="form-group">
                  <input type="text" className="form-control" placeholder="Search" /> &nbsp;
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
              </form>

              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a>
                    {!isLogined && <Login />}
                    {isLogined && <Logout />}
                  </a>
                </li>
                <li>
                  <a>
                    {!isLogined && <Signup />}
                  </a>
                </li>
              </ul>
            </div>

          </nav>
    		</div>
		);
	}
}

function mapStateToProps(state) {
  return {
    isLogined: state.AuthState.isLogined
  }
}
export default connect(mapStateToProps)(HeaderNav);
