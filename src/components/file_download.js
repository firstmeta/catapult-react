import React, { Component } from 'react';
import { connect } from 'react-redux';

class FileDownload extends Component {

  render() {

  const { companyFileDownloadUrl } = this.props;

    if(!companyFileDownloadUrl) {
      return <div></div>
    }

    return (
      <div className="file-download">
        <iframe src={companyFileDownloadUrl ? companyFileDownloadUrl : ""}></iframe>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    companyFileDownloadUrl: state.AdminState.companyFileDownloadUrl
  }
}
export default connect(mapStateToProps)(FileDownload);
