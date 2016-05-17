import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Field from './company_create_team_field';
import FieldList from './company_create_team_field_list';
import { SaveCompanyOverview } from '../actions/company_action';

class CompanyCreateOverview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      team: []
    }

    this.updateTeam = this.updateTeam.bind(this);
    this.saveCompanyOverview = this.saveCompanyOverview.bind(this);
  }

  updateTeam(team) {
    this.setState({team: team});
  }

  saveCompanyOverview() {
    var content = {};
    var contentTeam = [];
    var teamPhotos = [];

    console.log(this.state.team);

    this.state.team.forEach((member) => {
      contentTeam.push({
        name: member.teamMemberName,
        role: member.teamMemberRole,
        intro: member.teamMemberIntro,
        photoName: member.teamMemberPhoto.name
      });
      teamPhotos.push(member.teamMemberPhoto);
    });

    console.log(teamPhotos);
    console.log(contentTeam);

    content.companyShortDesc = this.refs.shortDesc.value;
    content.team = contentTeam;

    this.props.SaveCompanyOverview(content, teamPhotos)
  }

  render() {
    return (
      <div className="company-create-overview content">
        <div className="container-fluid">

          <div className="row">
            <div className="col-md-10 col-md-offset-1 segment add-padding">
              <h3>Company overview</h3>
              <div className="row">
                <div className="col-sm-8">
                  <div className="form-group">
                    <label for="shortDesc">Short description of your company product</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      ref="shortDesc"
                      id="shortDesc" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1 segment add-padding">
              <h3>Your team</h3>
              <FieldList fieldContents={this.state.team} update={this.updateTeam}/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1 segment">
              <div className="row row-centered">
                <div className="col-lg-1 col-centered">
                <button
                  className="btn btn-primary btn-green btn-green-primary full-width"
                  onClick={this.saveCompanyOverview}>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({SaveCompanyOverview: SaveCompanyOverview}, dispatch);
}

export default connect(null, mapDispatchToProps)(CompanyCreateOverview);
