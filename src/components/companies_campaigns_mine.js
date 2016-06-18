import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FetchAllMyCompanies } from '../actions/company_action';
import { StartCampaign } from '../actions/campaign_action';

class CompaniesAndCampaignsMine extends Component {

  constructor(props) {
    super(props);

    this.renderCompanies = this.renderCompanies.bind(this);
  }

  componentWillMount() {
    this.props.FetchAllMyCompanies()
  }

  renderCompanies() {
    return this.props.companies.map(c => {
      return (
        <div className="row row-content">
          <div className="col-sm-5">
            <span>{c.CompanyName}</span>
          </div>
          <div className="col-sm-2 status">
            <p>{c.Status.toLowerCase()}</p>
          </div>
          <div className="col-sm-1">

            <Link to={'company/' + c.RandID + '/edit'}>Update</Link>

          </div>
          <div className="col-sm-2">
            {
              (c.Status === 'ACTIVE') &&

              (
                !c.CampaignRandID ?
                  <span className="start-campaign" onClick={() => {this.props.StartCampaign(c.RandID)}}>Raise fund</span> :
                  <Link to={'campaign/' + c.CampaignRandID + '/edit'}>Update campagin</Link>
              )
            }
          </div>
        </div>
      )
    })
  }

  render() {
    const { companies } = this.props;

    if (!companies) {
      return <div>Loading...</div>;
    }

    return (
      <div className="companies-campaigns">

        <div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
            <h1>Your companies and campaigns at a glance</h1>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <h2>Companies</h2>
            <div className="row segment">
              <div className="col-md-12">
                <div className="row header">
                  <div className="col-sm-5">
                    <span>Name</span>
                  </div>
                  <div className="col-sm-2">
                    <span>Status</span>
                  </div>
                  <div className="col-sm-2">

                  </div>
                  <div className="col-sm-2">

                  </div>
                </div>

                {this.renderCompanies()}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <h2>Campaigns</h2>
            <div className="row segment">
              <div className="col-md-12">
                <div className="row header">
                  <div className="col-sm-6">
                    <span>Name</span>
                  </div>
                  <div className="col-sm-3">
                    <span>Status</span>
                  </div>
                  <div className="col-sm-3">
                    <span>Date</span>
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
  return { companies: state.CompanyState.allMyCompanies };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchAllMyCompanies: FetchAllMyCompanies,
    StartCampaign: StartCampaign
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesAndCampaignsMine);
