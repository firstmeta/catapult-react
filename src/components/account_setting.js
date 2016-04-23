import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { uploadDocuments } from '../actions/account_action'


export default class AccountSettingUpload extends Component {

	constructor(props) {
		super(props);

		this.onDrop = this.onDrop.bind(this);
	}

	onDrop(files) {
		 //console.log('Received files: ', files);
		 this.props.uploadDocuments(files)
	}

	render() {
		return (
			<div>
				<Dropzone onDrop={this.onDrop} multiple={true}>
					<div>Try dropping some files here, or click to select files to upload.</div>
				</Dropzone>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({uploadDocuments}, dispatch);
}
export default connect(null, mapDispatchToProps)(AccountSettingUpload);