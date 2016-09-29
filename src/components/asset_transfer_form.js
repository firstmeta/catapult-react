import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RedirectAssetTransferConfirmation } from '../actions/asset_action';
import { ROOT_IMAGE_URL } from '../config';

class AssetTransferForm extends Component {
  constructor(props) {
    super(props);

    this.state = {assetID: '', assetCode: '', assetName: '', assetDesc: '', blockchainAssetID: '', toAddr: '', amount: ''};

    this.renderAssetBalancesList = this.renderAssetBalancesList.bind(this);
  }

  renderAssetBalancesList() {
    return this.props.Balances.map(a => {
      return (
        <li
          key={a.AssetID}
          onClick={() => {
            this.setState({
              assetID: a.AssetID,
              assetCode: a.AssetCode,
              assetName: a.AssetName,
              blockchainAssetID: a.BlockchainAssetID,
              assetDesc: a.AssetCode + ' - ' + a.AssetName + ' - ' + 'Bal: ' + a.Amount
            });
          }}>
          <a>{a.AssetCode + ' - ' + a.AssetName + ' - ' + 'Bal: ' + a.Amount}</a>
        </li>
      )
    });

  }

  onInputChange(content) {
    this.setState(content);
  }

  render() {
    const { Balances, wallet } = this.props;

    if (Object.keys(Balances).length <= 0) {
      return <div></div>
    }

    return (
      <div className="asset-issuance-form">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 segment">
            <div className="panel panel-default">
              <div className="panel-body">

                <label>Transfer your asset: </label>
                <div className="dropdown">
                  <button
                    className="btn btn-default dropdown-toggle"
                    type="button"
                    id="regCountry"
                    ref="regCountry"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
                     {this.state.assetDesc ? this.state.assetDesc : 'Select an asset balance to transfer'} &nbsp;
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {this.renderAssetBalancesList()}
                  </ul>
                </div>

                <label>Transfer Amount</label>
                <input
                  type="text"
                  ref="amount"
                  value={this.state.amount}
                  onChange={event => this.onInputChange({amount: event.target.value})}/>

                <label>To this address:</label>
                <input
                  type="text"
                  ref="toAddr"
                  value={this.state.toAddr}
                  onChange={event => this.onInputChange({toAddr: event.target.value})}/>

                <div>
                  <button
                    className="btn btn-primary btn-green btn-green-primary full-width"
                    onClick={() => {
                      this.props.RedirectAssetTransferConfirmation({
                        blockchainAssetID: this.state.blockchainAssetID,
                        assetID: this.state.assetID,
                        assetCode: this.state.assetCode,
                        assetName: this.state.assetName,
                        toAddr: this.state.toAddr,
                        amount: this.state.amount,
                        wallet: wallet
                      });
                    }}>
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    Balances: state.AssetState.AssetBalances,
    wallet: state.WalletState.wallet
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    RedirectAssetTransferConfirmation: RedirectAssetTransferConfirmation
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AssetTransferForm);
