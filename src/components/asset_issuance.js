import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Alert from './global_alert';
import Spinner from './spinner';
import InputModal from './input_modal';

import AssetIssuanceForm from './asset_issuance_form';
import AssetIssuanceConfirm from './asset_issuance_confirm';
import AssetIssuanceResult from './asset_issuance_result';

import { FetchWallet } from '../actions/wallet_action';
import { 
	FetchAssetIssuingTXs,
	SignAndSendAssetIssuance
} from '../actions/asset_action';

class AssetIssuance extends Component {
  constructor(props) {
		super(props);
		this.state = {
			showModal: false, 
			showModalSpinner: false, 
			pwd: '',
			selectedTxID: '',
			updatingTxID: ''
		}
	}

	componentWillMount() {
		this.props.FetchAssetIssuingTXs();
		if(!this.props.Wallet) {
      this.props.FetchWallet();
    }

	}

	formatIssuingTXs(txs) {
		var self = this;

		return txs.map(function(tx) {
			var t = {};
			t.TxID = tx.TxID;
			t.AssetCode = tx.AssetCode;
			t.Amount = tx.Amount;
			t.Timestamp = tx.InitiatedOn;
			t.Btn = (
				<button
					className="btn btn-primary btn-yellow btn-yellow-primary"
					onClick={() => {
						self.setState({
						btnAction: 'signsend', 
						showModal: true, 
						selectedTxID: tx.TxID,
					});
				}}>
     			{
						self.state.updatingTxID === tx.TxID ?
         		<Spinner /> :	<span>SIGN & SEND</span>
					}   
				</button>
				)
			return t;
		});
	}

  render() {
    const { step, AssetIssuingTXs, Wallet } = this.props;

    return (
			<div className="asset-issuance">
				<div className="container-fluid">
					<Alert />
					<InputModal
						title={
							this.state.btnAction === 'cancel' ?
								"Order Cancellation" : "Asset Transfer Signing"
						}
						msg='You are about to sign and transfer your asset. Please make sure the details is correct.'
						
						inputLabel={
							this.state.btnAction === 'signsend' ?
								"Please enter your decryption password to proceed." : ""
						}
						value={this.state.pwd}
						inputCapture={
							this.state.btnAction === 'cancel' ?
							"" : pwd => this.setState({pwd: pwd})
						}
						show={this.state.showModal} 
						showSpinner={this.state.showModalSpinner}
						close={() => this.setState({showModal: false})}
						styleName={'tx-summary-input-modal'}
						btnFun={() => {
							this.setState({showModal: false, updatingTxID: this.state.selectedTxID});
							if (this.state.btnAction === 'signsend') {
								this.props.SignAndSendAssetIssuance({
									txID: this.state.selectedTxID, 
									wallet: Wallet, 
									pwd: this.state.pwd
								});
							}
						}}
					/>

					{
						AssetIssuingTXs && AssetIssuingTXs.length > 0 &&
						<div className="row">
							<div className="col-md-10 col-md-offset-1">
								<br />
  				      <div>
									<BootstrapTable 
										data={this.formatIssuingTXs(AssetIssuingTXs)} 
										striped={true} hover={true} 
										className="table" 
										pagination={true} 
										options={{sizePerPage: 5}}
										tableStyle={{border: 'none'}}>
										<TableHeaderColumn isKey={true} dataField="TxID" width="125px">TxID</TableHeaderColumn>
										<TableHeaderColumn dataField="AssetCode" width="125px">Asset Code</TableHeaderColumn>
										<TableHeaderColumn dataField="Amount" width="125px">Amount</TableHeaderColumn>
										<TableHeaderColumn dataField="Timestamp" width="125px">Timestamp</TableHeaderColumn>
										<TableHeaderColumn 
											dataField="Btn"
											width="100">
										</TableHeaderColumn>
  				        </BootstrapTable>
  				      </div>
  				    </div>
						</div>
				}		

				</div>
        {!step && <AssetIssuanceForm />}
        {step === 'confirmation' && <AssetIssuanceConfirm />}
        {step === 'result' && <AssetIssuanceResult />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
		step: state.router.location.query.step,
		AssetIssuingTXs: state.AssetState.AssetIssuingTXs,
		Wallet: state.WalletState.wallet
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		FetchWallet: FetchWallet,
		FetchAssetIssuingTXs: FetchAssetIssuingTXs,
		SignAndSendAssetIssuance: SignAndSendAssetIssuance
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetIssuance);
