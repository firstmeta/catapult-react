import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import Spinner from './spinner';
import { PrepareTransferAsset, RedirectAssetTransferResult } from '../actions/asset_action';

class AssetTransferConfirm extends Component {

  componentDidMount() {
    this.props.PrepareTransferAsset(this.props.tfrAsset);
  }

  render() {

    const { tfrAsset, wallet } = this.props;

    if(!tfrAsset.txHex) {
      return (
        <div className="main-panel-spinner">
          <Spinner />
        </div>
      )
    }

    return (
      <div className="main-panel">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 segment">
              <div className="panel panel-default">
                <p>
                  Please check your transfer details, then enter your decryption password to proceed.
                </p>

                <label>Asset code/name</label>
                <p>{tfrAsset.assetCode + ' - ' + tfrAsset.assetName}</p>

                <label>Transfer amount</label>
                <p>{numeral(tfrAsset.amount).format('0,0')}</p>

                <label>To this address</label>
                <p>{tfrAsset.toAddr}</p>

                <hr />

                <label>Blockchain raw transaction</label>

                <p>
                  <textarea readonly
                    rows="4"
                    value={tfrAsset.txHex}
                    />
                </p>

                <label>
                  Enter your decryption password to proceed, or <Link to="/assets/issuance"><i><u>go back</u></i></Link> to amend.
                </label>
                <input
                  type="password"
                  ref="pwd" />
                  <button
                    className="btn btn-primary btn-green btn-green-primary full-width btn-last"
                    onClick={() => this.props.RedirectAssetTransferResult({
                      blockchainAssetID: tfrAsset.blockchainAssetID,
                      assetID: tfrAsset.assetID,
                      assetCode: tfrAsset.assetCode,
                      assetName: tfrAsset.assetName,
                      wallet: wallet,
                      toAddr: tfrAsset.toAddr,
                      amount: tfrAsset.amount,
                      unsignedtxhex: tfrAsset.txHex,
                      coloredOutputIndexes: tfrAsset.coloredOutputIndexes,
                      pwd: this.refs.pwd.value
                    })}>
                    Proceed to transfer {tfrAsset.amount + ' of ' + tfrAsset.assetName}!
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
    wallet: state.WalletState.wallet,
    tfrAsset: state.AssetState.TransferringAsset
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    PrepareTransferAsset: PrepareTransferAsset,
    RedirectAssetTransferResult: RedirectAssetTransferResult
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetTransferConfirm);
