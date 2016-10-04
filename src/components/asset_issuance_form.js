import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RedirectAssetConfirmation } from '../actions/asset_action';
import { FetchAllMyCompanies } from '../actions/company_action';
import { ROOT_IMAGE_URL } from '../config';

class AssetIssuanceForm extends Component {
  constructor(props) {
    super(props);

    this.state = {company: '', name: '', amount: '', imageUrl: '', desc: ''};

    this.renderCompanyList = this.renderCompanyList.bind(this);
  }

  componentWillMount() {
    this.props.FetchAllMyCompanies()
  }

  renderCompanyList() {
    return this.props.companies.map(c => {
      return (
        <li
          key={c.RandID}
          onClick={() => {
            this.setState({
              company: c,
              name: c.CompanyName + ' Equity',
              imageUrl: ROOT_IMAGE_URL + '/' + c.ListingImage,
              desc: c.DescriptionShort
            });
          }}>
          <a>{c.CompanyName}</a>
        </li>
      )
    });

  }

  onInputChange(content) {
    this.setState(content);
  }

  render() {
    const { companies, wallet } = this.props;

    if (companies.length <= 0) {
      return <div></div>
    }

    return (
      <div className="main-panel">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 segment">
            <div className="panel panel-default">
              <label>Issue equity for company</label>
              <div className="dropdown">
                <button
                  className="btn btn-default dropdown-toggle"
                  type="button"
                  value={this.state.company ? this.state.company : ''}
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="true">
                   {this.state.company ? this.state.company.CompanyName : 'Select a company to issue equity'} &nbsp;
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  {this.renderCompanyList()}
                </ul>
              </div>

              <label>Asset name</label>
              <input
                type="text"
                ref="name"
                value={this.state.name}
                onChange={event => this.onInputChange({name: event.target.value})}>
              </input>

                <label>Issuing amount</label>
                <input
                  type="text"
                  ref="amount"
                  value={this.state.amount}
                  placeholder="$1 per share. If your raised $40,000, the Issue Amount is 40,000."
                  onChange={event => this.onInputChange({amount: event.target.value})}/>

                <label>Logo</label>
                <input
                  type="text"
                  ref="imageUrl"
                  value={this.state.imageUrl}
                  onChange={event => this.onInputChange({imageUrl: event.target.value})}/>

                <label>Description</label>
                <textarea
                  className="form-control"
                  rows="4"
                  ref="desc"
                  value={this.state.desc}
                  onChange={event => this.onInputChange({desc: event.target.value})} />

                <div>
                  <button
                    className="btn btn-primary btn-green btn-green-primary full-width"
                    onClick={() => {
                      this.props.RedirectAssetConfirmation({
                        issuer: this.state.company.CompanyName,
                        name: this.state.name,
                        amount: this.state.amount,
                        imageUrl: this.state.imageUrl,
                        desc: this.state.desc,
                        address: this.state.company.Address,
                        city: this.state.company.City,
                        country: this.state.company.Country,
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
    )
  }
}
function mapStateToProps(state) {
  return {
    companies: state.CompanyState.allMyCompanies,
    wallet: state.WalletState.wallet
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchAllMyCompanies: FetchAllMyCompanies,
    RedirectAssetConfirmation: RedirectAssetConfirmation
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AssetIssuanceForm);
