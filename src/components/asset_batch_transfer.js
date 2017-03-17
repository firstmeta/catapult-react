import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Search from './search';
import AssetBatchTransferForm from './asset_batch_transfer_form';
import AssetBatchTransferConfirm from './asset_batch_transfer_confirm';

class AssetBatchTransfer extends Component {

	constructor(props){
		super(props);
	}

	render() {
		const { step } = this.props;

		return (
			<div className="asset-batch-transfer">
				{!step && <AssetBatchTransferForm />}
				{step === 'confirmation' && <AssetBatchTransferConfirm />}
			</div>	
		)
	}
}

function mapStateToProps(state) {
  return {
    step: state.router.location.query.step
  }
}

export default connect(mapStateToProps)(AssetBatchTransfer);
