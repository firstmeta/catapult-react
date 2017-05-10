import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateformat from 'dateformat';
import numeral from 'numeral';

import Spinner from './spinner';
import InputModal from './input_modal';

import { COLOREDCOINS_EXPLORER_URL } from '../config';
import { 
	FetchAssetTxs,
	FetchAssetIssuingTXs,
	FetchBatchAssetTransferTXs, 
	SignAndSendBatchAssetTransfer, 
	SignAndSendAssetIssuance
} from '../actions/asset_action';

class AssetSummary extends Component {

  constructor(props) {
		super(props);

		this.state = {
			showModal: false, 
			showModalSpinner: false, 
			pwd: '',
			selectedTxID: '',
			updatingTxID: '',
			updatingTxIDs: {},
			selectedTx:''
		}

    this.renderBalances = this.renderBalances.bind(this);
  }

	componentWillMount() {
		this.props.FetchAssetIssuingTXs();
		this.props.FetchBatchAssetTransferTXs();

    if(this.props.wallet.ID) {
			this.props.FetchAssetTxs(this.props.wallet.ID);
    }
    else {
      var attempt = 0;
      var self = this;

      var f = function() {
        if(self.props.wallet.ID) {
          self.props.FetchAssetTxs(self.props.wallet.ID);
        }
        else if (attempt < 4) {
          attempt += 1;
          setTimeout(f, 1000 * attempt);
        }
      }
      f();
		}
  }

	componentWillReceiveProps(nextProps) {
		if(nextProps.AssetTXUpdated) {
			var updatingTxIDs = Object.assign({}, this.state.updatingTxIDs);
			delete updatingTxIDs[nextProps.updatingTxIDs.TxID];
			this.setState({updatingTxIDs: updatingTxIDs});
		}	
	}

  renderBalances() {
    return this.props.Balances.map(b => {
      return (
        <div className="row">
          <div className="col-md-8">{b.AssetName}</div>
          <div className="col-md-4">{numeral(b.Amount).format('0,0')}</div>
        </div>
      )
    });
	}

	formatTXs(txs) {
		var wallet = this.props.wallet;

		return txs.map(function(tx) {
			var ftx = {};
			ftx.AssetCode = tx.AssetCode;
      ftx.TxID = tx.TxID;
      ftx.TxType = (tx.TxType === 'TRANSFER' ? 'TFR' : 'ISU');
      ftx.Ref = (
        wallet.Address === tx.ToAddress ?
          <div>
            <label>Received from: </label>
            <p><a target="_blank" href={COLOREDCOINS_EXPLORER_URL + '/address/' + tx.FromAddress}>{tx.FromAddress}</a></p>

						<p style={{'font-style': 'italic', 'text-decoration': 'underline'}}>
							<a target="_blank" href={COLOREDCOINS_EXPLORER_URL + '/tx/' + tx.BlockchainTxHash}>View on blockchain</a>
						</p>
          </div>
          :
          <div>
            <label>Sent to:</label>
            <p><a target="_blank" href={COLOREDCOINS_EXPLORER_URL + '/address/' + tx.ToAddress}>{tx.ToAddress}</a></p>

						<p style={{'font-style': 'italic', 'text-decoration': 'underline'}}>
							<a target="_blank" href={COLOREDCOINS_EXPLORER_URL + '/tx/' + tx.BlockchainTxHash}>View on blockchain</a>
						</p>
          </div>

      );
      if (wallet.Address === tx.ToAddress) {
        ftx.Credit = numeral(tx.Amount).format('0,0');
      }
      else {
        ftx.Debit =numeral(tx.Amount).format('0,0');
      }

      ftx.TxStatus = (tx.TxStatus === 'SUCCESSFUL' ? 'confirmed' : 'processing');

      var initiatedDate = new Date(tx.InitiatedOn);
      var endedDate = (tx.EndedOn ? new Date(tx.EndedOn) : '')

      var initiatedOn = dateformat(initiatedDate, 'mmm d, yyyy HH:MM:ss');
      var endedOn = endedDate ? dateformat(endedDate, 'mmm d, yyyy HH:MM:ss') : 'processing...';

      ftx.Date = (
        <div>
          <label>Initiated on:</label>
          <p>{initiatedOn}</p>

          <label>Ended on:</label>
          <p>{endedOn}</p>
        </div>
      )

      return ftx;
		})
	}
	
	formatIssuingTXs(txs) {
		var self = this;

		return txs.map(function(tx) {
			var t = {};
			t.TxID = tx.TxID;
			t.TxType = tx.TxType;
			t.AssetCode = tx.AssetCode;
			t.Amount = numeral(tx.Amount).format('0,0');
			t.Timestamp = dateformat(tx.InitiatedOn, 'mmm d, yyyy HH:MM:ss');
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
							selectedTxID: tx.TxID,
							selectedTx: t
						});
					}}>
  	   			{
							self.state.updatingTxIDs[tx.TxID] ?
  	       		<Spinner /> :	<span>SIGN & ISSUE</span>
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

	formatTransferTXs(txs) {
		var self = this;
		return txs.map(function(tx) {
			var t = {};
			t.TxID = tx.ID;
			t.Type = tx.TxType;
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
								selectedTx: t
							});
						}}>
     		   	{
							self.state.updatingTxIDs[tx.ID] ?
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
    const { TXs, AssetIssuingTXs, BatchAssetTXs, wallet } = this.props;

		return (
      <div className="asset-summary">
				<div className="container-fluid">
					<InputModal
						title={
							this.state.btnAction === 'cancel' ?
								"Order Cancellation" : "Asset Issuance Signing"
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

								var updatingTxIDs = Object.assign({}, this.state.updatingTxIDs);
								updatingTxIDs[this.state.selectedTxID] = true;
								this.setState({updatingTxIDs: updatingTxIDs});

								if (this.state.selectedTx.TxType === 'ISSUANCE'){
									this.props.SignAndSendAssetIssuance({
										txID: this.state.selectedTxID, 
										wallet: wallet, 
										pwd: this.state.pwd
									});
								}
								else {
									this.props.SignAndSendBatchAssetTransfer({
										txID: this.state.selectedTxID, 
										wallet: wallet, 
										pwd: this.state.pwd
									});
								}
							}
						}}
					/>

					{
						AssetIssuingTXs && AssetIssuingTXs.length > 0 &&
						<div>	

							<div className="row">
								<div className="col-md-10 col-md-offset-1">
									<h4>ISSUANCE TXs</h4>	
								</div>
							</div>
	
							<div className="row">
								<div className="col-md-10 col-md-offset-1">
  					      <div>
										<BootstrapTable 
											data={this.formatIssuingTXs(AssetIssuingTXs)} 
											striped={true} hover={true} 
											className="table" 
											pagination={false} 
											tableStyle={{border: 'none'}}>
											<TableHeaderColumn isKey={true} dataField="TxID" width="125px"></TableHeaderColumn>
											<TableHeaderColumn dataField="AssetCode" width="125px"></TableHeaderColumn>
											<TableHeaderColumn dataField="Amount" width="125px"></TableHeaderColumn>
											<TableHeaderColumn dataField="Timestamp" width="125px"></TableHeaderColumn>
											<TableHeaderColumn 
												dataField="Btn"
												width="100">
											</TableHeaderColumn>
  					        </BootstrapTable>
  					      </div>
  					    </div>
							</div>
						</div>
					}			

					<br /><br />
				
					{BatchAssetTXs && BatchAssetTXs.length > 0 &&
						<div>
							<div className="row">
								<div className="col-md-10 col-md-offset-1">
									<h4>BATCH TRANSFER TXs</h4>	
								</div>
							</div>

							<div className="row">
  					    <div className="col-md-10 col-md-offset-1">
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
						</div>
					}		

					<br /><br />

					{TXs && TXs.length > 0 &&
						<div>
							<div className="row">
								<div className="col-md-10 col-md-offset-1">
									<h4>ALL TXs</h4>	
								</div>
							</div>

	        	  <div className="row">
	        	    <div className="col-md-10 col-md-offset-1">
          	      <BootstrapTable data={this.formatTXs(TXs)} striped={true} hover={true} className="table" pagination={true}>
          	        <TableHeaderColumn dataField="TxID" isKey={true} dataAlign="center" dataSort={true} width="145px">TxID</TableHeaderColumn>
          	        <TableHeaderColumn dataField="TxType" width="55px">Type</TableHeaderColumn>
          	        <TableHeaderColumn dataField="Ref" dataFormat={this.format}>Reference</TableHeaderColumn>
          	        <TableHeaderColumn dataField="AssetCode" width="60px">Code</TableHeaderColumn>
          	        <TableHeaderColumn dataField="Credit" width="75px">Credit</TableHeaderColumn>
          	        <TableHeaderColumn dataField="Debit" width="75px">Debit</TableHeaderColumn>
          	        <TableHeaderColumn dataField="TxStatus" width="90px">Status</TableHeaderColumn>
          	        <TableHeaderColumn dataField="Date" width="150px">Date</TableHeaderColumn>
          	      </BootstrapTable>
          	    </div>
							</div>
						</div>
					}
				</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    wallet: state.WalletState.wallet,
		TXs: state.AssetState.AssetTXs,
		AssetIssuingTXs: state.AssetState.AssetIssuingTXs,
		BatchAssetTXs: state.AssetState.BatchAssetTXs,
		AssetTXUpdated: state.AssetState.AssetTXUpdated
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
		FetchAssetTxs: FetchAssetTxs,
		FetchAssetIssuingTXs: FetchAssetIssuingTXs,
		FetchBatchAssetTransferTXs: FetchBatchAssetTransferTXs,
		SignAndSendBatchAssetTransfer: SignAndSendBatchAssetTransfer,
		SignAndSendAssetIssuance: SignAndSendAssetIssuance
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AssetSummary);
