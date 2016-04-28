import request from 'superagent';
import { ROOT_URL } from './index'

export const AUTH_TOKEN = 'AUTH_TOKEN';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function loginSuccess() {
	return {
		type: LOGIN_SUCCESS,
		isFetching: false,
		isLogined: true
	}
}

function loginFailure() {
	return {
		type: LOGIN_FAILURE,
		isFetching: true,
		isLogined: false
	}
}

export function loginUser(creds) {

	console.log(ROOT_URL);

	var req = request
				.post(`${ROOT_URL}/api/login`)
				.withCredentials()
				.set('Content-Type', 'application/json')
				.accept('application/json')
				.send(creds);

	return dispatch => {
		return req.end((err, res) => {
			if (res.status === 200) {
				localStorage.setItem(AUTH_TOKEN, res.body.AuthToken)
				dispatch(loginSuccess());
			}
			else {
				dispatch(loginFailure());
			}
		});
	}
}