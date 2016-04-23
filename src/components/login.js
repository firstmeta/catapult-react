import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Input, Modal, OverlayTrigger, Popover, Tooltip } from 'react-bootstrap';

class Login extends Component {
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

	render() {
		return (
			<div className="login">
				<span onClick={this.open} className="login-name">
					Login
				</span>
				<Modal show={this.state.showModal} onHide={this.close} dialogClassName="login-modal">
					<Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>    
                        <Input
                            type="text"
                            placeholder="Email*"
                            ref="email"
                            groupClassName="group-class"
                            labelClassName="label-class" />

                       <div className="input-group">
	                        <input
	                            type="password"
	                            placeholder="Password*"
	                            ref="password"
	                            className="form-control" />

	                         <a className="login-forgot-password">Forgot your password?</a>
                        </div>

                        <Button onClick={this.handleLogin} className="btn btn-primary full-width">Log me in!</Button>

                        </Modal.Body>
                        <Modal.Footer>
                            
                            
                        </Modal.Footer>
				</Modal>
			</div>
		)
	}
}

export default Login;