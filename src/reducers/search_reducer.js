import {
	SEARCH_USER
} from '../actions/search_action'; 

export default function(
	state = {
		SearchUser: ''
	}, action) {
		switch(action.type) {
			case SEARCH_USER:
				return Object.assign({}, state, {
					SearchUser: action.data
				});
			default:
				return state;
		}
}
