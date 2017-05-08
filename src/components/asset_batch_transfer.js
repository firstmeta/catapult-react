import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dateformat from 'dateformat';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Spinner from './spinner';
import InputModal from './input_modal';

import Search from './search';
import AssetBatchTransferForm from './asset_batch_transfer_form';
import AssetBatchTransferConfirm from './asset_batch_transfer_confirm';

import { 
	FetchBatchAssetTransferTXs, 
	SignAndSendBatchAssetTransfer 
} from '../actions/asset_action';

import { FetchWallet } from '../actions/wallet_action';

class AssetBatchTransfer extends Component {

	constructor(props){
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
		this.props.FetchBatchAssetTransferTXs();
		if(!this.props.Wallet) {
      this.props.FetchWallet();
    }

	}

	formatTransferTXs(txs) {
		var self = this;
		return txs.map(function(tx) {
			var t = {};
			t.TxID = tx.ID;
			t.Description = 'Batch Transfer';
			t.Time = dateformat(tx.CreatedOn, 'mmm d, yyyy HH:MM:ss');
			t.Status = (tx.TxStatus === 'BC_FEE_FUNDING' ? 'Signing preparing' : "Ready for signing");
			if (tx.TxStatus === 'TX_PREPARING') {
				t.Btn = (
					<button
						className="btn btn-primary btn-yellow btn-yellow-primary"
						style={{
							"width": "90px", "max-height": "26px", "font-size": "12px", "padding": "2px 6px"
						}}
						onClick={() => {
							self.setState({
								btnAction: 'signsend', 
								showModal: true, 
								selectedTxID: tx.ID,
							});
						}}>
     		   	{
							self.state.updatingTxID === tx.ID ?
          		<Spinner /> :	<span>SIGN & SEND</span>
						}   
					</button>
				)
			}
			else {
				t.Btn = <i>Preparing...</i>;
			}
			return t;
		});
	}

	render() {
		const { step, BatchAssetTXs, Wallet } = this.props;

		return (
			<div className="asset-batch-transfer">
				<div className="container-fluid">
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
								this.props.SignAndSendBatchAssetTransfer({
									txID: this.state.selectedTxID, 
									wallet: Wallet, 
									pwd: this.state.pwd
								});
							}
						}}
					/>
					
				{BatchAssetTXs && BatchAssetTXs.length > 0 &&
					<div className="row">
  			    <div className="col-md-6 col-md-offset-3">
  			      <div>
								<BootstrapTable 
									data={this.formatTransferTXs(BatchAssetTXs)} 
									striped={true} hover={true} 
									className="table" 
									pagination={false} 
									options={{sizePerPage: 5}}
									tableStyle={{border: 'none'}}>
									<TableHeaderColumn isKey={true} dataField="TxID" width="115px"></TableHeaderColumn>
									<TableHeaderColumn dataField="Description" width="125px"></TableHeaderColumn>
									<TableHeaderColumn dataField="Time" width="125px"></TableHeaderColumn>
									<TableHeaderColumn 
										dataField="Btn"
										width="110">
									</TableHeaderColumn>
  			        </BootstrapTable>
  			      </div>
  			    </div>
					</div>
				}		
				</div>

				{!step && <AssetBatchTransferForm />}
				{step === 'confirmation' && <AssetBatchTransferConfirm />}
			</div>	
		)
	}
}

function mapStateToProps(state) {
  return {
		step: state.router.location.query.step,
		BatchAssetTXs: state.AssetState.BatchAssetTXs,
		Wallet: state.WalletState.wallet,
  }
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		FetchWallet: FetchWallet,
		FetchBatchAssetTransferTXs: FetchBatchAssetTransferTXs,
		SignAndSendBatchAssetTransfer: SignAndSendBatchAssetTransfer
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetBatchTransfer);
