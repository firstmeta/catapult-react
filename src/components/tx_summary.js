import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'react-redux';
import { Link } from 'react-router';
import TradeSummary from './trade_summary';
import Spinner from './spinner';

class TransactionSummary extends Component {
	constructor(props) {
		super(props);
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
                  className={(urlRef === 'transfer') ? "active" : ""}>
                  <Link to="/transaction-summary/finance">Finance</Link>
                </li>
              </ul>
            </div>
          </div>

				</div>

				{urlRef === 'trades' && <TradeSummary />}
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		urlRef: state.router.params.urlRef
	}
}
export default connect(mapStateToProps)(TransactionSummary);
