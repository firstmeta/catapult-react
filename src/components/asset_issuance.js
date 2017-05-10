import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import dateformat from 'dateformat';
import numeral from 'numeral';

import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import Alert from './global_alert';
import Spinner from './spinner';
import InputModal from './input_modal';

import AssetIssuanceForm from './asset_issuance_form';
import AssetIssuanceConfirm from './asset_issuance_confirm';
import AssetIssuanceResult from './asset_issuance_result';

import { FetchWallet } from '../actions/wallet_action';

class AssetIssuance extends Component {
  constructor(props) {
		super(props);
		this.state = {
			showModal: false, 
			showModalSpinner: false, 
			pwd: '',
			selectedTxID: '',
			updatingTxID: ''
		}
	}

	componentWillMount() {
		if(!this.props.Wallet) {
      this.props.FetchWallet();
    }
	}

  render() {
    const { step, AssetIssuingTXs, Wallet } = this.props;

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
		step: state.router.location.query.step,
		Wallet: state.WalletState.wallet
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		FetchWallet: FetchWallet
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetIssuance);
