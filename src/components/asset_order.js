import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Timeline from './timeline';
import AssetOrderNew from './asset_order_new';
import { FetchAssetBalances } from '../actions/asset_action';

class AssetOrder extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			milestones: [
				{task: "SELL ORDER", status: "complete"},
				{task: "BUYER PAYING", status: "complete"},
				{task: "PAYMENT CONFIRMED", status: "complete"},
				{task: "FUND LOCKED", status: "complete"},
				{task: "TOKEN TRANSFERRED", status: ""},
				{task: "TRANSFER CONFIRMED", status: ""},
				{task: "SELLER's PAID", status: ""},
				{task: "TRADE COMPLETED", status: ""}
			],
			type: '',
			assetCode: '',
			assetDesc: '',
			logoUrl: '',
			amount: '',
			price: '',
			total: ''
		};

	}

	componentWillMount() {
		this.props.FetchAssetBalances();	
	}
	
	render() {
		const { ext, AssetBalances } = this.props;

		if (ext === 'new' && !AssetBalances) {
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
				
				{
					ext === 'new' &&
						<AssetOrderNew
							type={this.state.type}
							assetCode={this.state.assetCode}
							assetDesc={this.state.assetDesc}
							logoUrl={this.state.logoUrl}
							amount={this.state.amount}
							price={this.state.price}
							total={this.state.total}
							buyingAssets={[]} 
							sellingAssets={this.props.AssetBalances}	
							onInputChange={content => this.setState(content)}
						/>
				}
				<div>
					<button
          	className="btn btn-primary btn-green btn-green-primary"
						onClick={() => {
            	console.log(this.state);
            }}>
          	Next
          </button>

				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		ext : state.router.params.orderExt,
		AssetBalances: state.AssetState.AssetBalances
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    FetchAssetBalances: FetchAssetBalances
	}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AssetOrder);
