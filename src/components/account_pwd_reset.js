import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ResetPassword } from '../actions/account_action';
import Alert from './global_alert';

class PasswordReset extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    const {email, code} = this.props;

    if(!code) {
      return (
        <div className="pwd-reset">
          <div className="container-fluid">
            <div className="row submit-review">
              <div className="col-md-10 col-md-offset-1">
                <Alert />
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="pwd-reset">
        <div className="container-fluid">
          <Alert />

          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
            <h1>Reset your password</h1>
              <label for="pwd"></label>
              <div>
                <input
                  type="password"
                  placeholder="Enter your new password!"
                  ref="pwd" />
              </div>

              <label for="pwd"></label>
              <div>
                <input
                  type="password"
                  placeholder="Re-enter your new password!"
                  ref="repwd" />
              </div>

              <div>
                <button
                  className="btn btn-primary btn-green btn-green-primary"
                  onClick={() => {this.props.ResetPassword(email, code, this.refs.pwd.value, this.refs.repwd.value)}}>
                  Reset
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.router.location.query.email,
    code: state.router.location.query.code
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ResetPassword}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(PasswordReset);
