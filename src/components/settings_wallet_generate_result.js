import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GenerateClientWallet, ClearPrikeysCache } from '../actions/wallet_action';
import Spinner from './spinner';

class WalletSettingsGenerateResult extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    self = this;
    if(self.props.pwd) {
      setTimeout(function(){self.props.GenerateClientWallet(self.props.pwd)}, 1000);
    }
  }

  render() {
    const { address, prikey, ClearPrikeysCache} = this.props;

    console.log(address);

    if(!address) {
      return (
        <div className="settings-wallet-generate-result-spinner">
          <Spinner />
        </div>
      )
    }
    return (
      <div className="settings-wallet-generate-result">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 segment">

              <div className="address">
                <label>Your wallet address:</label>
                <p>{address}</p>
              </div>

              {
                prikey &&
                <div className="panel panel-default">
                  <div className="panel-body">
                    <p>
                      Please <strong>WRITE DOWN</strong> the following private key and keep it in a safe place.
                    </p>

                    <label><strong>Your private key:</strong></label>
                    <p>{prikey}</p>


                    <br />

                    <div className="note">
                        <span>Notes:</span>
                        <p>- For your convenience, we will ENCRYPT your private key with your provided password and store it securely.</p>
                        <p>- Please DO NOT forget your password. We do not store your password so we CANNOT help you recover it.</p>
                        <p>- If you lose your password and your private key, you will lose all the assets in this wallet forever. </p>
                        <p>- Please DO NOT use this wallet address outside of Catapult.Asia, as this will result in losing access to all of your assets permanently. </p>
                        <p>- When you close this panel, you will not see the above private key again. </p>
                    </div>

                    <div>
                      <button
                        className="btn btn-primary btn-green btn-green-primary full-width"
                        onClick={ClearPrikeysCache}>
                        I agreed. Close this panel!
                      </button>
                    </div>

                  </div>
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    pwd: state.WalletState.pwd,
    address: state.WalletState.wallet.address,
    prikey: state.WalletState.prikey
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    GenerateClientWallet: GenerateClientWallet,
    ClearPrikeysCache: ClearPrikeysCache
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletSettingsGenerateResult);
