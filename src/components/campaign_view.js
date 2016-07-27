import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player';
import { FetchCampaignByRandID } from '../actions/campaign_action';
import { CountryMap } from './countries';
import { ROOT_IMAGE_URL } from '../config';

class CampaignView extends Component {

  constructor(props) {
    super(props);

    this.renderTeam = this.renderTeam.bind(this);
  }

  componentWillMount() {
    this.props.FetchCampaignByRandID(this.props.campaignRandID);
  }

  renderTeam() {
    if(!this.props.campaign.Team) {
      return (
        <div></div>
      )
    }
    return this.props.campaign.Team.map((member) => {
      return (
        <div className="team-member" key={member.name}>
          <div className="row">
            <div className="col">
              <div className="row">
                <div className="col-sm-3">
                  <div className="photo">
                    <img src={ROOT_IMAGE_URL + "/" + member.photoName} />
                  </div>
                </div>
                <div className="col-sm-9">
                  <p><strong>{member.name}</strong></p>
                  <span>{member.role}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="row member-intro">
            <div className="col">
              {member.intro}
            </div>
          </div>
          <hr />
        </div>
      );
    })

  }

  render() {

    const { campaign } = this.props;

    if(!campaign) {
      return <div>Loading...</div>;
    }

    return (
      <div className="campaign-view">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">

              <div className="row row-top">
                <div className="col-md-8 left-col">
                  <div>
                    <h2>{campaign.CompanyName} {campaign.Slogan && ("- " + campaign.Slogan)}</h2>
                  </div>
                </div>
                <div className="col-md-4 right-col">
                  <span className="fa fa-tags">&nbsp; {campaign.Industry}</span>
                  <span className="fa fa-map-marker">&nbsp; {CountryMap[campaign.Country]}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8 left-col">
                  <ReactPlayer className="player" url={campaign.Video} controls={true}/>

                  <div className="panel panel-default details">
                    <div className="panel-body " dangerouslySetInnerHTML={{__html: this.props.campaign.Story}}>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 right-col">

                  <div className="row">
                    <div className="col">
                      <div className="panel panel-default details invest">
                        <div className="panel-body">
                          <div className="heading">
                            <span className="heading">{campaign.AmountRaised} {campaign.Currency}</span>
                          </div>
                          <div>funded of {campaign.AmountRaising} {campaign.Currency}</div>
                          <div className="progress-invest">
                            <div className="progress-bar"></div> &nbsp; <span>0 %</span>
                          </div>

                          <hr />

                          <div>
                            <span className="heading">{campaign.NumberBackers}</span> &nbsp; investors
                          </div>

                          <hr />

                          <div>
                            <span className="heading">{campaign.AmountRaising / campaign.Valuation * 100} %</span>
                              &nbsp; of company's shares offered ({campaign.AmountRaising} {campaign.Currency} valuation)
                          </div>

                          <hr />

                          <div>
                            <span className="heading">{!campaign.Days ? 0 : campaign.Days}</span> &nbsp; days left to invest
                          </div>

                          <hr />

                          <div>
                            <button
                              className="btn btn-primary btn-green btn-green-primary full-width">
                              Invest
                            </button>
                          </div>

                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <h4>Team</h4>
                      <div className="panel panel-default details">
                        <div className="panel-body">
                          {this.renderTeam()}
                        </div>
                      </div>
                    </div>
                  </div>

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
    campaignRandID: state.router.params.campaignRandID,
    campaign: state.CampaignState.campaignDetails
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({FetchCampaignByRandID: FetchCampaignByRandID}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CampaignView);
