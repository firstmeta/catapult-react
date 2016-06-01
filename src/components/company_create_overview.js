import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import Field from './company_create_team_field';
import FieldList from './company_create_team_field_list';
import { SaveCompanyOverview, FetchCompanyByRandID } from '../actions/company_action';
import { ROOT_IMAGE_URL } from '../config';

class CompanyCreateOverview extends Component {

  constructor(props) {
    super(props);

    this.state = {
      team: [],
      logo:'',
      listingImage: ''
    }
    this.displayLogo =  this.displayLogo.bind(this);
    this.displayListingImage = this.displayListingImage.bind(this);
    this.updateLogo = this.updateLogo.bind(this);
    this.updateListingImage = this.updateListingImage.bind(this);
    this.updateTeam = this.updateTeam.bind(this);
    this.updateTeamTexts = this.updateTeamTexts.bind(this);
    this.saveCompanyOverview = this.saveCompanyOverview.bind(this);
  }

  componentWillMount() {
    this.props.FetchCompanyByRandID(this.props.randID);
  }

  updateTeam(team) {
    this.setState({team: team});
  }
  updateTeamTexts(team) {
    this.state.team = team;
  }

  displayLogo() {
    if (this.state.logo.preview) {
      return <img src={this.state.logo.preview} />;
    }
    else if (this.props.company.Logo) {
      return <img src={ROOT_IMAGE_URL + '/' + this.props.company.Logo} />;
    }
    else {
      return <div>Drop your company logo here, or click to select image to upload.</div>;
    }
  }
  displayListingImage() {
    if (this.state.listingImage.preview) {
      return <img src={this.state.listingImage.preview} />;
    }
    else if (this.props.company.ListingImage) {
      return <img src={ROOT_IMAGE_URL + '/' + this.props.company.ListingImage} />;
    }
    else {
      return (
        <div>
          <p>Drop your company listing image here, or click to select image to upload.</p>
          <p>Size 338 x 190 px</p>

        </div>
      );
    }
  }
  updateLogo(files) {
    var logo = files[0];
    this.setState({logo: logo});
  }
  updateListingImage(files) {
    var img = files[0];
    this.setState({listingImage: img});
  }

  saveCompanyOverview() {
    var content = {};
    var contentTeam = [];
    var teamPhotos = [];

    this.state.team.forEach((member) => {
      contentTeam.push({
        name: member.name,
        role: member.role,
        intro: member.intro,
        photoName: (member.photo ? member.photo.name : member.savedPhoto)
      });
      if(member.photo) {
        teamPhotos.push(member.photo);
      }
    });

    content.randID = this.props.randID;
    content.shortDesc = this.refs.shortDesc.value;
    content.team = contentTeam;
    content.videoUrl = this.refs.videoUrl.value;
    content.slogan = this.refs.slogan.value;

    if(this.state.logo) {
      content.logoName = this.state.logo.name;
    }
    else if (this.props.company.Logo) {
      content.savedLogoName = this.props.company.Logo;
    }

    if(this.state.listingImage) {
      content.listingImageName = this.state.listingImage.name;
    }
    else if (this.props.company.ListingImage) {
      content.savedListingImageName = this.props.company.ListingImage;
    }

    this.props.SaveCompanyOverview(content, this.state.logo, this.state.listingImage, teamPhotos);
  }

  render() {
    const { company } = this.props;

    if(!company) {
      return <div>Loading...</div>;
    }

    return (
      <div className="company-create-overview content">
        <div className="container-fluid">

          <div className="row">
            <div className="col-md-10 col-md-offset-1 segment add-padding">
              <h3>Company overview</h3>
              <div className="row">
                <div className="col-sm-4">
                  <div className="form-group">
                    <label for="shortDesc">Short blurb</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      placeholder="How do you describe your company in one tweet?"
                      defaultValue={company.DescriptionShort}
                      ref="shortDesc"
                      id="shortDesc" />
                  </div>
                </div>

                <div className="col-sm-2">
                  <label>Company logo</label>
                  <Dropzone
                    className="drop-image"
                    multiple={false}
                    onDrop={this.updateLogo}>
                    {
                      this.displayLogo()
                    }
                  </Dropzone>
                </div>

                <div className="col-sm-2">
                  <label>Listing image</label>
                  <Dropzone
                    className="drop-image"
                    multiple={false}
                    onDrop={this.updateListingImage}>
                    {
                      this.displayListingImage()
                    }
                  </Dropzone>
                </div>

                <div className="col-sm-4 video-slogan">
                  <div className="row">
                    <div className="col-sm-12">
                      <label>Introduction video</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="www.youtube.com/watch?v=awesome-video*"
                        defaultValue={company.Video}
                        ref="videoUrl"/>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-12">
                      <label>Company slogan</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Revolutionize the future."
                        defaultValue={company.Slogan}
                        ref="slogan"/>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1 segment add-padding">
              <h3>Your team</h3>
              <FieldList
                fieldContents={this.state.team}
                update={this.updateTeam}
                updateTexts={this.updateTeamTexts}
                savedTeam={this.props.company.Team}/>
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
    randID: state.router.params.randID,
    company: state.CompanyState.companyDetails
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({SaveCompanyOverview: SaveCompanyOverview, FetchCompanyByRandID: FetchCompanyByRandID}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCreateOverview);
