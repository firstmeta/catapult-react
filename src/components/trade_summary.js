import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateformat from 'dateformat';
import numeral from 'numeral';
import Spinner from './spinner';
import InputModal from './input_modal';
import Alert from './global_alert';
import { COLOREDCOINS_EXPLORER_URL } from '../config';
import { FetchWallet } from '../actions/wallet_action';
import {
	AcceptBuyAssetOffer,
	FetchAllMyOpenOrder, 
	FetchAllMyDealingOrder ,
	TransferTokenForAssetOrder
} from '../actions/trading_action';

class TradeSummary extends Component {
	constructor(props) {
		super(props);

		this.formatOrders = this.formatOrders.bind(this);

		this.state = { showModal: false, showModalSpinner: true, pwd: '' };
	}

	componentWillMount() {
		this.props.FetchAllMyDealingOrder();
		this.props.FetchAllMyOpenOrder();
		if(!this.props.Wallet.ID) {
      this.props.FetchWallet();
    }

	}

	formatOrders(orders) {
		var self = this;
		return orders.map(function(order){
			var o = {};
			o.OrderId = order.OrderId;
			o.OrderType = (order.OrderType === 'SELLASSET' ? 'SELL' : 'BUY');
			o.AssetCode = (
				<div>
					<img src={order.AssetLogoUrl} className="img-circle" /> {order.AssetCode} 
				</div>
			);
			o.AssetAmount = order.AssetAmount;
			o.MoneyCode = order.MoneyCode;
			o.MoneyNet = numeral(order.MoneyNet).format('0,0');
			o.OrderStatus = (order.OrderStatus === 'BLKCONFIRMING' ? 'CONFIRMING' : order.OrderStatus);
			o.CreatedOn = dateformat(order.CreatedOn, 'mmm d, yyyy HH:MM:ss');
			
			if (order.OrderStatus === 'OPENED') {
				o.Cancel = (
					<button
						className="btn btn-primary btn-red btn-red-primary btn-cancel">
         		CANCEL  
					</button>
				);
			}
			if(order.OrderType === 'SELLASSET' && order.OrderStatus === 'DEALING') {
				o.Btn = (
					<button
						className="btn btn-primary btn-yellow btn-yellow-primary"
						onClick={() => {
							self.setState({showModal: true});
							self.props.AcceptBuyAssetOffer({orderid: order.OrderId});	
						}}>
         			SIGN & SEND  
					</button>
				)
			}
			if(order.OrderStatus === 'BLKCONFIRMING') {
				o.Btn = (
					<a 
						target="_blank" 
						href={COLOREDCOINS_EXPLORER_URL + '/tx/' + order.BlockchainTxHash}>
					<button
						className="btn btn-primary btn-blue btn-blue-primary">
         			EXPLORE  
						</button>
					</a>
				)	
			}
			return o;
		})
	}

	render() {
		const { OpenOrders, DealingOrder, AssetTransferPrep, Wallet  } = this.props;

    if (!OpenOrders || !OpenOrders.length > 0) {
      return (
        <div className="main-panel-spinner">
          <Spinner />
        </div>
      );
    }

    return (
      <div className="trade-summary">
				<div className="container-fluid">
					<Alert />
					<InputModal
						title="Asset Transfer Signing"
						msg="You are about to sign and transfer your asset. 
						Please make sure the details is correct."
						inputLabel="Please enter your decryption password to proceed."
						value={this.state.pwd}
						inputCapture={pwd => this.setState({pwd: pwd})}
						show={this.state.showModal} 
						showSpinner={AssetTransferPrep ? false : true}
						close={() => this.setState({showModal: false})}
						styleName={'tx-summary-input-modal'}
						btnFun={() => {
							var t = AssetTransferPrep;
							this.props.TransferToken({
								wallet: Wallet,
								orderid: t.order_id,
								amount: t.amount,
								assetCode: t.asset_code,
								assetId: t.asset_id,
								blockchainAssetId: t.blockchain_asset_id,
								fromAddr: t.from_addr,
								fromAddrId: t.from_addr_id,
								fromAddrRandId: t.from_addr_rand_id,
								unsignedTxHex: t.prepared_tx,
								coloredOutputIndexes: t.colored_output_indexes,
								toAddr: t.to_addr,
								toAddrId: t.to_addr_id,
								toAddrRandId: t.to_addr_rand_id,
								fundingAddrRandId: t.funding_addr_rand_id,
								pwd: this.state.pwd
							})
						}}
					/>

					{DealingOrder && DealingOrder.length > 0 &&
							(<div>
					<div className="row">
						<div className="col-md-10 col-md-offset-1">
							<h4>DEALING ORDERS</h4>	
						</div>
					</div>
					<div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div>


								<BootstrapTable 
									data={this.formatOrders(DealingOrder)} 
									striped={true} hover={true} 
									className="table" 
									pagination={true} 
									options={{sizePerPage: 5}}
									tableStyle={{border: 'none'}}>
                  <TableHeaderColumn dataField="OrderId" isKey={true} dataAlign="center" dataSort={true} width="145px">TxID</TableHeaderColumn>
                  <TableHeaderColumn dataField="OrderType" width="55px">Type</TableHeaderColumn>
                  <TableHeaderColumn dataField="AssetCode" width="100px">Asset Code</TableHeaderColumn>
                  <TableHeaderColumn dataField="AssetAmount" width="75px">Amount</TableHeaderColumn>
                  <TableHeaderColumn dataField="MoneyCode" width="55px">$</TableHeaderColumn>
                  <TableHeaderColumn dataField="MoneyNet" width="65px">Total$</TableHeaderColumn>
                  <TableHeaderColumn dataField="OrderStatus" width="90px">Status</TableHeaderColumn>
									<TableHeaderColumn dataField="CreatedOn" width="125px">Created On</TableHeaderColumn>
									<TableHeaderColumn 
										dataField="Btn"
										width="100"></TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
					</div>
				</div>
					)}

					<div className="row">
						<div className="col-md-10 col-md-offset-1">
							<h4>OPENED ORDERS</h4>	
						</div>
					</div>
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div>


								<BootstrapTable 
									data={this.formatOrders(OpenOrders)} 
									striped={true} hover={true} 
									className="table" 
									pagination={true} 
									options={{sizePerPage: 5}}
									tableStyle={{border: 'none'}}>
                  <TableHeaderColumn dataField="OrderId" isKey={true} dataAlign="center" dataSort={true} width="145px">TxID</TableHeaderColumn>
                  <TableHeaderColumn dataField="OrderType" width="55px">Type</TableHeaderColumn>
                  <TableHeaderColumn dataField="AssetCode" width="100px">Asset Code</TableHeaderColumn>
                  <TableHeaderColumn dataField="AssetAmount" width="75px">Amount</TableHeaderColumn>
                  <TableHeaderColumn dataField="MoneyCode" width="55px">$</TableHeaderColumn>
                  <TableHeaderColumn dataField="MoneyNet" width="65px">Total$</TableHeaderColumn>
                  <TableHeaderColumn dataField="OrderStatus" width="90px">Status</TableHeaderColumn>
									<TableHeaderColumn dataField="CreatedOn" width="125px">Created On</TableHeaderColumn>
									<TableHeaderColumn dataField="Cancel" width="100"></TableHeaderColumn>
                </BootstrapTable>
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
		OpenOrders: state.TradingState.AllMyOpenOrders,
		DealingOrder: state.TradingState.AllMyDealingOrders,
		AssetTransferPrep: state.TradingState.OrderAssetTransferPrep,
    Wallet: state.WalletState.wallet
	}
} 
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		AcceptBuyAssetOffer: AcceptBuyAssetOffer,
		FetchAllMyOpenOrder: FetchAllMyOpenOrder,
		FetchAllMyDealingOrder: FetchAllMyDealingOrder,
		TransferToken: TransferTokenForAssetOrder,
		FetchWallet: FetchWallet
	}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TradeSummary);
