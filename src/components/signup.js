import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
	Button, Modal, OverlayTrigger, Popover, Tooltip
} from 'react-bootstrap';

class Signup extends Component {
	constructor(props) {
		super(props);

		this.state = { showModal: false };

		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	close() {
		this.setState({ showModal: false });
	}

	open() {
		this.setState({ showModal: true });
	}

	handleRegister() {

	}

	render() {
		const { isLogined, isFetching } = this.props;
		return (
			<div className="signup">
				<span onClick={this.open} className="register-name">
					Sign up
				</span>
				<Modal show={this.state.showModal && !isLogined} onHide={this.close} dialogClassName="login-modal">
					<Modal.Header closeButton>
              <Modal.Title>Sign up</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          	{
							isFetching && !isLogined &&
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
						</div>
						<div className="form-group">
							<input
								type="password"
								className="form-control"
								placeholder="Re-enter password*"
								ref="repassword"/>
						</div>

          	<Button onClick={this.handleRegister} className="btn btn-primary full-width">Sign me up!</Button>

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
		isFetching: state.AccountState.isFetching
	}
}

export default Signup;
