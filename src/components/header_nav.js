import React, { Component } from 'react';
import { Link } from 'react-router';
import Login from './login';
import CatapultLogo from '../images/catapult_logo.png';

export default class HeaderNav extends Component {
	render() {
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
                    <Link to="/browse">Browse Companies<span className="sr-only">(current)</span></Link>
                </li>
                <li>
                	<Link to="/entrepreneurs">Entrepreneurs</Link>
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
                      <Login />
                  </a>
                </li>
              </ul>
            </div>
              
          </nav>
    		</div>
		);
	}
}