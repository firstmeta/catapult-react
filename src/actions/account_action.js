import request from 'superagent';
import { ROOT_URL } from '../config';
import { AlertGlobal, ALERT_SUCCESS, ALERT_ERROR } from './alert_action';

// Refactor: combine auth_action into account_action
import { loginSuccess, loginFailure, AUTH_TOKEN } from './auth_action';

export const ACCOUNT_SIGNUP_SUCCESS = 'ACCOUNT_SIGNUP_SUCCESS';
export const ACCOUNT_SIGNUP_FAILURE = 'ACCOUNT_SIGNUP_FAILURE';

export const ACCOUNT_DOCUMENTS_UPLOAD_SUCCESS = 'ACCOUNT_DOCUMENTS_UPLOAD_SUCCESS';
export const ACCOUNT_DOCUMENTS_UPLOAD_FAILURE = 'ACCOUNT_DOCUMENTS_UPLOAD_FAILURE';

export const SIGNUP_OPEN = 'SIGNUP_OPEN';
export const SIGNUP_CLOSE = 'SIGNUP_CLOSE';
export const LOGIN_OPEN = 'LOGIN_OPEN';
export const LOGIN_CLOSE = 'LOGIN_CLOSE';

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

export function OpenSignup() {
	return (dispatch) => {
		dispatch({type: SIGNUP_OPEN});
	}
}
export function CloseSignup() {
	return (dispatch) => {
		dispatch({type: SIGNUP_CLOSE});
	}
}
export function OpenLogin() {
	return (dispatch) => {
		dispatch({type: LOGIN_OPEN});
	}
}
export function CloseLogin() {
	return (dispatch) => {
		dispatch({type: LOGIN_CLOSE});
	}
}

export function VerifyEmail(email ,code) {
	var req = request
							.post(`${ROOT_URL}/api/account/verify_email`)
							.field('email', email)
							.field('code', code);

	return dispatch => {
		return req.end((err, res) => {
			if(res.status === 200) {
				dispatch(AlertGlobal({content: res.text, type: ALERT_SUCCESS}));
			}
			else {
				dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
			}
		})
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
