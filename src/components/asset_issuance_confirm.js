import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Spinner from './spinner';
import { PrepareIssueAsset ,ProceedAssetIssuance } from '../actions/asset_action';

class AssetIssuanceConfirm extends Component {

  componentDidMount() {
    this.props.PrepareIssueAsset(this.props.IssuingAsset);
  }

  render() {

    const { IssuingAsset } = this.props;

    if(!IssuingAsset.txHex) {
      return (
        <div className="asset-issuance-confirm-spinner">
          <Spinner />
        </div>
      )
    }

    console.log(IssuingAsset);

    return (
      <div className="asset-issuance-confirm">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 segment">
              <div className="panel panel-default">
                <p>
                  Please check your asset details, then enter your decryption password to proceed.
                </p>

                <label>Asset Name</label>
                <p>{IssuingAsset.name}</p>

                <label>Issue Amount</label>
                <p>{IssuingAsset.amount}</p>

                <label>Image</label>
                <p>{IssuingAsset.imageUrl}</p>

                <label>Description</label>
                <p>{IssuingAsset.desc}</p>

                <hr />

                <label>Blockchain Asset ID</label>
                <p>{IssuingAsset.assetId}</p>

                <label>Blockchain raw transaction</label>

                <p>
                  <textarea readonly
                    rows="4"
                    value={IssuingAsset.txHex}
                    />
                </p>

                <label>
                  Enter your decryption password to proceed, or <Link to="/assets/issuance"><i><u>go back</u></i></Link> to amend.
                </label>
                <input
                  type="password"
                  ref="pwd" />
                  <button
                    className="btn btn-primary btn-green btn-green-primary full-width"
                    >
                    Issue Asset
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
    IssuingAsset: state.AssetState.IssuingAsset
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    PrepareIssueAsset: PrepareIssueAsset,
    ProceedAssetIssuance: ProceedAssetIssuance
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetIssuanceConfirm);
