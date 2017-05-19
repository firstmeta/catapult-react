import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import numeral from 'numeral';

import FundDeposit from './fund_deposit';

import Alert from './global_alert';

class Funding extends Component {
	constructor(props) {
    super(props);
  }

	render(){
    const { urlRef } = this.props;
		return (
			<div className="assets">
        <div className="container-fluid">
          <div className="row header">
            <div className="col-md-10 col-md-offset-1">
              <h1>Funding</h1>
              <ul className="nav nav-pills">
                <li
                  role="presentation"
                  className={(urlRef === 'deposit') ? "active" : ""}>
                  <Link to="/funding/deposit">Deposit</Link>
								</li>
								<li
                  role="presentation"
                  className={(urlRef === 'withdraw') ? "active" : ""}>
                  <Link to="/funding/withdraw">Withdraw</Link>
                </li>

              </ul>
            </div>
          </div>
        </div>

        <Alert />

        {urlRef === 'deposit' && <FundDeposit />}
      </div>

		);
	}
} 
function mapStateToProps(state) {
  return {
    urlRef: state.router.params.urlRef
  }
}

export default connect(mapStateToProps)(Funding);

