import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FetchAssetBalances } from '../actions/asset_action';
import AssetTransferForm from './asset_transfer_form';
import AssetTransferConfirm from './asset_transfer_confirm';
import AssetTransferResult from './asset_transfer_result';

class AssetTransfer extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.FetchAssetBalances();
  }

  render() {
    const { step } = this.props;

    return (
      <div className="asset-transfer">
        {!step && <AssetTransferForm />}
        {step === 'confirmation' && <AssetTransferConfirm />}
        {step === 'result' && <AssetTransferResult />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    step: state.router.location.query.step
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchAssetBalances: FetchAssetBalances
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetTransfer);
