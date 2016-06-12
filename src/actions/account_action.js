import request from 'superagent';
import { ROOT_URL } from '../config';

// Refactor: combine auth_action into account_action
import { loginSuccess, loginFailure, AUTH_TOKEN } from './auth_action';

export const ACCOUNT_SIGNUP_SUCCESS = 'ACCOUNT_SIGNUP_SUCCESS';
export const ACCOUNT_SIGNUP_FAILURE = 'ACCOUNT_SIGNUP_FAILURE';

export const ACCOUNT_DOCUMENTS_UPLOAD_SUCCESS = 'ACCOUNT_DOCUMENTS_UPLOAD_SUCCESS';
export const ACCOUNT_DOCUMENTS_UPLOAD_FAILURE = 'ACCOUNT_DOCUMENTS_UPLOAD_FAILURE';

function signupSuccess() {
	return {
		type: ACCOUNT_SIGNUP_SUCCESS
	}
}
function signupFailure() {
	return {
		type: ACCOUNT_SIGNUP_FAILURE
	}
}
export function signupAccount(creds) {
	var req = request
				.post(`${ROOT_URL}/api/signup`)
				.set('Content-Type', 'application/json')
				.accept('application/json')
				.send(creds);

	return dispatch => {
		return req.end((err, res) => {
			if (res.status === 200) {
				localStorage.setItem(AUTH_TOKEN, res.body.AuthToken);
				dispatch(signupSuccess());
				dispatch(loginSuccess());
			}
			else {
				dispatch(signupFailure());
			}
		});
	}
}


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
