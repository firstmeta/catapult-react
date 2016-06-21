import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import CampaignCreateBasics from './campaign_create_basics';
import CampaignCreateStory from './campaign_create_story';
import CampaignView from './campaign_view';
import { SubmitCampaignForReview } from '../actions/campaign_action';
import Alert from './global_alert';
import { RemoveAlert } from '../actions/alert_action';

class CampaignCreate extends Component {
  constructor(props) {
    super(props);

    this.submitForReview = this.submitForReview.bind(this);
  }

  componentWillMount() {
    this.props.RemoveAlert();
  }

  submitForReview() {
    this.props.SubmitCampaignForReview(this.props.campaignRandID);
  }

  renderSubmitReviewButton() {
    return (
      <div className="container-fluid">
        <div className="row submit-review">
          <div className="col-md-10 col-md-offset-1">
            <div className="row row-centered">
              <div className="col-lg-1 col-centered">
              <button
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
    const { companyRandID, campaignRandID, step, alert } = this.props;

    return (
      <div className="campaign-create">

      <div className="container-fluid">
        <div className="row row-centered">
          <div className="col-lg-1 col-centered">
          <h1>Let&#39;s raise fund for your company!</h1>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row row-centered">
          <div className="col-lg-1 col-centered">
            <div className="btn-toolbar" role="toolbar">
              <div className="btn-group" role="group">
                <Link to={"/campaign/" + campaignRandID + "/edit"}>
                  <button
                    type="button"
                    className={
                        "btn btn-default no-border-radius-right no-border-right " +
                        ((!step || step === 'basics') ? "btn-clicked" : "")
                      }>
                    Basics
                  </button>
                </Link>

                <Link to={"/campaign/" + campaignRandID + "/edit?step=story"}>
                  <button
                    type="button"
                    className={
                      "btn btn-default no-border-radius-left " +
                      ((step === 'story') ? "btn-clicked" : "")
                    }>
                    Story
                    </button>
                </Link>
              </div>
              <div className="btn-group" role="group">
                <Link to={"/campaign/" + campaignRandID + "/edit?step=preview"}>
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
                <button type="button" className="btn btn-default"><Link to="/companycreate/submit">Submit for review</Link></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Alert />

      {(!step || step === 'basics') && <CampaignCreateBasics />}
      {step === 'story' && <CampaignCreateStory />}
      {step === 'preview' && <CampaignView />}
      {step === 'preview' && this.renderSubmitReviewButton()}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    campaignRandID: state.router.params.campaignRandID,
    step: state.router.location.query.step
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    SubmitCampaignForReview: SubmitCampaignForReview,
    RemoveAlert: RemoveAlert
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CampaignCreate);
