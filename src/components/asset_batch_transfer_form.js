import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import numeral from 'numeral';

import { SearchUserByEmail } from '../actions/search_action';
import Search from './search';
import InputRowList from './input_row_list';

class AssetBatchTransferForm extends Component{
	constructor(props) {
		super(props);

		this.state = {
			assetID: '', 
			assetCode: '', 
			assetName: '', 
			assetDesc: '', 
			blockchainAssetID: '', 
			receivers: [] 
		};
	}
	
	onInputChange(content) {
    this.setState(content);
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
              assetDesc: a.AssetCode + ' - ' + a.AssetName + ' - ' + 'Bal: ' + numeral(a.Amount).format('0,0')
            });
          }}>
          <a>{a.AssetCode + ' - ' + a.AssetName + ' - ' + 'Bal: ' + numeral(a.Amount).format('0,0')}</a>
        </li>
      )
    });

  }

	render() {
		const { Balances, wallet, SearchingUser } = this.props;

		if (Object.keys(Balances).length <= 0) {
      return <div>Fetching your asset balances...</div>
    }

		var searchDisplay = '';

		if(SearchingUser) {
			var u = SearchingUser;

			searchDisplay = (
				<div 
					className="panel panel-default"
					onClick={() => {
						var receivers = this.state.receivers.slice();
						receivers.push({
							description: u.Email, 
							address: u.WalletAddress, 
							ext: u.WalletAddress.substring(0, 10)
						});
						this.setState({receivers: receivers});
					}}>
					<p>Name: {u.FirstName + ' ' + u.LastName} &nbsp; Email: {u.Email}</p>
					<p>Wallet Address: {u.WalletAddress}</p>
				</div>
			)	
		};

		return (
			<div className="main-panel">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 segment">
						<div className="panel panel-default">
							
							<label>Asset</label>
							<div className="dropdown">
                <button
                  className="btn btn-default dropdown-toggle"
                  type="button"
                  id="regCountry"
                  ref="regCountry"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true">
									{
										this.state.assetDesc ? 
											this.state.assetDesc 
											: 'Select an asset balance to transfer'
									} &nbsp;
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  {this.renderAssetBalancesList()}
                </ul>
              </div>

							<label>Receivers</label>
							<InputRowList
								list={this.state.receivers}
								updateList={(l) => this.setState({receivers: l})} />
							<br />	
							<Search 
								btnName="Add"
								searchFunc={_.debounce((term) => this.props.SearchUser(term))}
								results={searchDisplay}
								clearResults={() => {
									console.log('clear');
									searchDisplay=''
								}}/>


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
		wallet: state.WalletState.wallet,
		SearchingUser: state.SearchState.SearchUser
  }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		SearchUser: SearchUserByEmail
	}, dispatch);	
}

export default connect(mapStateToProps, mapDispatchToProps)(AssetBatchTransferForm);
