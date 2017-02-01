import {
	MY_FINANCE_TXS	
} from '../actions/finance_action';

export default function(
	state = {
		MyFinanceTXs: ''	
	}, action) {
		switch(action.type) {
			case MY_FINANCE_TXS:
				return Object.assign({}, state, {
					MyFinanceTXs: action.data
				});
			default:
				return state;
		}	
}
