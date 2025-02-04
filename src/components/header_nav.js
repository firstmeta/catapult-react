import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Login from './login';
import Logout from './logout';
import Signup from './signup';
import PasswordReset from './account_pwd_reset_request';
import CatapultLogo from '../images/catapult_logo.png';
import { OpenLogin } from '../actions/account_action';

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
							
								<li>
									<Link to="/market/companylisting">Marketplace</Link>
                </li>

                <li className="dropdown">
									<a
										className="dropdown-toggle"
										data-toggle="dropdown"
										role="button" aria-haspopup="true"
										aria-expanded="false"
										onClick={!isLogined && (() => this.props.OpenLogin())}>

										List your company		
										<span className="caret"></span>
									</a>
									{
										isLogined &&
										<ul className="dropdown-menu" aria-labelledby="dropdownMenu3">
											<li><Link to="/companies-campaigns-mine">My Companies</Link></li>
																						<li role="separator" className="divider"></li>
											<li><Link to="/company/start">Set up Company</Link></li>
										</ul>
									}

                </li>
                								
              </ul>

							<ul className="nav navbar-nav navbar-right">
								<li>
									<a>
										{isLogined && <Link to="/transaction-summary/trades">My Transactions</Link>}	
									</a>	
								</li>
								{
									!isLogined && 
									<li>
										<a><Login /></a>	
									</li>
								}	
								{
									isLogined &&
										<li className="dropdown">
											<a
												className="dropdown-toggle"
												data-toggle="dropdown">
												<span className="glyphicon glyphicon-cog"></span>
											</a>
											<ul className="dropdown-menu" aria-labelledby="dropdownMenu3">
												<li><Link to="/assets/batchtransfer">Transfer Equity</Link></li>
												<li><Link to="/assets/issuance">Issue Equity</Link></li>
												<li><Link to="/settings/wallet">My Asset Wallet</Link></li>
												<li><Link to="/settings/profile">My Profile</Link></li>
												<li role="separator" className="divider" style={{"margin": "4px 0"}}></li>
												<li><Logout /></li>
											</ul>
										</li>
								}
                <li>
                  <a>
                    {!isLogined && <Signup />}
                  </a>
                </li>
								<li><PasswordReset /></li>
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
function mapDispatchToProps(dispatch) {
	return bindActionCreators({OpenLogin: OpenLogin}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);

{/*<form className="navbar-form navbar-left" role="search">
	<div className="form-group">
		<input type="text" className="form-control" placeholder="Search" /> &nbsp;
	</div>
	<button type="submit" className="btn btn-default">Submit</button>
</form>*/}
