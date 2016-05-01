import {
	AUTH_TOKEN, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS
} from '../actions/auth_action'

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
		case LOGOUT_SUCCESS: 
			return Object.assign({}, state, {
				isLogined: false,
				isFetching: false
			});
		default: 
			return state
	}
}