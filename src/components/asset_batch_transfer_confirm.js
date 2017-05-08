import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import Spinner from './spinner';
import Alert from './global_alert';

import {
	InitializeAssetBatchTransfer,
	ProceedBatchAssetTransfer 
} from '../actions/asset_action';

class AssetBatchTransferConfirm extends Component {

	renderReceiverList() {
		return this.props.TransferringAsset.receivers.map(r => {
			return (
				<div className="row">
					<div className="col-md-5">{r.description}</div>	
					<div className="col-md-4">{r.ext}</div>
					<div className="col-md-2">{r.value}</div>
				</div>	
			)
		})	
	}

	render() {

		const { TransferringAsset } = this.props;

		return (
			<div>
				<div className="main-panel">
					<div className="row">
						<div className="col-md-6 col-md-offset-3 segment">
							<div className="panel panel-default">
								<p>
									Please check your asset details, 
										then enter your decryption password to proceed.
                </p>
								<label>Asset Name</label>
                <p>{TransferringAsset.assetName}</p>
								
								<label>Asset Code</label>
								<p>{TransferringAsset.assetCode}</p>

								<label>Receivers Address and Amount</label>
								<div className="container-fluid">
									{this.renderReceiverList()}
								</div>	

								<br />

								<button 
									className="btn btn-primary btn-green btn-green-primary full-width"
									onClick={() => this.props.InitializeBatchTransfer({
										transferringAsset: this.props.TransferringAsset,
									})}>
									Initialize Asset Transfer	
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
		TransferringAsset: state.AssetState.BatchTransferringAsset
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		InitializeBatchTransfer: InitializeAssetBatchTransfer,
		ProceedBatchTransfer: ProceedBatchAssetTransfer
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetBatchTransferConfirm);
