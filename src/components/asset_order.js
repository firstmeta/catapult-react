import React, { Component } from 'react';
import Timeline from './timeline';

class AssetOrder extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			milestones: [
				{task: "ORDER", status: "complete"},
				{task: "ORDER MATCHING", status: "complete"},
				{task: "TRADE AGREEMENT", status: "complete"},
				{task: "BUYER PAYMENT", status: "complete"},
				{task: "FUND LOCKED", status: "complete"},
				{task: "TOKEN TRANSFER", status: ""},
				{task: "SELLER's PAID", status: ""},
				{task: "TRADE COMPLETED", status: ""}
			] 	
		}
	}	

	render() {
		return (
			<div className="asset-order">
				<Timeline milestones={this.state.milestones} />	
			</div>	
		);
	}
}

export default AssetOrder;
