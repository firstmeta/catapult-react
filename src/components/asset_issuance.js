import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AssetIssuanceForm from './asset_issuance_form';
import AssetIssuanceConfirm from './asset_issuance_confirm';
import AssetIssuanceResult from './asset_issuance_result';

class AssetIssuance extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { step } = this.props;

    return (
      <div className="asset-issuance">
        {!step && <AssetIssuanceForm />}
        {step === 'confirmation' && <AssetIssuanceConfirm />}
        {step === 'result' && <AssetIssuanceResult />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    step: state.router.location.query.step
  }
}

export default connect(mapStateToProps)(AssetIssuance);
