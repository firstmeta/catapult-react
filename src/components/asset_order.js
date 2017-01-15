import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import Timeline from './timeline';
import AssetOrderNew from './asset_order_new';
import AssetOrderConfirm from './asset_order_confirm';
import AssetOrderSuccess from './asset_order_success';
import { FetchAllAssets, FetchAssetBalances } from '../actions/asset_action';
import { OpenOrder } from '../actions/trading_action';
import Alert from './global_alert';
import InputModal from './asset_order_confirm_password';

class AssetOrder extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			milestones: [
				{task: "ORDER", status: "complete"},
				{task: "BUYER PAYING", status: "complete"},
				{task: "PAYMENT CONFIRMED", status: "complete"},
				{task: "FUND LOCKED", status: "complete"},
				{task: "TOKEN TRANSFERRED", status: ""},
				{task: "TRANSFER CONFIRMED", status: ""},
				{task: "SELLER's PAID", status: ""},
				{task: "TRADE COMPLETED", status: ""}
			],
			type: 'sell',
			assetCode: '',
			assetName: '',
			assetDesc: '',
			logoUrl: '',
			amount: '',
			price: '',
			total: '',
			moneyCode: 'SGD',
			showModal: false,
			pwd: ''
		};

	}

	componentWillMount() {
		this.props.FetchAssetBalances();
		if (!this.props.AllAssets) {
			this.props.FetchAllAssets();
		}
	}
	
	render() {
		const { ext, AllAssets, AssetBalances, OpenOrderResult } = this.props;

		if (ext === 'new' && (!AssetBalances || !AllAssets)) {
			return <div></div>
		}
		return (
			<div className="asset-order">
				<div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
							<Timeline milestones={this.state.milestones} />	
            </div>
          </div>
				</div>
				
				<Alert />
				<InputModal
					title="Password required"
					msg="You are about to make payment for this transaction. 
					Please make sure your Xfers account has enough money including Xfers's fee."
					inputLabel="Please enter your login password to proceed."
					value={this.state.pwd}
					inputCapture={pwd => this.setState({pwd: pwd})}
					show={this.state.showModal} 
					close={() => this.setState({showModal: false})} 
					btnFun={() => {
						const {type, assetCode, amount, price, total, moneyCode, pwd} = this.state;
						this.props.OpenOrder({type, assetCode, amount, price, total, moneyCode, pwd});
					}}/>

				{
					ext === 'new' &&
						<AssetOrderNew
							type={this.state.type}
							assetCode={this.state.assetCode}
							assetName={this.state.assetName}
							assetDesc={this.state.assetDesc}
							logoUrl={this.state.logoUrl}
							amount={this.state.amount}
							price={this.state.price}
							total={this.state.total}
							moneyCode={this.state.moneyCode}
							buyingAssets={this.props.AllAssets} 
							sellingAssets={this.props.AssetBalances}	
							onInputChange={content => this.setState(content)}
						/>
				}
				{
					ext === 'confirm' && 
						<AssetOrderConfirm 
							type={this.state.type}
							assetCode={this.state.assetCode}
							assetName={this.state.assetName}
							assetDesc={this.state.assetDesc}
							logoUrl={this.state.logoUrl}
							amount={this.state.amount}
							price={this.state.price}
							total={this.state.total}
							moneyCode={this.state.moneyCode}
						/>
				}
				{
					ext === 'success' &&
						<AssetOrderSuccess
							type={this.state.type}
							assetName={this.state.assetName}
							amount={this.state.amount}
							price={this.state.price}
							moneyCode={this.state.moneyCode}
							orderid={OpenOrderResult.Txid}
						/>

				}

				<div className="container-fluid">
						<div className="row row-centered">
							<div className="col-lg-1 col-centered">
								{
									ext === 'new' &&
										<Link to={"/asset/order/confirm"}>
              	 			<button
												className="
												btn btn-primary btn-light-green 
												btn-light-green-primary full-width" >
              	 				REVIEW TO CONFIRM 
											</button>
										</Link>

								}	
								{
									ext === 'confirm' &&
										<div>
											<Link to={"/asset/order/confirm"}>
              	 				<button
													className="
													btn btn-primary btn-light-green 
													btn-light-green-primary full-width btn-confirm"
													onClick={() => {
														const {
															type, assetCode, amount, 
															price, total, moneyCode, pwd
														} = this.state;
														if(type === 'buy') {
															this.setState({showModal: true})
														}
														else {this.props.OpenOrder({
															type, assetCode, amount, price, total, moneyCode, pwd})}
													}}>
              	 					CONFIRM  
												</button>
											</Link>
											<br /><br />
											<center>
												<Link to={"/asset/order/new"}>
              	 					<button
														className="btn btn-primary btn-red btn-red-primary btn-cancel">
              	 						CANCEL  
													</button>
												</Link>
											</center>
										</div>
								}	
								{
									ext === 'success' &&
										<Link to={"/mytransaction/trade"}>
              	 			<button
												className="
												btn btn-primary btn-light-green 
												btn-light-green-primary full-width" >
              	 				GO TO MY TRANSACTION SUMMARY 
											</button>
										</Link>

								}	

						  </div>
            </div>

				</div>

			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		ext : state.router.params.orderExt,
		AllAssets: state.AssetState.AllAssets,
		AssetBalances: state.AssetState.AssetBalances,
		OpenOrderResult: state.TradingState.OpenOrderResult
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		FetchAssetBalances: FetchAssetBalances,
		FetchAllAssets: FetchAllAssets,
		OpenOrder: OpenOrder
	}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AssetOrder);
