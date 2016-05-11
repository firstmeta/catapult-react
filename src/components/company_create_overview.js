import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import Field from './company_create_team_field';
import FieldList from './company_create_team_field_list';

class CompanyCreateOverview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      team: [],
      team1: ''
    }

    this.updateTeam = this.updateTeam.bind(this);

  }

  updateTeam(teamz) {
    console.log('updateTeam');
    console.log(teamz);
    this.setState({team: teamz});
    this.setState({team1: 'abc'});
    console.log(this.state.team);
    console.log(this.state.team);
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

        </div>
      </div>
    )
  }

}

export default CompanyCreateOverview;
