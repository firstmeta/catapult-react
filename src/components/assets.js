import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import AssetIssuance from './asset_issuance';
import AssetTransfer from './asset_transfer';
import { FetchWallet } from '../actions/wallet_action';

class Assets extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if(!this.props.walletFetched) {
      this.props.FetchWallet();
    }
  }

  render() {
    const { urlRef } = this.props;
    return (
      <div className="assets">
        <div className="container-fluid">
          <div className="row header">
            <div className="col-md-10 col-md-offset-1">
              <h1>Assets</h1>
              <ul className="nav nav-pills">
                <li
                  role="presentation"
                  className={(!urlRef || urlRef === 'summary') ? "active" : ""}>
                  <Link to="/assets/summary">Summary</Link>
                </li>
                <li
                  role="presentation"
                  className={(urlRef === 'transfer') ? "active" : ""}>
                  <Link to="/assets/transfer">Transfer</Link>
                </li>
                <li
                  role="presentation"
                  className={(urlRef === 'issuance') ? "active" : ""}>
                  <Link to="/assets/issuance">Issuance</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {urlRef === 'issuance' && <AssetIssuance />}
        {urlRef === 'transfer' && <AssetTransfer />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    urlRef: state.router.params.urlRef,
    walletFetched: state.WalletState.fetched
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchWallet: FetchWallet
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Assets);
