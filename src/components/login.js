import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions/auth_action'
import {
	Button, Modal
} from 'react-bootstrap';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = { showModal: false};

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
		this.handleLogin = this.handleLogin.bind(this);
	}

	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
	}

	handleLogin() {
		this.props.loginUser({email: this.refs.email.value, password: this.refs.password.value});
	}

	render() {
		const { isLogined, isFetching } = this.props
		return (
			<div className="login">
				<span onClick={this.open} className="login-name">
					Login
				</span>
				<Modal show={this.state.showModal && !isLogined} onHide={this.close} dialogClassName="login-modal">
					<Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    	{isFetching && !isLogined &&
	                    	<div className="alert alert-danger" role="alert">
							  <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
							  <span className="sr-only">Error:</span>
							  &nbsp; The email address and password you entered do not match!
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
							 <a className="login-forgot-password">Forgot your password?</a>
						</div>

          	<Button onClick={this.handleLogin}
										className="btn btn-primary btn-green btn-green-primary full-width">
							Log me in!
						</Button>

          </Modal.Body>
	        <Modal.Footer>


	        </Modal.Footer>
				</Modal>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		isLogined: state.AuthState.isLogined,
		isFetching: state.AuthState.isFetching
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ loginUser: loginUser}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
