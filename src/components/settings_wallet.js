import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import WalletSettingsPwdForm from './settings_wallet_pwd_form';
import WalletSettingsGenerateResult from './settings_wallet_generate_result';
import { FetchWallet } from '../actions/wallet_action';

class WalletSettings extends Component {
  constructor(props) {
    super(props);

  }

  componentWillMount() {
    if(!this.props.fetched) {
      this.props.FetchWallet();
    }
  }

  render() {
    const { step, fetched, address } = this.props;

    return (
      <div className="settings-wallet">
        {!step && fetched && !address && <WalletSettingsPwdForm />}

        {
          !step && address &&
          <div className="wallet-address">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-6 col-md-offset-3 segment">

                  <div className="address">
                    <label>Your wallet address:</label>
                    <p>{address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        {step === 'result' && <WalletSettingsGenerateResult />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    step: state.router.location.query.step,
    address: state.WalletState.address,
    fetched: state.WalletState.fetched
    //fetched: true
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchWallet: FetchWallet
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletSettings);
