import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import Field from './company_create_team_field';
import FieldList from './company_create_team_field_list';
import { SaveCompanyOverview } from '../actions/company_action';

class CompanyCreateOverview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      team: [],
      logo:''
    }

    this.updateLogo = this.updateLogo.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
    this.saveCompanyOverview = this.saveCompanyOverview.bind(this);
  }

  updateTeam(team) {
    this.setState({team: team});
  }

  updateLogo(files) {
    console.log(files[0]);
    var logo = files[0];
    this.setState({logo: logo});
  }

  saveCompanyOverview() {
    var content = {};
    var contentTeam = [];
    var teamPhotos = [];

    this.state.team.forEach((member) => {
      contentTeam.push({
        name: member.teamMemberName,
        role: member.teamMemberRole,
        intro: member.teamMemberIntro,
        photoName: member.teamMemberPhoto.name
      });
      teamPhotos.push(member.teamMemberPhoto);
    });

    content.companyShortDesc = this.refs.shortDesc.value;
    content.logoName = this.state.logo.name;
    content.team = contentTeam;

    this.props.SaveCompanyOverview(content, logo, teamPhotos)
  }

  render() {
    return (
      <div className="company-create-overview content">
        <div className="container-fluid">

          <div className="row">
            <div className="col-md-10 col-md-offset-1 segment add-padding">
              <h3>Company overview</h3>
              <div className="row">
                <div className="col-sm-5">
                  <div className="form-group">
                    <label for="shortDesc">Short description of your company product</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      ref="shortDesc"
                      id="shortDesc" />
                  </div>
                </div>

                <div className="col-sm-2">
                  <label>Company logo</label>
                  <Dropzone
                    className="logo-drop-image"
                    multiple={false}
                    onDrop={this.updateLogo}>
                    {
                      this.state.logo ? <div>
                          <img src={this.state.logo.preview} />
                        </div> : <div>Drop your company logo here, or click to select image to upload.</div>
                    }
                  </Dropzone>
                </div>

                <div className="col-sm-5">
                  <label>Introduction video</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="www.youtube.com/watch?v=awesome-video*"
                    ref="videoUrl"/>
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

function mapStateToProps(state) {
  return {
    randID: state.router.params.randID
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({SaveCompanyOverview: SaveCompanyOverview}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCreateOverview);
