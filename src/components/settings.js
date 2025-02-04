import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import Alert from './global_alert';
import WalletSettings from './settings_wallet';
import ProfileSettings from './settings_profile';

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
                  className={(!urlRef || urlRef === 'profile') ? "active" : ""}>
                  <Link to="/settings/profile">Profile</Link>
                </li>
                <li
                  role="presentation"
                  className={(urlRef === 'wallet') ? "active" : ""}>
                  <Link to="/settings/wallet">Asset Wallet</Link>
                </li>
              </ul>
            </div>
          </div>
					
					<Alert />

					{urlRef === 'wallet' && <WalletSettings />}
					{urlRef === 'profile' && <ProfileSettings />}
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
