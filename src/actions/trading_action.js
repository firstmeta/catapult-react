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
export const MY_OPEN_ORDER = 'MY_OPEN_ORDER';
export const MY_DEALING_ORDER = 'MY_DEALING_ORDER';
export const ORDER_ASSET_TRANSFER_PREP = 'ORDER_ASSET_TRANSFER_PREP';

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
					content: res.body
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
					content: res.body.Message
				});	
			}
			else {
				dispatch({
					type: ALERT_ERROR,
					content: res.text
				});	

			}
		})
	}


}
export function FetchAllMyOpenOrder() {
	var	url = `${ROOT_URL}/api/secure/trading/fetchallmyopenorders` 

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
					content: data,
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
					content: data,
					type: ALERT_ERROR
				}))	
			}
		})
	}
}
