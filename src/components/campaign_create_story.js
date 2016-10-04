import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  AlloyEditor from 'alloyeditor';
import { FetchCampaignStory, SaveCampaignStory } from '../actions/campaign_action';
import { UploadEditorPublicImage } from '../actions/common_action';

class CampaignCreateStory extends Component {

  constructor(props) {
    super(props);

    this.uploadImage = this.uploadImage.bind(this);
    this.saveCampaignStory = this.saveCampaignStory.bind(this);
  }

  componentWillMount() {
    this.props.FetchCampaignStory(this.props.campaignRandID);
  }

  componentDidMount() {
    if(this.refs.campaignEditable && !this._editor) {
      this._editor = AlloyEditor.editable("campaignEditable");
      this._editor.get('nativeEditor')
                 .on('imageAdd', this.uploadImage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this._editor = AlloyEditor.editable("campaignEditable");
    this._editor.get('nativeEditor')
               .on('imageAdd', this.uploadImage);
  }

  uploadImage(event) {
    this.props.UploadEditorPublicImage(event, this.props.campaignRandID);
  }

  saveCampaignStory() {
    var ckEditor = this._editor.get('nativeEditor');
    this.props.SaveCampaignStory({
      campaignRandID: this.props.campaignRandID,
      story: ckEditor.getData()
    });
  }

  render() {

    const { story } = this.props;

    if(!story) {
      return <div>Loading...</div>;
    }

    return (
      <div className="campaign-create-story">

        <div className="container-fluid">

          <div className="row">
            <div className="col-md-10 col-md-offset-1 content">

            <div className="row row-centered">
              <div className="col-lg-1 col-centered">
                <h3>Every company has a story, tell the investors yours. Make it good!</h3>
                <hr />
              </div>
            </div>
              <div>
                <i>
                  You can modify your company's summary added previously or write a new story for this campaign.
                  Just <u><strong>click inside the text area</strong></u> to start typing.
                  If you want to add image, just drag and drop it into the text area :).
                </i>
              </div>
              <div
                className="editable"
                ref="campaignEditable"
                id="campaignEditable"
                dangerouslySetInnerHTML={{__html: story}}>
              </div>

            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1 segment row-last">
              <div className="row row-centered">
                <div className="col-lg-1 col-centered">
                <button
                  className="btn btn-primary btn-green btn-green-primary full-width"
                  onClick={this.saveCampaignStory}>
                  Save & Preview
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
    campaignRandID: state.router.params.campaignRandID,
    story: state.CampaignState.campaignStory
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchCampaignStory: FetchCampaignStory,
    SaveCampaignStory: SaveCampaignStory,
    UploadEditorPublicImage: UploadEditorPublicImage
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(CampaignCreateStory);
