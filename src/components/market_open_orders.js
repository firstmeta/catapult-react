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

class MarketOpenOrders extends Component {
	constructor(props){
		super(props);

		this.formatOrders = this.formatOrders.bind(this);
		
		this.state = { showModal: false, pwd: '', selectedOrderId: '' };
	}

	componentWillMount() {
		this.props.FetchCompany(this.props.AssetCode);
		this.props.FetchAllOpenOrders(this.props.AssetCode, 'sell');
		this.props.FetchAllOpenOrders(this.props.AssetCode, 'buy');
	}

	formatOrders(orders) {
		var self = this;
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
							self.setState({selectedOrderId: order.OrderId, showModal: true})
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
							self.setState({selectedOrderId: order.OrderId, showModal: true})
						}}>
         		BUY  
					</button>
				) 
			}

			return o;
		})
	}

	render() {
		const { Company, SellOrders, BuyOrders } = this.props;
		
		if(!SellOrders && !BuyOrders) {
			return (
				<div className="market-open-orders">
					<div className="container-fluid">
        	  <div className="row row-centered">
        	    <div className="col-lg-1 col-centered">
        	   		<h1>{Company ? Company.CompanyName : ''} Trading</h1>
							</div>
							<Spinner />
        	  </div>
        	</div>
				</div>	
			)
		}
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
					title="Asset Transfer Signing"
					msg="You are about to sign and transfer your asset. 
					Please make sure the details is correct."
					inputLabel="Please enter your decryption password to proceed."
					value={this.state.pwd}
					inputCapture={pwd => this.setState({pwd: pwd})}
					show={this.state.showModal} 
					showSpinner={false}
					close={() => this.setState({showModal: false})}
					styleName={'tx-summary-input-modal'}
					btnFun={() => {
						this.props.MakeBuyAssetOffer({
							orderid: this.state.selectedOrderId, 
							pwd:this.state.pwd});
					}}
				/>
				<br /><br />
				<div className="container-fluid">
					<Alert />
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
    Company: state.CompanyState.companyDetails
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		FetchAllOpenOrders: FetchAllOpenOrders,
		MakeBuyAssetOffer: MakeBuyAssetOffer,
		FetchCompany: FetchCompanyByAssetCode
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketOpenOrders);
