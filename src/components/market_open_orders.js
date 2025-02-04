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
import { ROOT_IMAGE_URL } from '../config';
import { CountryMap } from './countries';
import { FetchAllOpenOrders, MakeBuyAssetOffer } from '../actions/trading_action';
import { FetchCompanyByAssetCode } from '../actions/company_action';
import { FetchWallet } from '../actions/wallet_action';
import { AlertGlobal, ALERT_ERROR } from '../actions/alert_action';
import {
	AcceptBuyAssetOrder
} from '../actions/trading_action';

class MarketOpenOrders extends Component {
	constructor(props){
		super(props);

		this.formatOrders = this.formatOrders.bind(this);
		
		this.state = { 
			showModal: false, 
			showModalSpinner: false,
			pwd: '', 
			selectedOrderId: '', 
			selectedOrderType: '' 
		};
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.OrderUpdated.orderid === this.state.selectedOrderId) {
			this.setState({showModalSpinner: false, showModal: false, selectedOrderId: ''});
		}
	}

	componentWillMount() {
		this.props.FetchCompany(this.props.AssetCode);
		this.props.FetchAllOpenOrders(this.props.AssetCode, 'sell');
		this.props.FetchAllOpenOrders(this.props.AssetCode, 'buy');
		if(!this.props.Wallet.ID) {
      this.props.FetchWallet();
    }
	}


	formatOrders(orders) {
		var self = this;
		var walletCreationAlert = (
			<div>
				Please create an&nbsp;
				<Link 
					to="/settings/wallet" 
					style={{
						"text-decoration": "underline",
						"color": "#a94442",
						"font-style": "italic"}}>
					Asset Wallet
				</Link> 
					&nbsp;before making trade.	
			</div>
		);

		return orders.map(function(order) {
			var o = {};
			o.OrderId = order.OrderId;
			o.AssetAmount = order.AssetAmount;
			o.MoneyTotal = numeral(order.MoneyNet).format('0,0.00') + ' ' + order.MoneyCode;
			o.Price = numeral(order.MoneyNet / order.AssetAmount).format('0,0.00') + ' ' + order.MoneyCode;
			if(order.OrderType === 'SELLASSET') {
				o.Btn = (
					<button
						className="btn btn-primary btn-light-green btn-light-green-primary"
						onClick={() => {
							if (!self.props.Wallet.ID) {
								self.props.AlertGlobal({
									content: walletCreationAlert,
									type: ALERT_ERROR
								})
							}
							else {
								self.setState({
									selectedOrderId: order.OrderId,
									selectedOrderType: 'sell',
									showModal: true
								})
							}
						}}>
         		BUY  
					</button>
				) 
			}
			if(order.OrderType === 'BUYASSET') {
				o.Btn = (
					<button
						className="btn btn-primary btn-blue btn-blue-primary"
						onClick={() => {
							if (!self.props.Wallet.ID) {
								self.props.AlertGlobal({
									content: walletCreationAlert,
									type: ALERT_ERROR
								})
							}
							else {
								self.setState({
									selectedOrderId: order.OrderId, 
									selectedOrderType: 'buy',
									showModal: true
								})
							}
						}}>
         		SELL  
					</button>
				) 
			}

			return o;
		})
	}

	render() {
		const { Company, SellOrders, BuyOrders, Wallet } = this.props;
		
		return (
			<div className="market-open-orders">
				<div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
        	   	<h1>{Company ? Company.CompanyName : ''} Trading</h1>
            </div>
          </div>
        </div>
				
				<InputModal
					title={
						this.state.selectedOrderType === 'sell' ? 
							'Payment' :  'Asset Transfer'
					}
					msg={
						this.state.selectedOrderType === 'sell' ? 
							"You are about to make payment for this order. Please make sure the OrderID is correct. OrderID: " + this.state.selectedOrderId
							: "You are about to start transfer your asset. Please make sure the OrderID is correct. OrderID: " + this.state.selectedOrderId
					}
					inputLabel={
						this.state.selectedOrderType === 'sell' ? 
							<span>Please enter your <strong><i>login</i></strong> password to proceed.</span>
							: <span>Please enter your <strong><i>decryption</i></strong> password to proceed.</span>
					}
					value={this.state.pwd}
					show={this.state.showModal} 
					showSpinner={this.state.showModalSpinner}
					close={() => this.setState({showModal: false})}
					styleName={'tx-summary-input-modal'}
					btnFun={() => {
						this.setState({showModalSpinner: true});

						if (this.state.selectedOrderType === 'sell'){
							this.props.MakeBuyAssetOffer({
								orderid: this.state.selectedOrderId 
							});
						}
						else {
							this.props.AcceptBuyAssetOrder({
								orderid: this.state.selectedOrderId 
							});
						}
					}}
				/>
				<br /><br />
				<div className="container-fluid">

					<div className="row">
						<div className="col-md-6">
							<div className="market-company">
									<div className="row">
										<div className="col-sm-3">
											<center>
											<img src={ROOT_IMAGE_URL + '/' + Company.ListingImage} className="img-circle"/>
											</center>
										</div>
										<div className="col-sm-9">
											<p className="title">{Company.CompanyName}</p>
											<p>{Company.Industry}, {CountryMap[Company.Country]}</p>
											<p>{Company.Website}</p>
										</div>
									</div>
									<br />
									<div className="row">
										<div className="col-sm-12">
											<span>{Company.DescriptionShort}</span>	
										</div>
									</div>		
								</div>
								<div className="col-md-6">
								</div>
						</div>
					</div>
					<br /><br />
					
					<Alert />
					<br />

					<div className="row">
						<div className="col-md-6">
							<div className="row row-centered">
            		<div className="col-lg-1 col-centered">
									<h4>INVESTMENTS FOR SALE</h4>
           			</div>
          		</div>
							
							{
								(SellOrders && SellOrders.length > 0) ? 
									<BootstrapTable 
										data={this.formatOrders(SellOrders)} 
										striped={true} hover={true} 
										className="table" 
										pagination={true} 
										options={{sizePerPage: 5}}
										tableStyle={{border: 'none'}}>
              		    <TableHeaderColumn dataField="OrderId" isKey={true} dataAlign="center" dataSort={true} width="50px"></TableHeaderColumn>
              		  <TableHeaderColumn dataField="AssetAmount" dataAlign="center" dataSort={true} width="55px">Amount</TableHeaderColumn>
              		  <TableHeaderColumn dataField="Price" width="55px">Price</TableHeaderColumn>
              		  <TableHeaderColumn dataField="MoneyTotal" width="55px">Total $</TableHeaderColumn>
										<TableHeaderColumn 
												dataField="Btn"
												width="100"></TableHeaderColumn>
									</BootstrapTable>
									:
									<div className="no-order">
										<br /><center><i>No order yet...</i></center>
									</div>

							}
							
						</div>
						<div className="col-md-6">
							<div className="row row-centered">
            		<div className="col-lg-1 col-centered">
									<h4>REQUESTS TO BUY</h4>
           			</div>
          		</div>
							{
								(BuyOrders && BuyOrders.length > 0) ? 
									<BootstrapTable 
										data={this.formatOrders(BuyOrders)} 
										striped={true} hover={true} 
										className="table" 
										pagination={true} 
										options={{sizePerPage: 5}}
										tableStyle={{border: 'none'}}>
              		    <TableHeaderColumn dataField="OrderId" isKey={true} dataAlign="center" dataSort={true} width="50px"></TableHeaderColumn>
              		  <TableHeaderColumn dataField="AssetAmount" dataAlign="center" width="55px">Amount</TableHeaderColumn>
              		  <TableHeaderColumn dataField="Price" width="45px">Price</TableHeaderColumn>
              		  <TableHeaderColumn dataField="MoneyTotal" width="55px">Total $</TableHeaderColumn>
										<TableHeaderColumn 
												dataField="Btn"
												width="100"></TableHeaderColumn>
									</BootstrapTable>
									:
									<div><br /><center><i>No order yet...</i></center></div>

							}

							
						</div>
					</div>
					<br />
					<div className="row">
						<div className="col-md-6">
							<div className="row row-centered">
            		<div className="col-lg-1 col-centered">
									<Link to="/asset/order/new">
										<button
											className="btn btn-primary btn-blue btn-blue-primary"
											>
      					   		PLACE SELL ORDER  
										</button>
									</Link>
           			</div>
          		</div>

						</div>
							
						<div className="col-md-6">
							<div className="row row-centered">
            		<div className="col-lg-1 col-centered">
									<Link to="/asset/order/new">
										<button
											className="btn btn-primary btn-light-green btn-light-green-primary"
											>
      					   		PLACE BUY ORDER  
										</button>
									</Link>
           			</div>
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
		AssetCode: state.router.params.assetCode,
		SellOrders: state.TradingState.AllOpenSellOrders,
		BuyOrders: state.TradingState.AllOpenBuyOrders,
		OrderUpdated: state.TradingState.OrderUpdated,
    Company: state.CompanyState.companyDetails,
    Wallet: state.WalletState.wallet
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		FetchAllOpenOrders: FetchAllOpenOrders,
		MakeBuyAssetOffer: MakeBuyAssetOffer,
		FetchCompany: FetchCompanyByAssetCode,
		AcceptBuyAssetOrder: AcceptBuyAssetOrder,
		FetchWallet: FetchWallet,
		AlertGlobal: AlertGlobal
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketOpenOrders);
