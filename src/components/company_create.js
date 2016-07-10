import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import CompanyCreateBasics from './company_create_basics';
import CompanyCreateOverview from './company_create_overview';
import CompanyCreateSummary from './company_create_summary';
import CompanyCreateKYC from './company_create_kyc';
import CompanyView from './company_view';
import Alert from './global_alert';
import { SubmitCompanyForReview } from '../actions/company_action';

class CompanyCreate extends Component {

constructor(props) {
  super(props);

  this.renderSubmitReviewButton = this.renderSubmitReviewButton.bind(this);
  this.submitForReview = this.submitForReview.bind(this);
}

submitForReview() {
  this.props.SubmitCompanyForReview(this.props.randID);
}

  renderSubmitReviewButton() {
    return (
      <div className="container-fluid">
        <div className="row submit-review">
          <div className="col-md-10 col-md-offset-1">
            <div className="row row-centered">
              <div className="col-lg-1 col-centered">
              <button
                id="submitReviewBtn"
                className="btn btn-primary btn-green btn-green-primary full-width"
                onClick={this.submitForReview}>
                Submit for review
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { randID, step } = this.props;

    return (
      <div className="company-create">

        <div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
            <h1>Let's set up your company!</h1>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
              <div className="btn-toolbar" role="toolbar">
                <div className="btn-group" role="group">
                  <Link to={"/company/" + randID + "/edit"}>
                    <button
                      type="button"
                      className={
                          "btn btn-default no-border-radius-right no-border-right " +
                          ((!step || step === 'basics') ? "btn-clicked" : "")
                        }>
                      Basics
                    </button>
                  </Link>
                  <Link to={"/company/" + randID + "/edit?step=overview"}>
                    <button
                      type="button"
                      className={
                        "btn btn-default no-border-radius no-border-right " +
                        ((step === 'overview') ? "btn-clicked" : "")
                      }>
                      Overview
                    </button>
                  </Link>
                  <Link to={"/company/" + randID + "/edit?step=summary"}>
                    <button
                      type="button"
                      className={
                        "btn btn-default no-border-radius-left " +
                        ((step === 'summary') ? "btn-clicked" : "")
                      }>
                      Summary
                      </button>
                  </Link>
                </div>
                <div className="btn-group" role="group">
                  <Link to={"/company/" + randID + "/edit?step=documents"}>
                    <button
                      type="button"
                      className={
                        "btn btn-default" + ((step === 'documents') ? "btn-clicked" : "")
                      }>
                      Documents
                    </button>
                  </Link>
                </div>

                <div className="btn-group" role="group">
                  <Link to={"/company/" + randID + "/edit?step=preview"}>
                    <button
                      type="button"
                      className={
                        "btn btn-default" + ((step === 'preview') ? "btn-clicked" : "")
                      }>
                      Preview
                    </button>
                  </Link>
                </div>

                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default"><a href="#submitReviewBtn">Submit for review</a></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Alert />

        {(!step || step === 'basics') &&  <CompanyCreateBasics />}
        {step === 'overview' && <CompanyCreateOverview />}
        {step === 'summary' && <CompanyCreateSummary />}
        {step === 'documents' && <CompanyCreateKYC />}
        {step === 'preview' && <CompanyView />}
        {step === 'preview' && this.renderSubmitReviewButton()}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    randID: state.router.params.randID,
    step: state.router.location.query.step
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({SubmitCompanyForReview: SubmitCompanyForReview}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyCreate);
