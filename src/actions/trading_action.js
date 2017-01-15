import request from 'superagent';
import { push } from 'redux-router';
import { AUTH_TOKEN } from './auth_action';
import { ROOT_URL } from '../config';
import { AlertGlobal, AlertLocal, ALERT_SUCCESS, ALERT_ERROR } from './alert_action';

export const OPEN_ORDER_SUCCESS = 'OPEN_ORDER_SUCCESS';
export const OPEN_ORDER_FAILURE = 'OPEN_ORDER_FAILURE';

export function OpenOrder({type, assetCode, amount, price, total, moneyCode, pwd}) {
	var params = {
		asset_code: assetCode,
		asset_amount: amount,
		money_code: moneyCode,
		money_net: total
	};
	if (type === 'buy') {
		params.password = pwd;
	}
	
	var url = `${ROOT_URL}/api/secure/trading/` + 
							(type === 'sell' ? 'makesellassetorder' : 'makeassetbuyorder');
	
	var req = request
							.post(url)
							.set('Authorization', localStorage.getItem(AUTH_TOKEN))
							.set('Content-Type', 'application/json')
							.accept('application/json')
							.send(params);

	return dispatch => {
		return req.end((err, res) => {
			var data = res.body;
			if(res.status === 200) {
				data.status = 'success';
				dispatch({
					type: OPEN_ORDER_SUCCESS,
					data: data
				});
				dispatch(push('/asset/order/success'))
			}
			else {
				dispatch(AlertGlobal({
					content: data,
					type: ALERT_ERROR
				}));
			}
		})
	}

}
