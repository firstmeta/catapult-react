import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

class CompanyCreateTeamField extends Component {

  constructor(props) {
    super(props);

    this.state = { teamMemberPhoto: '' }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {
    var photo = files[0];
    this.setState({teamMemberPhoto: photo});
    this.props.update(this.props.index, {
      teamMemberName: this.refs.teamMemberName.value,
      teamMemberRole: this.refs.teamMemberRole.value,
      teamMemberIntro: this.refs.teamMemberIntro.value,
      teamMemberPhoto: photo
    })
  }

  handleInputChange() {
    this.props.update(this.props.index, {
      teamMemberName: this.refs.teamMemberName.value,
      teamMemberRole: this.refs.teamMemberRole.value,
      teamMemberIntro: this.refs.teamMemberIntro.value,
      teamMemberPhoto: this.state.teamMemberPhoto
    })
  }

  render() {
    //console.log(this.state.teamMemberPhoto);
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-3">
              <div className="form-group">
                <label for="teamMemberName">Name</label>
                <input
                  type="text"
                  className="form-control"
                  ref="teamMemberName"
                  onChange={this.handleInputChange}
                  value={this.props.teamMemberName}/>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label for="teamMemberRole">Role</label>
                <input
                  type="text"
                  className="form-control"
                  ref="teamMemberRole"
                  onChange={this.handleInputChange}
                  value={this.props.teamMemberRole}/>
              </div>
            </div>
            <div className="col-sm-5">
              <label for="teamMemberIntro">Short introduction</label>
              <textarea
                className="form-control"
                rows="3"
                ref="teamMemberIntro"
                onChange={this.handleInputChange}
                value={this.props.teamMemberIntro}/>
            </div>
            <div className="col-sm-2">
              <label for="team-member-photo">Photo</label>
              <Dropzone
                className="team-member-drop-photo" multiple={true}
                onDrop={this.onDrop}>
                {
                  this.state.teamMemberPhoto ? <div>
                      <img src={this.state.teamMemberPhoto.preview} />
                    </div> : <div>Drop a photo here, or click to select photo to upload.</div>
                }
              </Dropzone>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default CompanyCreateTeamField;
