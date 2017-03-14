import request from 'superagent';
import { push } from 'redux-router';

import { AUTH_TOKEN } from './auth_action';
import { ROOT_URL } from '../config';
import { ValidateEmail } from './helper';

export const SEARCH_USER = 'SEARCH_USER';

export function SearchUserByEmail(email) {
	email = email.trim();

	if(!ValidateEmail(email)) {
		console.log('invalid email');
		return dispatch => {
			dispatch({
				type: SEARCH_USER,
				data: ''
			})
		}
	}

	var req = request
		.post(`${ROOT_URL}/api/secure/account/find_user_by_email`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.set('Content-Type', 'application/json')
		.accept('application/json')
		.send({email: email});

	return dispatch => {
		return req.end((err, res) => {
			if(res.status === 200) {
				dispatch({
					type: SEARCH_USER,
					data: res.body
				})
			}
			else {
				dispatch({
					type: SEARCH_USER,
					data: ''
				})
			}
		});
	}

}
