import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CampaignCreateStory extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="campaign-create-summary">
        <div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
              <h3>Every company has a story, tell the investors yours. Make it good!</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CampaignCreateStory;
