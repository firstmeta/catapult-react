import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import { SaveCompanyBasics, FetchCompanyByRandID } from '../actions/company_action';
import { CountryList, CountryMap } from './country_list';

class CompanyCreateBasics extends Component {

  constructor(props) {
    super(props);

    this.state = {country: ''};

    this.renderCountryList = this.renderCountryList.bind(this);
    this.saveCompanyBasics = this.saveCompanyBasics.bind(this);
  }

  componentWillMount() {
    this.props.FetchCompanyByRandID(this.props.randID);
  }

  saveCompanyBasics() {
    this.props.SaveCompanyBasics({
      randID: this.props.randID,
      companyName: this.refs.companyName.value,
      regNum: this.refs.regNum.value,
      regCountry: this.state.country ? this.state.country.code : this.props.company.RegCountry,
      legalType: this.refs.legalType.value,
      industry: this.refs.industry.value,
      teamSize: this.refs.teamSize.value,
      website: this.refs.website.value,
      creatorRole: this.refs.creatorRole.value,
      contactNum: this.refs.contactNum.value,
      contactEmail: this.refs.contactEmail.value,
      address: this.refs.address.value,
      city: this.refs.city.value,
      postalCode: this.refs.postalCode.value,
      stateProvince: this.refs.stateProvince.value,
      country: this.state.country ? this.state.country.code : this.props.company.Country
    })
  }

  renderCountryList() {
    return CountryList.map(c => {
      return (
        <li
          key={c.code}
          onClick={() => this.setState({country: {code: c.code, name: c.name}})}>
          <a>{c.name}</a>
        </li>
      )
    })
  }

  render() {

    const { company } = this.props;

    if (!company) {
      return <div>Loading...</div>;
    }

    console.log(company);

    return (
      <div className="company-create-basics">
        <div className="container-fluid">

            <div className="row">
              <div className="col-md-10 col-md-offset-1 segment add-padding">
                <h3>Registration information</h3>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="companyName">COMPANY NAME</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Company name*"
                        defaultValue={company.CompanyName}
                        ref="companyName"
                        id="companyName"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="regNum">REGISTRATION NUMBER</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Registration number*"
                      defaultValue={company.RegNumber}
                      ref="regNum"/>
                  </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="regCountry">REGISTRATION COUNTRY</label>
                      <div className="dropdown">
                        <button
                          className="btn btn-default dropdown-toggle"
                          type="button"
                          id="regCountry"
                          ref="regCountry"
                          value={company.RegCountry}
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="true">
                           { this.state.country ? this.state.country.name : CountryMap[company.RegCountry]} &nbsp;
                          <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                          {this.renderCountryList()}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="legalType">LEGAL COMPANY TYPE</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Legal company type*"
                        defaultValue={company.LegalType}
                        ref="legalType"
                        id="legalType"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-10 col-md-offset-1 segment">
                <h3>Technology background</h3>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="industry">INDUSTRY</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Industry*"
                        defaultValue={company.Industry}
                        ref="industry"
                        id="industry"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="teamSize">TEAM SIZE</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="5, 10, 20,...*"
                        defaultValue={company.TeamSize}
                        ref="teamSize"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="website">WEBSITE</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Website*"
                        defaultValue={company.Website}
                        ref="website"
                        id="website"/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="creatorRole">YOUR ROLE IN THE COMPANY</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your role in the company*"
                        defaultValue={company.CreatorRole}
                        ref="creatorRole"
                        id="creatorRole"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-md-10 col-md-offset-1 segment">
                <h3>Company contacts</h3>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="contactEmail">YOUR BUSINESS EMAIL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your business email*"
                        defaultValue={company.ContactEmail}
                        ref="contactEmail"
                        id="contactEmail"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="contactNum">YOUR BUSINESS PHONE NUMBER</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your business phone number"
                        defaultValue={company.ContactNum}
                        ref="contactNum"
                        id="contactNum"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-10 col-md-offset-1 segment">
                <h3>Company address</h3>
                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="address">ADDRESS</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address*"
                        defaultValue={company.Address}
                        ref="address"
                        id="address"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="city">CITY / TOWN</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City / Town*"
                        defaultValue={company.City}
                        ref="city"
                        id="city"/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="postalCode">ZIP / POSTAL CODE</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Zip / Postal code*"
                        defaultValue={company.PostalCode}
                        ref="postalCode"
                        id="postalCode"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="stateProvince">STATE / PROVINCE / REGION</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="State / Province / Region*"
                        defaultValue={company.StateProvince}
                        ref="stateProvince"
                        id="stateProvince"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                      <label for="country">COUNTRY</label>
                      <div className="dropdown">
                        <button className="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
                          { this.state.country ? this.state.country.name : CountryMap[company.RegCountry]}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className="row">
              <div className="col-md-10 col-md-offset-1 segment">
                <div className="row row-centered">
                  <div className="col-lg-1 col-centered">
                    <button
                      className="btn btn-primary btn-green btn-green-primary full-width"
                      onClick={this.saveCompanyBasics}>
                      Save & Continue
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
    randID: state.router.params.randID,
    company: state.CompanyState.companyDetails
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ SaveCompanyBasics: SaveCompanyBasics, FetchCompanyByRandID: FetchCompanyByRandID }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCreateBasics);
