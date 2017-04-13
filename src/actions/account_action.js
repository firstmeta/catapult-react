import request from 'superagent';
import { push } from 'redux-router';

import { ROOT_URL, BTC_NETWORK } from '../config';
import { AlertGlobal, AlertLocal, ALERT_SUCCESS, ALERT_ERROR } from './alert_action';

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
export const PWD_RESET_OPEN = 'PWD_RESET_OPEN';
export const PWD_RESET_CLOSE = 'PWD_RESET_CLOSE';

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
				dispatch(push('/settings/wallet'));
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
export function OpenPwdReset() {
	return (dispatch) => {
		dispatch({type: PWD_RESET_OPEN});
	}
}
export function ClosePwdReset() {
	return (dispatch) => {
		dispatch({type: PWD_RESET_CLOSE});
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

export function RequestResetPassword(email) {
	var req = request
							.post(`${ROOT_URL}/api/account/request_reset_password`)
							.field('email', email);

	return dispatch => {
		return req.end((err, res) => {
			if(res.status === 200) {
				dispatch(AlertGlobal({content: res.text, type: ALERT_SUCCESS}));
				dispatch(push('/account/reset_pwd'));
			}
			else {
				dispatch(AlertLocal({content: res.text, type: ALERT_ERROR}));
				dispatch({type: PWD_RESET_OPEN});
			}
		})
	}
}

export function ResetPassword(email, code, pwd, repwd) {
	if(pwd !== repwd) {
		return (dispatch) => {
			dispatch(AlertGlobal({content: 'Passwords do not match!', type: ALERT_ERROR}));
		}
	}

	var req = request
							.post(`${ROOT_URL}/api/account/reset_password`)
							.field('email', email)
							.field('code', code)
							.field('pwd', pwd);

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
