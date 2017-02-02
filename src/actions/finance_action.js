import request from 'superagent';
import { push } from 'redux-router';
import { AUTH_TOKEN } from './auth_action';
import { ROOT_URL } from '../config';
import { AlertGlobal, AlertLocal, ALERT_SUCCESS, ALERT_ERROR } from './alert_action';

export const MY_FINANCE_TXS = 'MY_FINANCE_TXS';
export const MY_ESCROW_BALANCES = 'MY_ESCROW_BALANCES';

export function FetchMyFinanceTXs() {
	var req = request
		.get(`${ROOT_URL}/api/secure/finance/fetchfinancetxs`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.accept('application/json');

	return dispatch => {
		return req.end((err, res) => {
			if(res.status === 200) {
				dispatch({
					type: MY_FINANCE_TXS,
					data: res.body
				})
			}
			else {
				dispatch(AlertGlobal({
					content: res.body,
					type: ALERT_ERROR
				}))
			}
		});
	}
}

export function FetchMyEscrowBalances() {
	var req = request
		.get(`${ROOT_URL}/api/secure/finance/fetchescrowbalances`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.accept('application/json');

	return dispatch => {
		return req.end((err, res) => {
			if(res.status === 200) {
				dispatch({
					type: MY_ESCROW_BALANCES,
					data: res.body
				})
			}
			else {
				dispatch(AlertGlobal({
					content: res.body,
					type: ALERT_ERROR
				}))
			}
		});
	}

}
