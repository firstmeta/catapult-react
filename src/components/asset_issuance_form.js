import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RedirectAssetConfirmation } from '../actions/asset_action';
import { FetchAllMyCompanies } from '../actions/company_action';

class AssetIssuanceForm extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.FetchAllMyCompanies()
  }

  render() {
    const { companies, wallet } = this.props;

    if (companies.length <= 0) {
      return <div></div>
    }

    return (
      <div className="asset-issuance-form">
        <div className="row">
          <div className="col-md-6 col-md-offset-3 segment">
            <div className="panel panel-default">
              <div className="panel-body">

                <label for="regCountry">Issue equity for company</label>
                <div className="dropdown">
                  <button
                    className="btn btn-default dropdown-toggle"
                    type="button"
                    id="regCountry"
                    ref="regCountry"
                    value={companies[0].CompanyName}
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="true">
                     {companies[0].CompanyName} &nbsp;
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">

                  </ul>
                </div>

                <label>Equity name</label>
                <input
                  type="text"
                  ref="name"
                  defaultValue={companies[0].CompanyName + " Equity"}/>

                  <label>Issue Amount</label>
                  <input
                    type="text"
                    ref="amount"
                    placeholder="$1 per share. If your raised $40,000, the Issue Amount is 40,000."/>

                  <label>Image</label>
                  <input
                    type="text"
                    ref="imageUrl"
                    defaultValue={companies[0].ListingImage}/>

                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    ref="desc" />

                  <div>
                    <button
                      className="btn btn-primary btn-green btn-green-primary full-width"
                      onClick={() => {
                        this.props.RedirectAssetConfirmation({
                          name: this.refs.name.value,
                          amount: this.refs.amount.value,
                          imageUrl: this.refs.imageUrl.value,
                          desc: this.refs.desc.value,
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
