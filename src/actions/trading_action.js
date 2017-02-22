import request from 'superagent';
import { push } from 'redux-router';
import { AUTH_TOKEN } from './auth_action';
import { ROOT_URL, BTC_NETWORK, BTC_API_URL, ASSET_ISSUANCE_FEE, ASSET_TRANSFER_FEE } from '../config';
import { AlertGlobal, AlertLocal, ALERT_SUCCESS, ALERT_ERROR } from './alert_action';

var bitcoin = require('bitcoinjs-lib');
var script = bitcoin.script;
var address = bitcoin.address;

var CryptoJS = require("crypto-js");

export const OPEN_ORDER_SUCCESS = 'OPEN_ORDER_SUCCESS';
export const OPEN_ORDER_FAILURE = 'OPEN_ORDER_FAILURE';
export const ORDER_UPDATED = 'ORDER_UPDATED';
export const MY_OPEN_ORDER = 'MY_OPEN_ORDER';
export const MY_DEALING_ORDER = 'MY_DEALING_ORDER';
export const ORDER_ASSET_TRANSFER_PREP = 'ORDER_ASSET_TRANSFER_PREP';
export const ALL_OPEN_SELL_ORDERS = 'ALL_OPEN_SELL_ORDERS';
export const ALL_OPEN_BUY_ORDERS = 'ALL_OPEN_BUY_ORDERS';

export function OpenOrder({type, assetCode, amount, price, total, moneyCode, pwd}) {
	var params = {
		asset_code: assetCode,
		asset_amount: amount,
		money_code: moneyCode,
		money_net: total,
		price_net: price
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
				dispatch({
					type: ORDER_UPDATED,
					data: {
						orderid: '0000000',
						timestamp: Date.now()
					}
				});

				dispatch(AlertGlobal({
					content: res.body.Msg,
					type: ALERT_ERROR
				}));
			}
		})
	}
}
export function MakeBuyAssetOffer({orderid, pwd}) {
	var params = {
		orderid: orderid,
		password: pwd
	}

	var req = request
		.post(`${ROOT_URL}/api/secure/trading/makebuyassetoffer`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.set('Content-Type', 'application/json')
		.accept('application/json')
		.send(params);

	return dispatch => {
		return req.end((err, res) => {
			dispatch({
				type: ORDER_UPDATED,
				data: {
					orderid: orderid,
					timestamp: Date.now()
				}
			});

			if(res.status === 200) {
				dispatch(AlertGlobal({
					type: ALERT_SUCCESS,
					content: res.body.Msg
				}));
				dispatch(push('/transaction-summary/trades'))

			}
			else {
				dispatch(AlertGlobal({
					type: ALERT_ERROR,
					content: res.body.Msg
				}));
			}
		})
	}

}
export function AcceptBuyAssetOffer({orderid}){
	var params = {
		order_id: orderid
	}
	var req = request
							.post(`${ROOT_URL}/api/secure/trading/acceptbuyassetoffer`)
							.set('Authorization', localStorage.getItem(AUTH_TOKEN))
							.set('Content-Type', 'application/json')
							.accept('application/json')
							.send(params);
	return dispatch => {
		return req.end((err, res) => {
			if(res.status === 200) {
				dispatch({
					type: ORDER_ASSET_TRANSFER_PREP,
					data: res.body
				})
			}
			else {
				dispatch(AlertGlobal({
					type: ALERT_ERROR,
					content: res.body.Msg
				}))
			}
		})
	}	
}
export function TransferTokenForAssetOrder({
	wallet, orderid, amount, assetCode, assetId, blockchainAssetId,
	fromAddr, fromAddrId, fromAddrRandId, unsignedTxHex, coloredOutputIndexes,
	toAddr, toAddrId, toAddrRandId, fundingAddrRandId, pwd
}){
	var prikey = CryptoJS.AES.decrypt(wallet.EncryptedPrikey, pwd).toString(CryptoJS.enc.Utf8);
  var keyPair = bitcoin.ECPair.fromWIF(prikey, BTC_NETWORK);
  var tx =  bitcoin.Transaction.fromHex(unsignedTxHex);
  var txb = bitcoin.TransactionBuilder.fromTransaction(tx, BTC_NETWORK);
      txb.tx.ins.forEach(function(input, i) {
        txb.sign(i, keyPair);
      });


  var signedtx = txb.build();
  var signedtxhash = signedtx.getId();
	var signedtxhex = signedtx.toHex();

	var req = request
		.post(`${ROOT_URL}/api/secure/trading/transfertokenforassetorder`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
    .set('Content-Type', 'application/json')
		.accept('application/json')
		.send({
			"amount": amount,
			"asset_code": assetCode,
			"asset_id": assetId,
			"blockchain_asset_id": blockchainAssetId, 
			"from_addr": fromAddr,
			"from_addr_id": fromAddrId,
			"from_addr_rand_id": fromAddrRandId,
			"funding_addr_rand_id": fundingAddrRandId,
			"order_id": orderid,
			"blockchaintx_hex": signedtxhex,
			"blockchaintx_hash": signedtxhash,
			"colored_output_indexes": coloredOutputIndexes,
			"to_addr": toAddr,
			"to_addr_id": toAddrId,
			"to_addr_rand_id": toAddrRandId 
		});
	
	return dispatch => {
		return req.end((err, res) => {
			if(res.status === 200) {
				dispatch({
					type: ALERT_SUCCESS,
					content: res.body.Msg
				});	
			}
			else {
				dispatch({
					type: ALERT_ERROR,
					content: res.body.Msg
				});	

			}
		})
	};
}

export function SignAndTransferTokenForOrder({orderid, wallet, pwd}){
	var params = {
		order_id: orderid
	}
	var req = request
							.post(`${ROOT_URL}/api/secure/trading/acceptbuyassetoffer`)
							.set('Authorization', localStorage.getItem(AUTH_TOKEN))
							.set('Content-Type', 'application/json')
							.accept('application/json')
							.send(params);
	return dispatch => {	
		return req.end((err, res) => {
			if (res.status !== 200) {
				dispatch({
					type: ORDER_UPDATED,
					data: {
						orderid: orderid,
						timestamp: Date.now()
					} 
				});

				dispatch(AlertGlobal({
					content: res.body.Msg,
					type: ALERT_ERROR
				}));
				return
			}	
			
			var t = res.body;
			var prikey = CryptoJS.AES.decrypt(wallet.EncryptedPrikey, pwd).toString(CryptoJS.enc.Utf8);
	  	var keyPair = bitcoin.ECPair.fromWIF(prikey, BTC_NETWORK);
	  	var tx =  bitcoin.Transaction.fromHex(t.prepared_tx);
	  	var txb = bitcoin.TransactionBuilder.fromTransaction(tx, BTC_NETWORK);
	  	    txb.tx.ins.forEach(function(input, i) {
	  	      txb.sign(i, keyPair);
	  	    });
	
	
	  	var signedtx = txb.build();
	  	var signedtxhash = signedtx.getId();
			var signedtxhex = signedtx.toHex();
	
			var req2 = request
				.post(`${ROOT_URL}/api/secure/trading/transfertokenforassetorder`)
				.set('Authorization', localStorage.getItem(AUTH_TOKEN))
	  	  .set('Content-Type', 'application/json')
				.accept('application/json')
				.send({
					"amount": t.amount,
					"asset_code": t.asset_code,
					"asset_id": t.asset_id,
					"blockchain_asset_id": t.blockchain_asset_id, 
					"from_addr": t.from_addr,
					"from_addr_id": t.from_addr_id,
					"from_addr_rand_id": t.from_addr_rand_id,
					"funding_addr_rand_id": t.funding_addr_rand_id,
					"order_id": orderid,
					"blockchaintx_hex": signedtxhex,
					"blockchaintx_hash": signedtxhash,
					"colored_output_indexes": t.colored_output_indexes,
					"to_addr": t.to_addr,
					"to_addr_id": t.to_addr_id,
					"to_addr_rand_id": t.to_addr_rand_id 
				});
			
			return req2.end((err, res) => {
				dispatch({
					type: ORDER_UPDATED,
					data: {
						orderid: orderid,
						timestamp: Date.now()
					}
				});

				if(res.status === 200) {
					dispatch(AlertGlobal({
						type: ALERT_SUCCESS,
						content: res.body.Msg
					}));	
					dispatch(push('/transaction-summary/trades'));
					dispatch(FetchAllMyDealingOrder());
				}
				else {
					dispatch(AlertGlobal({
						type: ALERT_ERROR,
						content: res.body.Msg
					}));	
				}

			});
			
		});
	}
}

export function CancelOpenedOrder({orderid, orderType}) {
	var url = orderType === 'sell' ? 
		`${ROOT_URL}/api/secure/trading/cancelopenedsellorder`
		:`${ROOT_URL}/api/secure/trading/cancelopenedbuyorder`;

	var req = request
		.post(url)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.set('Content-Type', 'application/json')
		.accept('application/json')
		.send({orderid: orderid});

	return dispatch => {
		return req.end((err, res) => {
			if (res.status === 200) {
				dispatch(AlertGlobal({
					content: res.body.Msg,
					type: ALERT_SUCCESS
				}));
				
				dispatch(FetchAllMyOpenOrder());
			}
			else {
				dispatch(AlertGlobal({
					content: res.body.Msg,
					type: ALERT_ERROR
				}))	
			}
		})
	}

}

export function FetchAllMyOpenOrder() {
	var	url = `${ROOT_URL}/api/secure/trading/fetchallmyopenorders`; 

	var req = request
		.get(url)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.accept('application/json')

	return dispatch => {
		return req.end((err, res) => {
			if(res.status === 200) {
				dispatch({
					type: MY_OPEN_ORDER,
					data: res.body
				})
			}
			else {
				dispatch(AlertGlobal({
					content: res.body.Msg,
					type: ALERT_ERROR
				}))	
			}
		})
	}
}

export function FetchAllMyDealingOrder() {
	var	url = `${ROOT_URL}/api/secure/trading/fetchallmydealingorders` 

	var req = request
		.get(url)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.accept('application/json')

	return dispatch => {
		return req.end((err, res) => {
			if(res.status === 200) {
				dispatch({
					type: MY_DEALING_ORDER,
					data: res.body
				})
			}
			else {
				dispatch(AlertGlobal({
					content: res.body.Msg,
					type: ALERT_ERROR
				}))	
			}
		})
	}
}

export function FetchAllOpenOrders(assetCode, orderType) {
	var req = request
		.post(`${ROOT_URL}/api/trading/fetchallopenorders`)
    .set('Content-Type', 'application/json')
		.accept('application/json')
		.send({asset_code: assetCode,  order_type: orderType})

	return dispatch => {
		return req.end((err, res) => {
			if(res.status === 200) {
				dispatch({
					type: (orderType == 'sell' ?  ALL_OPEN_SELL_ORDERS : ALL_OPEN_BUY_ORDERS),
					data: res.body
				})
			}
			else {
				dispatch(AlertGlobal({
					content: res.body.Msg,
					type: ALERT_ERROR
				}))
			}
		})
	}
}


