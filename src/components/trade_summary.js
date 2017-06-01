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
	FetchAllMyOpenOrder, 
	FetchAllMyDealingOrder,
	FetchAllMyFilledOrCancelledOrders,
	FetchAllMyPreparedSigningOrders,
	SignAndTransferTokenForOrder,
	CancelOpenedOrder
} from '../actions/trading_action';

class TradeSummary extends Component {
	constructor(props) {
		super(props);

		this.formatOrders = this.formatOrders.bind(this);

		this.state = { 
			showModal: false, 
			showModalSpinner: false, 
			pwd: '',
			selectedOrder: '',
			selectedOrderId: '', 
			selectedOrderType: '',
			btnAction: '',
			updatingOrderId: '',
			updatingOrders: {}
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.OrderUpdated) {
			var updatingOrders = Object.assign({}, this.state.updatingOrders);
			delete updatingOrders[nextProps.OrderUpdated.orderid];
			this.setState({updatingOrders: updatingOrders});
		}	
	}

	componentWillMount() {
		this.props.FetchAllMyPreparedSigningOrders();
		this.props.FetchAllMyDealingOrder();
		this.props.FetchAllMyOpenOrder();
		this.props.FetchAllMyFilledOrCancelledOrders();
		if(!this.props.Wallet.ID) {
      this.props.FetchWallet();
    }
	}

	formatOrders(orders) {
		var self = this;
		return orders.map(function(order){

			var o = {};
			o.RowKey = order.OrderId;
			o.OrderId = (
				<div className="tooltip-custom">
					{order.OrderId.substring(0,6)}
					<span className="tooltiptext">
						{order.OrderId}
					</span>
				</div>	
			);
			o.OrderType = (order.OrderType === 'SELLASSET' ? 'SELL' : 'BUY');
			o.AssetCode = (
				<div>
					<img src={order.AssetLogoUrl} className="img-circle" /> {order.AssetCode} 
				</div>
			);
			o.AssetAmount = order.AssetAmount;
			o.MoneyCode = order.MoneyCode;
			o.MoneyGross = o.MoneyCode + ' ' + numeral(parseFloat(order.MoneyNet) + parseFloat(order.MoneyFee)).format('0,0.00');
			o.Price = o.MoneyCode + ' ' + numeral(order.PriceGross).format('0,0.00');
			
			switch(order.OrderStatus) {
				case 'BC_FEE_FUNDED':
					o.OrderStatus = 'SIGNING READY';
					break;
				case 'BLKCONFIRMING':
					o.OrderStatus = 'CONFIRMING';
					break;
				default:
					o.OrderStatus = order.OrderStatus;
			}
			
			if (order.LastUpdatedOn) {
				o.LastUpdatedOn = dateformat(order.LastUpdatedOn, 'mmm d, yyyy HH:MM:ss');
			}
			if (order.OrderStatus === 'OPENED') {
				o.Cancel = (
					<button
						className="btn btn-primary btn-red btn-red-primary btn-cancel"
						onClick={() => {
							self.setState({
								btnAction: 'cancel', 
								showModal: true, 
								selectedOrderId: order.OrderId,
								selectedOrderType: (order.OrderType === 'SELLASSET' ? 'sell' : 'buy') 
							});
						}}>
						{
							self.state.updatingOrders[order.OrderId] ?
          		<Spinner /> :	<span>CANCEL</span>
						}  
					</button>
				);
				o.CreatedOn = dateformat(order.CreatedOn, 'mmm d, yyyy HH:MM:ss');
			}
			if(order.OrderStatus === 'SIGNING_READY') {
				if((order.OrderType === 'SELLASSET' && order.IsCreator) 
					|| (order.OrderType === 'BUYASSET' && !order.IsCreator)) {
					o.Btn = (
						<button
							className="btn btn-primary btn-yellow btn-yellow-primary"
							onClick={() => {
								self.setState({
									btnAction: 'signsend', 
									showModal: true, 
									selectedOrder: order,
									selectedOrderId: order.OrderId
								});
							}}>
     		   		{
								self.state.updatingOrders[order.OrderId] ?
          			<Spinner /> :	<span>SIGN & SEND</span>
							}   
						</button>
					)
				}
				else {
					o.Btn = <i>Wait for transfer...</i>
				}
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
		const { 
			SigningOrders, OpenOrders, DealingOrders, FilledCancelledOrders, OrderUpdated, Wallet  
		} = this.props;

		if (!OpenOrders && !DealingOrders && !SigningOrders){ 
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
						title={
							this.state.btnAction === 'cancel' ?
								"Order Cancellation" : "Asset Transfer Signing"
						}
						msg={
							this.state.btnAction === 'cancel' ?
								"Please confirm your cancelling order: " + this.state.selectedOrderId
								:"You are about to sign and transfer your asset. Please make sure the details is correct."
						}
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

							this.setState({showModal: false, updatingOrderId: this.state.selectedOrderId});

							if (this.state.btnAction === 'cancel') {
								this.props.CancelOpenedOrder({
									orderid: this.state.selectedOrderId, 
									orderType: this.state.selectedOrderType
								});	
							}
							else if (this.state.btnAction === 'signsend') {
								var updatingOrders = Object.assign({}, this.state.updatingOrders);
								updatingOrders[this.state.selectedOrderId] = true;
								this.setState({updatingOrders: updatingOrders});

								this.props.SignAndTransferToken({
									order: this.state.selectedOrder,
									orderid: this.state.selectedOrderId, 
									wallet: Wallet, 
									pwd: this.state.pwd
								});
							}
						}}
					/>

					{SigningOrders && SigningOrders.length > 0 &&
							(<div>
								<div className="row">
									<div className="col-md-10 col-md-offset-1">
										<h4>PREPARED SIGNING ORDERS</h4>	
									</div>
								</div>
								<div className="row">
        			    <div className="col-md-10 col-md-offset-1">
        			      <div>


											<BootstrapTable 
												data={this.formatOrders(SigningOrders)} 
												striped={true} hover={true} 
												className="table" 
												pagination={true} 
												options={{sizePerPage: 5}}
												tableStyle={{border: 'none'}}>

												<TableHeaderColumn dataField="RowKey" isKey={true} dataAlign="center" hidden></TableHeaderColumn>
												<TableHeaderColumn dataField="OrderId" dataAlign="center" dataSort={true} width="65px">
													Order ID
												</TableHeaderColumn>
        			          <TableHeaderColumn dataField="OrderType" width="55px">Type</TableHeaderColumn>
        			          <TableHeaderColumn dataField="AssetCode" width="100px">Asset Type</TableHeaderColumn>
        			          <TableHeaderColumn dataField="AssetAmount" width="75px">Volume</TableHeaderColumn>
        			          <TableHeaderColumn dataField="Price" width="75px">$Price</TableHeaderColumn>
        			          <TableHeaderColumn dataField="MoneyGross" width="85px">$Total</TableHeaderColumn>
        			          <TableHeaderColumn dataField="OrderStatus" width="90px">Status</TableHeaderColumn>
												<TableHeaderColumn dataField="LastUpdatedOn" width="125px">Last Update</TableHeaderColumn>
												<TableHeaderColumn 
													dataField="Btn"
													width="100"></TableHeaderColumn>
        			        </BootstrapTable>
        			      </div>
        			    </div>
								</div>
							</div>)}

					<br /> 

					{DealingOrders && DealingOrders.length > 0 &&
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
												data={this.formatOrders(DealingOrders)} 
												striped={true} hover={true} 
												className="table" 
												pagination={true} 
												options={{sizePerPage: 5}}
												tableStyle={{border: 'none'}}>
												<TableHeaderColumn dataField="RowKey" isKey={true} hidden></TableHeaderColumn>
        			          <TableHeaderColumn dataField="OrderId" dataAlign="center" dataSort={true} width="65px">Order ID</TableHeaderColumn>
        			          <TableHeaderColumn dataField="OrderType" width="55px">Type</TableHeaderColumn>
        			          <TableHeaderColumn dataField="AssetCode" width="100px">Asset Type</TableHeaderColumn>
        			          <TableHeaderColumn dataField="AssetAmount" width="75px">Volume</TableHeaderColumn>
        			          <TableHeaderColumn dataField="Price" width="75px">$Price</TableHeaderColumn>
        			          <TableHeaderColumn dataField="MoneyGross" width="85px">$Total</TableHeaderColumn>
        			          <TableHeaderColumn dataField="OrderStatus" width="90px">Status</TableHeaderColumn>
												<TableHeaderColumn dataField="LastUpdatedOn" width="125px">Last Update</TableHeaderColumn>
												<TableHeaderColumn 
													dataField="Btn"
													width="100"></TableHeaderColumn>
        			        </BootstrapTable>
        			      </div>
        			    </div>
								</div>
							</div>)}

					<br /> 

					{OpenOrders && OpenOrders.length > 0 &&
						(<div>
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
												<TableHeaderColumn dataField="RowKey" isKey={true} hidden></TableHeaderColumn>
        		          <TableHeaderColumn dataField="OrderId" dataAlign="center" dataSort={true} width="65px">Order ID</TableHeaderColumn>
        		          <TableHeaderColumn dataField="OrderType" width="55px">Type</TableHeaderColumn>
        		          <TableHeaderColumn dataField="AssetCode" width="100px">Asset Type</TableHeaderColumn>
        		          <TableHeaderColumn dataField="AssetAmount" width="75px">Volume</TableHeaderColumn>
        		          <TableHeaderColumn dataField="Price" width="75px">$Price</TableHeaderColumn>
        		          <TableHeaderColumn dataField="MoneyGross" width="85px">$Total</TableHeaderColumn>
        		          <TableHeaderColumn dataField="OrderStatus" width="90px">Status</TableHeaderColumn>
											<TableHeaderColumn dataField="CreatedOn" width="125px">Created On</TableHeaderColumn>
											<TableHeaderColumn dataField="Cancel" width="100"></TableHeaderColumn>
									</BootstrapTable>
        		     </div>
        		   </div>
						</div>
					</div>)}
					
					<br />

					{FilledCancelledOrders && FilledCancelledOrders.length > 0 &&
						(<div>
							<div className="row">
								<div className="col-md-10 col-md-offset-1">
									<h4>COMPLETED / CANCELLED ORDERS</h4>	
								</div>
							</div>
        		  <div className="row">
        		    <div className="col-md-10 col-md-offset-1">
        		      <div>
										<BootstrapTable 
											data={this.formatOrders(FilledCancelledOrders)} 
											striped={true} hover={true} 
											className="table" 
											pagination={true} 
											options={{sizePerPage: 5}}
											tableStyle={{border: 'none'}}>
												<TableHeaderColumn dataField="RowKey" isKey={true} hidden></TableHeaderColumn>
        		          <TableHeaderColumn dataField="OrderId" dataAlign="center" dataSort={true} width="65px">Order ID</TableHeaderColumn>
        		          <TableHeaderColumn dataField="OrderType" width="55px">Type</TableHeaderColumn>
        		          <TableHeaderColumn dataField="AssetCode" width="100px">Asset Type</TableHeaderColumn>
        		          <TableHeaderColumn dataField="AssetAmount" width="75px">Volume</TableHeaderColumn>
        		          <TableHeaderColumn dataField="Price" width="55px">$Price</TableHeaderColumn>
        		          <TableHeaderColumn dataField="MoneyGross" width="65px">$Total</TableHeaderColumn>
        		          <TableHeaderColumn dataField="OrderStatus" width="90px">Status</TableHeaderColumn>
											<TableHeaderColumn dataField="LastUpdatedOn" width="125px">Last Update</TableHeaderColumn>
											<TableHeaderColumn dataField="Cancel" width="100"></TableHeaderColumn>
									</BootstrapTable>
        		     </div>
        		   </div>
						</div>
					</div>)}

        </div>
      </div>
    )

	}
}

function mapStateToProps(state) {
	return {
		OpenOrders: state.TradingState.AllMyOpenOrders,
		DealingOrders: state.TradingState.AllMyDealingOrders,
		SigningOrders: state.TradingState.AllMyPreparedSigningOrders,
		FilledCancelledOrders: state.TradingState.AllMyFilledCancelledOrders,
		AssetTransferPrep: state.TradingState.OrderAssetTransferPrep,
		Wallet: state.WalletState.wallet,
		OrderUpdated: state.TradingState.OrderUpdated
	}
} 
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		FetchAllMyOpenOrder: FetchAllMyOpenOrder,
		FetchAllMyDealingOrder: FetchAllMyDealingOrder,
		FetchAllMyPreparedSigningOrders: FetchAllMyPreparedSigningOrders,
		FetchAllMyFilledOrCancelledOrders: FetchAllMyFilledOrCancelledOrders,
		SignAndTransferToken: SignAndTransferTokenForOrder,
		FetchWallet: FetchWallet,
		CancelOpenedOrder: CancelOpenedOrder
	}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(TradeSummary);

