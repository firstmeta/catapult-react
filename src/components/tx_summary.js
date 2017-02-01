import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import AssetSummary from './asset_summary';
import TradeSummary from './trade_summary';
import FinanceSummary from './finance_summary';
import { FetchWallet } from '../actions/wallet_action';
import { FetchAssetBalances } from '../actions/asset_action';

import Spinner from './spinner';

class TransactionSummary extends Component {
	constructor(props) {
		super(props);
	}
	
	componentWillMount() {
    if(!this.props.walletFetched) {
      this.props.FetchWallet();
    }
    this.props.FetchAssetBalances();
  }

	render() {
    const { urlRef } = this.props;
		return (
			<div className="tx-summary">
				<div className="container-fluid">
					<div className="row header">
            <div className="col-md-10 col-md-offset-1">
              <h1>Transaction Summary</h1>
              <ul className="nav nav-pills">
                <li
                  role="presentation"
                  className={(!urlRef || urlRef === 'assets') ? "active" : ""}>
                  <Link to="/transaction-summary/assets">Assets</Link>
                </li>
                <li
									role="presentation"
                  className={(urlRef === 'trades') ? "active" : ""}>
									<Link to="/transaction-summary/trades">Trades</Link>
                </li>
                <li
									role="presentation"
                  className={(urlRef === 'finance') ? "active" : ""}>
                  <Link to="/transaction-summary/finance">Finance</Link>
                </li>
              </ul>
            </div>
          </div>

				</div>

				{urlRef === 'trades' && <TradeSummary />}
				{urlRef === 'assets' && <AssetSummary />}
				{urlRef === 'finance' && <FinanceSummary />}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		urlRef: state.router.params.urlRef
	}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchWallet: FetchWallet,
    FetchAssetBalances: FetchAssetBalances
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSummary);
