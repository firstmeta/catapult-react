import {
	MY_FINANCE_TXS, MY_ESCROW_BALANCES	
} from '../actions/finance_action';

export default function(
	state = {
		MyFinanceTXs: '',
		MyEscrowBalances: ''
	}, action) {
		switch(action.type) {
			case MY_FINANCE_TXS:
				return Object.assign({}, state, {
					MyFinanceTXs: action.data
				});
			case MY_ESCROW_BALANCES:
				return Object.assign({}, state, {
					MyEscrowBalances: action.data
				});
			default:
				return state;
		}	
}
