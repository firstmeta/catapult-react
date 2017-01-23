import {
	OPEN_ORDER_SUCCESS, OPEN_ORDER_FAILURE,
	MY_OPEN_ORDER, MY_DEALING_ORDER,
	ORDER_ASSET_TRANSFER_PREP,
	ALL_OPEN_SELL_ORDERS, ALL_OPEN_BUY_ORDERS
} from '../actions/trading_action';

export default function(
	state = {
		OpenOrderResult: '',
		AllMyOpenOrder: '',
		OrderAssetTransferPrep: ''
	}, action){
		switch(action.type){
			case OPEN_ORDER_SUCCESS: 
				return Object.assign({}, state, {
					OpenOrderResult: action.data	
				});
			case MY_OPEN_ORDER:
				return Object.assign({}, state, {
					AllMyOpenOrders: action.data
				});
			case MY_DEALING_ORDER:
				return Object.assign({}, state, {
					AllMyDealingOrders: action.data
				});
			case ORDER_ASSET_TRANSFER_PREP:
				return Object.assign({}, state, {
					OrderAssetTransferPrep: action.data
				});
			case ALL_OPEN_SELL_ORDERS: 
				return Object.assign({}, state, {
					AllOpenSellOrders: action.data
				});
			case ALL_OPEN_BUY_ORDERS: 
				return Object.assign({}, state, {
					AllOpenBuyOrders: action.data
				});
			default:
				return state;
		}
}
