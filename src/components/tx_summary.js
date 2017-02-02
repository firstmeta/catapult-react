import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import numeral from 'numeral';
import AssetSummary from './asset_summary';
import TradeSummary from './trade_summary';
import FinanceSummary from './finance_summary';
import { FetchWallet } from '../actions/wallet_action';
import { FetchAssetBalances } from '../actions/asset_action';
import { FetchMyEscrowBalances } from '../actions/finance_action';

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
		this.props.FetchMyEscrowBalances();
  }
	
	renderAssetBals() {
    return this.props.AssetBals.map(b => {
      return (
        <div className="row">
          <div className="col-md-8">{b.AssetName}</div>
          <div className="col-md-4">{numeral(b.Amount).format('0,0')}</div>
        </div>
      )
    });
  }
	
	renderEscrowBals() {
    return this.props.EscrowBals.map(b => {
      return (
        <div className="row">
          <div className="col-md-4">{b.AssetMoneyCode}</div>
          <div className="col-md-4">{numeral(b.Amount).format('0,0.00')}</div>
          <div className="col-md-4">{numeral(b.LockedAmount).format('0,0.00')}</div>
        </div>
      )
    });
  }

	render() {
    const { urlRef } = this.props;
		return (
			<div className="tx-summary">
				<div className="container-fluid">
					<div className="row header">
            <div className="col-md-10 col-md-offset-1">
							<h1>Transaction Summary</h1>
							<div className="balance-container">
									{
										this.props.AssetBals &&
                 		 <div className="balances">
                 		   <div className="panel panel-default">
                 		     <div className="panel-heading">
                 		       Asset Balances
                 		     </div>
                 		     <div className="panel-body">
                 		       {this.renderAssetBals()}
                 		     </div>
                 		   </div>
                 		 </div>
									}
									{
										this.props.EscrowBals &&
                 		 <div className="balances">
                 		   <div className="panel panel-default">
                 		     <div className="panel-heading">
                 		       Escrow Balances
                 		     </div>
												 <div className="panel-body">
													<div className="row">
      									    <div className="col-md-4"></div>
      									    <div className="col-md-4">Available</div>
      									    <div className="col-md-4">Hold</div>
      									  </div>

                 		       {this.renderEscrowBals()}
                 		     </div>
                 		   </div>
                 		 </div>
									}
							</div>
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
		urlRef: state.router.params.urlRef,
		AssetBals: state.AssetState.AssetBalances,
		EscrowBals: state.FinanceState.MyEscrowBalances
	}
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchWallet: FetchWallet,
		FetchAssetBalances: FetchAssetBalances,
		FetchMyEscrowBalances: FetchMyEscrowBalances
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionSummary);
