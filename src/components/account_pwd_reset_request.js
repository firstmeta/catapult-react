import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RequestResetPassword, ClosePwdReset } from '../actions/account_action';
import Alert from './alert_local';
import {
  Button, Modal
} from 'react-bootstrap';

class PasswordResetRequest extends Component {
  constructor(props) {
    super(props);

    this.state = { showModal: false };
    this.open = this.open.bind(this);
		this.close = this.close.bind(this);
  }
  open() {
    this.setState({showModal: true});
  }
  close() {
    this.setState({ showModal: false });
    this.props.ClosePwdReset();
  }

  render() {
    const { isLogined, pwdResetShowed } = this.props;
    return (
      <div className="password-reset-request">
        <Modal show={(this.state.showModal || pwdResetShowed) && !isLogined} onHide={this.close} dialogClassName="pwd-reset-modal">
          <Modal.Header closeButton>
            <Modal.Title>Reset your password</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          <Alert />

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Email*"
                ref="email"/>
            </div>


            <Button onClick={() => {
                        this.props.RequestResetPassword(this.refs.email.value);
                        this.close()
                    }}
                    className="btn btn-primary btn-green btn-green-primary full-width">
              Send request
            </Button>

          </Modal.Body>
        </Modal>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    isLogined: state.AuthState.isLogined,
    pwdResetShowed: state.AccountState.pwdResetShowed
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    RequestResetPassword: RequestResetPassword,
    ClosePwdReset: ClosePwdReset
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetRequest);
