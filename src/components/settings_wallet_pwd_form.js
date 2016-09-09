import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PreGenerateWallet } from '../actions/wallet_action';

class WalletSettingsPwdForm extends Component {
  constructor(props) {
    super(props);

    this.generateWallet = this.generateWallet.bind(this);
  }

  generateWallet() {
    this.props.PreGenerateWallet(this.refs.pwd.value);
  }

  render() {
    return (
      <div className="settings-wallet-pwd-form">
        <div className="row">
          <div className="col-md-4 col-md-offset-4 segment">

          <div className="panel panel-default">
            <div className="panel-body">
              <label>
                Please enter a password to <strong><u>encrypt</u></strong> your wallet key.
              </label>
              <input
                type="password"
                ref="pwd" />

              <label>
                Please re-enter your password.
              </label>
              <input
                type="password"
                ref="repwd" />

                <div className="note">
                  <span>Notes:</span>
                  <p>- Please DO NOT forget your password. We DO NOT store your password so we CANNOT help you recover it.</p>
                </div>

                <div>
                  <button
                    className="btn btn-primary btn-green btn-green-primary full-width"
                    onClick={this.generateWallet}>
                    Generate my wallet!
                  </button>
                </div>
            </div>
          </div>

          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({PreGenerateWallet: PreGenerateWallet}, dispatch);
}

export default connect(null, mapDispatchToProps)(WalletSettingsPwdForm);
