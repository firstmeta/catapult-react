import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutUser } from '../actions/auth_action';
import { CloseSignup } from '../actions/account_action';


class Logout extends Component {

	constructor(props) {
		super(props);
		this.handleLogout = this.handleLogout.bind(this);
	}

	handleLogout() {
		this.props.logoutUser();
		this.props.CloseSignup();
	}

	render() {
		return (
			<div className="logout">
				<span onClick={this.handleLogout} className="logout-name">
					Logout
				</span>
			</div>
		)
	}

}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		logoutUser, CloseSignup
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(Logout);
