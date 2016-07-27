import _ from 'lodash';
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { ROOT_IMAGE_URL } from '../config';

class CompanyCreateTeamField extends Component {

  constructor(props) {
    super(props);

    this.state = { photo: '' }

    this.handleInputChange = this.handleInputChange.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  displayPhoto() {
    if(this.props.photo) {
      return <img src={this.props.photo.preview} />;
    }
    else if(this.props.savedPhoto) {
      return <img src={ROOT_IMAGE_URL + '/' + this.props.savedPhoto} />;
    }
    else {
      return <div>Drop a photo here, or click to select photo to upload.</div>;
    }
  }

  onDrop(files) {
    var photo = files[0];
    this.setState({photo: photo});
    this.props.update(this.props.index, {
      name: this.refs.name.value,
      role: this.refs.role.value,
      intro: this.refs.intro.value,
      photo: photo
    })
  }

  handleInputChange() {
    this.props.updateTexts(this.props.index, {
      name: this.refs.name.value,
      role: this.refs.role.value,
      intro: this.refs.intro.value,
      photo: this.state.photo
    })
  }

  render() {
    //console.log(this.state.teamMemberPhoto);
    return (
      <div className="panel panel-default">
        <div className="panel-body team-field">
          <div className="row">
            <div className="col-md-12">
              <span
                className="remove-field"
                onClick={() => this.props.remove(this.props.index)}>
                x
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-3">
              <div className="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  ref="name"
                  onChange={this.handleInputChange}
                  defaultValue={this.props.name}/>
              </div>
            </div>
            <div className="col-sm-2">
              <div className="form-group">
                <label for="role">Role</label>
                <input
                  type="text"
                  className="form-control"
                  ref="role"
                  onChange={this.handleInputChange}
                  defaultValue={this.props.role}/>
              </div>
            </div>
            <div className="col-sm-5">
              <label for="intro">Short introduction</label>
              <textarea
                className="form-control"
                rows="3"
                ref="intro"
                onChange={this.handleInputChange}
                defaultValue={this.props.intro}/>
            </div>
            <div className="col-sm-2">
              <label for="team-member-photo">Photo</label>
              <Dropzone
                className="team-member-drop-photo" multiple={false}
                onDrop={this.onDrop}>
                {
                  this.displayPhoto()
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
