import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import Spinner from './spinner';
import { 
	PrepareIssueAsset, 
	RedirectAssetIssuanceResult,
	InitializeAssetIssuance
} from '../actions/asset_action';

class AssetIssuanceConfirm extends Component {
	
	constructor(props) {
		super(props);
	
		this.state = {
			processing: false
		}
	}

  
  render() {

    const { IssuingAsset, wallet } = this.props;

    return (
      <div className="main-panel">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-md-offset-3 segment">
              <div className="panel panel-default">
                <p>
                  Please check your asset details, then enter your decryption password to proceed.
                </p>

                <label>Asset Name</label>
                <p>{IssuingAsset.name}</p>
								
								<label>Asset Code</label>
                <p>{IssuingAsset.code}</p>

                <label>Issuing Amount</label>
                <p>{numeral(IssuingAsset.amount).format('0,0')}</p>
								
								<label>Percentage of Total Company Equity</label>
                <p>{numeral(IssuingAsset.percentCompany).format('0,0.00')}</p>

                <label>Logo</label>
                <p><img src={IssuingAsset.logoUrl} /></p>

                <label>Description</label>
                <p>{IssuingAsset.desc}</p>

                <hr />

                <button
               		className="btn btn-primary btn-green btn-green-primary full-width"
									disabled={this.state.processing}
									onClick={() => {
										if (this.state.processing) {
											return;
										}
										var self = this;
										this.setState({processing: true});
										setTimeout(() => self.setState({processing: false}), 10000);

										this.props.InitializeAssetIssuance({
											issuer: IssuingAsset.issuer,
                      code: IssuingAsset.code,
                      name: IssuingAsset.name,
                      amount: IssuingAsset.amount,
											percentCompany: IssuingAsset.percentCompany,
                      logoUrl: IssuingAsset.logoUrl,
                      desc: IssuingAsset.desc,
										});
									}}>
									{
										this.state.processing ?
										<Spinner /> : <span>Proceed to issue {IssuingAsset.name}!</span>
									}
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
    IssuingAsset: state.AssetState.IssuingAsset
  }
}
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    PrepareIssueAsset: PrepareIssueAsset,
		RedirectAssetIssuanceResult: RedirectAssetIssuanceResult,
		InitializeAssetIssuance: InitializeAssetIssuance
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetIssuanceConfirm);
