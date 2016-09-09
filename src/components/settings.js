import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import WalletSettings from './settings_wallet';

class Settings extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { urlRef } = this.props;

    return (
      <div className="settings">
        <div className="container-fluid">
          <div className="row header">
            <div className="col-md-10 col-md-offset-1">
              <h1>Settings</h1>
              <ul className="nav nav-pills">
                <li
                  role="presentation"
                  className={(!urlRef || urlRef === 'account') ? "active" : ""}>
                  <Link to="/settings/account">Account</Link>
                </li>
                <li
                  role="presentation"
                  className={(urlRef === 'wallet') ? "active" : ""}>
                  <Link to="/settings/wallet">Asset Wallet</Link>
                </li>
              </ul>
            </div>
          </div>

          {urlRef === 'wallet' && <WalletSettings />}
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    urlRef: state.router.params.urlRef
  }
}
export default connect(mapStateToProps)(Settings);
