import request from 'superagent';

export const ACCOUNT_DOCUMENTS_UPLOAD_SUCCESS = 'ACCOUNT_DOCUMENTS_UPLOAD_SUCCESS';
export const ACCOUNT_DOCUMENTS_UPLOAD_FAILURE = 'ACCOUNT_DOCUMENTS_UPLOAD_FAILURE';

const ROOT_URL = 'http://localhost:8080';

function uploadSuccess(message) {
	return {
		type: ACCOUNT_DOCUMENTS_UPLOAD_SUCCESS,
		message
	}
}

function uploadFailure(message) {
	return {
		type: ACCOUNT_DOCUMENTS_UPLOAD_FAILURE,
		message
	}
}

export function uploadDocuments(files) {

	var req = request.post(`${ROOT_URL}/api/account/uploadkyc`).withCredentials();
	var filenamesJson = {};
	var filenames = [];


	files.forEach((file) => {
		filenames.push(file.name);
		req.attach(file.name, file);
	});

	//req.field('filenames', '{"valuearray": ["abc", "xyz"]}');

	filenamesJson.valuearray = filenames;
	req.field('filenames', JSON.stringify(filenamesJson))

	console.log(JSON.stringify(filenamesJson));

	return dispatch => {
		return req.end((err, res) => {
			console.log(err);
			console.log(res);
			dispatch(uploadSuccess(res));
		})
	}
}