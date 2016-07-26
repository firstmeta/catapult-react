import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactPlayer from 'react-player';
import { FetchCompanyByRandID } from '../actions/company_action';
import { CountryMap } from './countries';
import { ROOT_IMAGE_URL } from '../config';

class CompanyView extends Component {

  constructor(props) {
    super(props);

    this.renderTeam = this.renderTeam.bind(this);
  }

  componentWillMount() {
    this.props.FetchCompanyByRandID(this.props.randID);
  }

  renderTeam() {
    if(!this.props.company.Team) {
      return (
        <div></div>
      );
    }
    return this.props.company.Team.map((member) => {
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

    const { company } = this.props;

    if (!company || company.RandID !== this.props.randID) {
      return <div>Loading...</div>;
    }

    return (
      <div className="company-view">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12">

              <div className="row row-top">
                <div className="col-md-8 left-col">
                  <div>
                    <h2>{company.CompanyName} {company.Slogan && ("- " + company.Slogan)}</h2>
                  </div>
                </div>
                <div className="col-md-4 right-col">
                  <span className="fa fa-tags">&nbsp; {company.Industry}</span>
                  <span className="fa fa-map-marker">&nbsp; {CountryMap[company.Country]}</span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-8 left-col">

                  {
                    company.Video ? <ReactPlayer className="player" url={company.Video} controls={true} />
                      : (company.OverallSketch ? <div className="overall-sketch"><img src={ROOT_IMAGE_URL + "/" + company.OverallSketch}/></div> : <div></div>)
                  }

                  <div className="panel panel-default details description">
                    <div className="panel-body " dangerouslySetInnerHTML={{__html: this.props.company.Summary}}>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 right-col">
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
    randID: state.router.params.randID,
    company: state.CompanyState.companyDetails
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({FetchCompanyByRandID: FetchCompanyByRandID}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CompanyView);
