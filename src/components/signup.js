import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signupAccount, CloseSignup } from '../actions/account_action';
import {
	Button, Modal
} from 'react-bootstrap';

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = { showModal: false, errMsg: ''};

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.handleRegister = this.handleRegister.bind(this);
	}

	close() {
		this.setState({ showModal: false });
		this.props.CloseSignup();

	}

	open() {
		this.setState({ showModal: true });
	}

	handleRegister() {
		this.setState({ errMsg: ''});
		if(this.refs.password.value !== this.refs.repassword.value) {
			this.setState({ errMsg: 'Password confirmation does not match Password'})
			return;
		}

		this.props.signupAccount({email: this.refs.email.value, password: this.refs.password.value});
	}

	render() {
		const { isLogined, isFetching, signupShowed } = this.props;
		return (
			<div className="signup">
				<span onClick={this.open} className="register-name">
					Sign up
				</span>
				<Modal show={(this.state.showModal || signupShowed) && !isLogined} onHide={this.close} dialogClassName="signup-modal">
					<Modal.Header closeButton>
              <Modal.Title>Sign up</Modal.Title>
							<p className="subscribe-text">The Catapult will launch soon.
										Be the first to know by signing up with us.</p>
          </Modal.Header>
          <Modal.Body>

          	{
							isFetching && !isLogined &&
							<div className="alert alert-danger" role="alert">
							  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							  <span className="sr-only">Error:</span>
							  &nbsp; Error registering account! Please try again!
							</div>
						}
						{
							this.state.errMsg !== '' &&
							<div className="alert alert-danger" role="alert">
							  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							  <span className="sr-only">Error:</span>
							  &nbsp; {this.state.errMsg}
							</div>
						}

						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Email*"
								ref="email"/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Password*"
								ref="password"/>
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Re-enter password*"
								ref="repassword"/>
						</div>

          	<Button onClick={this.handleRegister}
										className="btn btn-primary btn-green btn-green-primary full-width">
							Sign me up!
						</Button>

          </Modal.Body>

				</Modal>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		isLogined: state.AuthState.isLogined,
		isFetching: state.AccountState.isFetching,
		signupShowed: state.AccountState.signupShowed
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		signupAccount: signupAccount,
		CloseSignup: CloseSignup
	}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Signup);
