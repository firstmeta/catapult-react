import React, { Component } from 'react';

class CompanyCreateBasics extends Component {
  render() {
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
                        ref="companyName"
                        id="companyName"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="companyName">REGISTRATION NUMBER</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Registration number*"
                        ref="registrationNumber"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="companyName">REGISTRATION COUNTRY</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Registration country*"
                        ref="registrationCountry"/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="legalCompanyType">LEGAL COMPANY TYPE</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Legal company type*"
                        ref="legalCompanyType"
                        id="legalCompanyType"/>
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
                        placeholder="1-10*"
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
                        ref="website"
                        id="website"/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="yourRole">YOUR ROLE IN THE COMPANY</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your role in the company*"
                        ref="yourRole"
                        id="yourRole"/>
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
                    <label for="businessEmail">YOUR BUSINESS EMAIL</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your business email*"
                        ref="businessEmail"
                        id="businessEmail"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="businessPhone">YOUR BUSINESS PHONE NUMBER</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Your business phone number"
                        ref="businessPhone"
                        id="businessPhone"/>
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
                    <label for="addressLine1">ADDRESS LINE 1</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address line 1*"
                        ref="addressLine1"
                        id="addressLine1"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="addressLine2">ADDRESS LINE 2</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Address line 2*"
                        ref="addressLine2"
                        id="addressLine2"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="city">CITY / TOWN</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="City / Town*"
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
                        ref="stateProvince"
                        id="stateProvince"/>
                    </div>
                  </div>
                  <div className="col-sm-4">
                    <div className="form-group">
                    <label for="country">COUNTRY</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Country*"
                        ref="country"
                        id="country"/>
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
                          className="btn btn-primary btn-green btn-green-primary full-width">
                    Continue
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

export default CompanyCreateBasics;
