import React, { Component } from 'react';
import { Link } from 'react-router';

export default class HeaderNav extends Component {
	render() {
		return (
			<div className="header-nav">
                <nav className="navbar navbar-default navbar-fixed-top ">
                  <div className="container-fluid">
                    
                    <div className="navbar-header">
                      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                      </button>
                      <Link className="navbar-brand" to="/">Catapult</Link>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                      <ul className="nav navbar-nav">
                        <li className="nav navbar-nav">
                            <Link to="/browse">Browse Companies<span className="sr-only">(current)</span></Link>
                        </li>

                        <li className="nav navbar-nav">
                        	<Link to="/entrepreneurs">Entrepreneurs</Link>
                        </li>

                        <li className="nav navbar-nav">
                          <Link to="/investers">Investers</Link>
                        </li>

                        <li className="nav navbar-nav">
                          <Link to="/market">Market</Link>
                        </li>
                      </ul>
                      <form className="navbar-form navbar-left" role="search">
                        <div className="form-group">
                          <input type="text" className="form-control" placeholder="Search" /> &nbsp;
                        </div>
                        <button type="submit" className="btn btn-default">Submit</button>
                      </form>
                      <ul className="nav navbar-nav navbar-right">
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                Balance: 1 Ether <span className="caret"></span>
                            </a>
                          <ul className="dropdown-menu">
                            <li><a href="#">FMX: 2300</a></li>
                            <li><a href="#">BLC: 4000</a></li>
                          </ul>
                        </li>
                        
                        <li className="dropdown">
                            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                                <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
                            </a>
                          <ul className="dropdown-menu">
                            <li><a href="#">Account</a></li>
                            <li><a href="#">Security</a></li>
                            <li role="separator" className="divider"></li>
                            <li><a href="#">Logout</a></li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
            </div>
		);
	}
}