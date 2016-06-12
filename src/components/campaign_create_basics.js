import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SaveCampaignBasics } from '../actions/campaign_action';

class CampaignCreateBasics extends Component {

  constructor(props) {
    super(props);

    this.save = this.save.bind(this);
  }

  save() {
    this.props.SaveCampaignBasics({
      campaignRandID: this.props.campaignRandID,
      companyRandID: this.props.companyRandID,
      raisingAmount: this.refs.raisingAmount.value,
      purpose: this.refs.purpose.value,
      valuation: this.refs.valuation.value,
      customerBaseSize: this.refs.customerBaseSize.value,
      investors: this.refs.investors.value
    })
  }

  render() {
    return (
      <div className="campaign-create-basics">
        <div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
            <h3>Tell us about your company current status and future plan. </h3>
            </div>
          </div>
        </div>

        <div className="container-fluid content">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">

              <div className="row field">
                <div className="col-md-12">
                  <label for="raisingAmount">How much do you want to raise?</label>
                  <div>
                    <input
                      type="text"
                      placeholder="50000, 100000, 1000000,..."
                      ref="raisingAmount" />
                  </div>
                </div>
              </div>

              <div className="row field">
                <div className="col-md-12">
                  <label for="purpose">How are you going to use the fund raised?</label>
                  <div>
                    <textarea
                      rows="4"
                      ref="purpose" />
                  </div>
                </div>
              </div>

              <div className="row field">
                <div className="col-md-12">
                  <label for="valuation">What is your company estimated valuation</label>
                  <div>
                    <input
                      type="text"
                      placeholder="500000, 1000000, 5000000,..."
                      ref="valuation" />
                  </div>
                </div>
              </div>

              <div className="row field">
                <div className="col-md-12">
                  <label for="customerBaseSize">What is the size of your existing users or customer base?</label>
                  <div>
                    <input
                      type="text"
                      placeholder="1000, 10000, 100000,..."
                      ref="customerBaseSize" />
                  </div>
                </div>
              </div>

              <div className="row field">
                <div className="col-md-12">
                  <label for="investors">Do you have any investor currently invest in your company?</label>
                  <div>
                    <input
                      type="text"
                      ref="investors" />
                  </div>
                </div>
              </div>

              <div className="row field">
                <div className="col-md-6 col-md-offset-3">
                <button
                  className="btn btn-primary btn-green btn-green-primary full-width"
                  onClick={this.save}>
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
    companyRandID: state.router.params.companyRandID,
    campaignRandID: state.router.params.campaignRandID,
    editingCampaignID: state.CampaignState.editingCampaignID
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({SaveCampaignBasics: SaveCampaignBasics}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CampaignCreateBasics);
