import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import Spinner from './spinner';
import { ProceedAssetIssuance } from '../actions/asset_action';
import { COLOREDCOINS_EXPLORER_URL } from '../config';

class AssetIssuanceResult extends Component {

  componentDidMount() {
    this.props.ProceedAssetIssuance(this.props.IssuingAsset);
  }

  render() {
    const { IssuedAsset, wallet } = this.props;

    if(!IssuedAsset.assetId) {
      return (
        <div className="main-panel-spinner">
          <Spinner />
        </div>
      )
    }

    return (
      <div className="asset-issuance-certificate">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 segment">
              <div className="panel panel-default">
                <h2>
                  Asset Issuance Certification
                </h2>

                <label>Asset Name</label>
                <p className="asset-name">{IssuedAsset.name}</p>

                <label>Issued Amount</label>
                <p>{numeral(IssuedAsset.amount).format('0,0')}</p>

                <label>Logo</label>
                <p><img src={IssuedAsset.imageUrl} /></p>

                <label>Description</label>
                <p>{IssuedAsset.desc}</p>

                <label>Issuing status</label>
                <p>{IssuedAsset.status}</p>

                <hr />

                <label>Blockchain Asset ID</label>
                <p>
                  <a target="_blank" href={COLOREDCOINS_EXPLORER_URL + '/asset/' + IssuedAsset.assetId}>
                    {IssuedAsset.assetId}
                  </a>
                </p>

                  <Link to="/assets/summary">
                    <button
                      className="btn btn-primary btn-green btn-green-primary full-width">
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
    IssuingAsset: state.AssetState.IssuingAsset,
    IssuedAsset: state.AssetState.IssuedAsset
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    ProceedAssetIssuance: ProceedAssetIssuance
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetIssuanceResult);
