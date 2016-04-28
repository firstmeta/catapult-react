import {
	AUTH_TOKEN, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE
} from '../actions/login_action'

export default function(state = {
		isFetching: false,
		isLogined: localStorage.getItem(AUTH_TOKEN) ? true : false
	}, action) {

	switch (action.type) {
		case LOGIN_SUCCESS: 
			return Object.assign({}, state, {
				isLogined: true,
				isFetching: false
			});
		case LOGIN_FAILURE:
			return Object.assign({}, state, {
				isLogined: false,
				isFetching: true
			});
		default: 
			return state
	}
}