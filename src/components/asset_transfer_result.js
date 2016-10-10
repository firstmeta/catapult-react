import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import Spinner from './spinner';
import { ProceedAssetTransfer } from '../actions/asset_action';
import { COLOREDCOINS_EXPLORER_URL } from '../config';

class AssetTransferResult extends Component {

  componentDidMount() {
    this.props.ProceedAssetTransfer(this.props.tfrAsset);
  }

  render() {
    const { tfrAsset, wallet } = this.props;

    if(!tfrAsset.completed) {
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
                <h2>
                  Asset Transfer Result
                </h2>

                <label>Asset code/name</label>
                <p>{tfrAsset.assetCode + ' - ' + tfrAsset.assetName}</p>

                <label>Transfer amount</label>
                <p>{numeral(tfrAsset.amount).format('0,0')}</p>

                <label>From address</label>
                <p>{tfrAsset.fromAddress}</p>

                <label>To this address</label>
                <p>{tfrAsset.toAddress}</p>


                <label>Tranferring status</label>
                <p>{tfrAsset.status}</p>

                <hr />

                <label>Blockchain Transaction ID</label>
                <p>
                  <a target="_blank" href={COLOREDCOINS_EXPLORER_URL + '/tx/' + tfrAsset.signedtxhash}>
                    {tfrAsset.signedtxhash}
                  </a>
                </p>

                  <Link to="/assets/summary">
                    <button
                      className="btn btn-primary btn-green btn-green-primary full-width btn-last">
                      Close
                    </button>
                  </Link>
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
    ProceedAssetTransfer: ProceedAssetTransfer
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetTransferResult);
