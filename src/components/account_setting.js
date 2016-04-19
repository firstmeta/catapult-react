import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent'

export default class AccountSettingUpload extends Component {

	onDrop(files) {
		 console.log('Received files: ', files);
	}

	render() {
		return (
			<div>
				<Dropzone onDrop={this.onDrop}>
					<div>Try dropping some files here, or click to select files to upload.</div>
				</Dropzone>
			</div>
		)
	}
}