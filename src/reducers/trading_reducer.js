import {
	OPEN_ORDER_SUCCESS, OPEN_ORDER_FAILURE
} from '../actions/trading_action';

export default function(
	state = {
		OpenOrderResult: ''	
	}, action){
		switch(action.type){
			case OPEN_ORDER_SUCCESS: 
				return Object.assign({}, state, {
					OpenOrderResult: action.data	
				});
			default:
				return state;
		}
}
