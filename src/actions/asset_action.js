import request from 'superagent';
import { push } from 'redux-router';
import { AUTH_TOKEN } from './auth_action';
import { AlertGlobal, AlertLocal, ALERT_SUCCESS, ALERT_ERROR } from './alert_action';
import { 
	ROOT_URL, 
	BTC_NETWORK, 
	BTC_API_URL, 
	ASSET_ISSUANCE_FEE, 
	ASSET_TRANSFER_FEE 
} from '../config';

var bitcoin = require('bitcoinjs-lib');
var script = bitcoin.script;
var address = bitcoin.address;

var CryptoJS = require("crypto-js");

export const FETCH_ASSET_BALANCES = 'FETCH_ASSET_BALANCES';
export const FETCH_ALL_ASSETS = 'FETCH_ALL_ASSETS';
export const FETCH_ASSET_TXS = 'FETCH_ASSET_TXS';
export const FETCH_BATCH_ASSET_TXS = 'FETCH_BATCH_ASSET_TXS';
export const FETCH_ASSET_ISSUING_TXS = 'FETCH_ASSET_ISSUING_TXS';

export const REDIRECT_ASSET_ISSUANCE_CONFIRMATION = 'REDIRECT_ASSET_ISSUANCE_CONFIRMATION';
export const PREPARE_ASSET_ISSUE_SUCCESS = 'PREPARE_ASSET_ISSUE_SUCCESS';
export const REDIRECT_ASSET_ISSUANCE_RESULT = 'REDIRECT_ASSET_ISSUANCE_RESULT';
export const ASSET_ISSUE_SUCCESS = 'ASSET_ISSUE_SUCCESS';
export const ASSET_ISSUE_FAILURE = 'ASSET_ISSUE_FAILURE';

export const REDIRECT_ASSET_TRANSFER_CONFIRMATION = 'REDIRECT_ASSET_TRANSFER_CONFIRMATION';
export const PREPARE_ASSET_TRANSFER_SUCCESS = 'PREPARE_ASSET_TRANSFER_SUCCESS';
export const REDIRECT_ASSET_TRANSFER_RESULT = 'REDIRECT_ASSET_TRANSFER_RESULT';
export const ASSET_TRANSFER_SUCCESS = 'ASSET_TRANSFER_SUCCESS';
export const ASSET_TRANSFER_FAILURE = 'ASSET_TRANSFER_FAILURE';

export const ASSET_BATCH_TRANSFER_CONFIRMATION = 'ASSET_BATCH_TRANSFER_CONFIRMATION'; 

export const ASSET_TX_UPDATED = 'ASSET_TX_UPDATED';

export function RedirectAssetConfirmation(assetData) {
  return dispatch => {
    dispatch({
      type: REDIRECT_ASSET_ISSUANCE_CONFIRMATION,
      data: assetData
    });
    dispatch(push('/assets/issuance?step=confirmation'));
  }
}

export function RedirectAssetIssuanceResult(issuedAsset) {
  return dispatch => {
    dispatch({
      type: REDIRECT_ASSET_ISSUANCE_RESULT,
      data: issuedAsset
    });
    dispatch(push('/assets/issuance?step=result'));
  }
}

export function RedirectAssetTransferConfirmation(transferringAsset) {
  return dispatch => {
    dispatch({
      type: REDIRECT_ASSET_TRANSFER_CONFIRMATION,
      data: transferringAsset
    });
    dispatch(push('/assets/transfer?step=confirmation'));
  }
}

export function RedirectAssetTransferResult(transferringAsset) {
  return dispatch => {
    dispatch({
      type: REDIRECT_ASSET_TRANSFER_RESULT,
      data: transferringAsset
    });
    dispatch(push('/assets/transfer?step=result'));
  }
}

export function RedirectAssetBatchTransferConfirmation(transferringAsset) {
  return dispatch => {
    dispatch({
      type: ASSET_BATCH_TRANSFER_CONFIRMATION,
      data: transferringAsset
    });
    dispatch(push('/assets/batchtransfer?step=confirmation'));
  }
}

export function InitializeAssetIssuance({
	issuer, name, code, amount, percentCompany, logoUrl, desc
}) {
	var assetPrepareReq = request
			.post(`${ROOT_URL}/api/secure/asset/initialize_asset_issuance_tx`)
				.set('Authorization', localStorage.getItem(AUTH_TOKEN))
        .set('Content-Type', 'application/json')
   		 	.accept('application/json')
				.send({
					asset_code: code,
					asset_name: name,
					issuer_name: issuer,
					desc: desc,
					logo_url: logoUrl,
					asset_amount: amount,
					percent_company: parseFloat(percentCompany)
				});

	return dispatch => {
		return assetPrepareReq.end((err, res) => {
			var data = res.body;
    	if(res.status === 200) {
				dispatch(AlertGlobal({content: res.text, type: ALERT_SUCCESS}));
				dispatch(push('/transaction-summary/assets'))
			}
			else {
      	dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
			}
		});	
	}
}

export function SignAndSendAssetIssuance({txID, wallet, pwd}) {
	var prikey = CryptoJS.AES.decrypt(wallet.EncryptedPrikey, pwd).toString(CryptoJS.enc.Utf8);

	if (!prikey) {
		return dispatch => {
			dispatch(AlertGlobal({
				content: 'Wrong decryption password. Please try again.',
				type: ALERT_ERROR
			}));
			dispatch({
				type: ASSET_TX_UPDATED,
				data: {
					TxID: txID,
					timestamp: Date.now()
				}
			});
		}	
	}

	var req = request
		.post(`${ROOT_URL}/api/secure/asset/prepare_asset_issuance_tx`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.set('Content-Type', 'application/json')
		.accept('application/json')
		.send({
			txid: txID
		});		

	return dispatch => {
		return req.end((err, res) => {
			if (res.status !== 200) {
				dispatch(AlertGlobal({
					content: res.body.Msg,
					type: ALERT_ERROR
				}));
				return;
			}
			
			var t = res.body;
			var keyPair = bitcoin.ECPair.fromWIF(prikey, BTC_NETWORK);
	  	var tx =  bitcoin.Transaction.fromHex(t.unsignedTxHex);
	  	var txb = bitcoin.TransactionBuilder.fromTransaction(tx, BTC_NETWORK);
	  	    txb.tx.ins.forEach(function(input, i) {
	  	      txb.sign(i, keyPair);
	  	    });
	  	var signedtx = txb.build();
	  	var signedtxhash = signedtx.getId();
			var signedtxhex = signedtx.toHex();

			var req2 = request
				.post(`${ROOT_URL}/api/secure/asset/proceed_asset_issuance_tx`)
				.set('Authorization', localStorage.getItem(AUTH_TOKEN))
				.set('Content-Type', 'application/json')
				.accept('application/json')
				.send({
					txid: txID,
					blockchainAssetId: t.blockchainAssetId,
					signedTxHash: signedtxhash,
					unsignedTxHex: t.unsignedTxHex,
					signedTxHex: signedtxhex,
					coloredOutputIndexes: t.coloredOutputIndexes,
				});

			return req2.end((err, res) => {
				dispatch({
					type: ASSET_TX_UPDATED,
					data: {
						TxID: txID,
						timestamp: Date.now()
					}
				});
				if(res.status === 200) {
    			dispatch(push('/assets/issuance?step=result'));
					
					dispatch(AlertGlobal({
						type: ALERT_SUCCESS,
						content: res.body.Msg
					}));
					
					dispatch({
      			type: REDIRECT_ASSET_ISSUANCE_RESULT,
						data: {
							name: t.assetName,
							amount: t.assetAmount,
							logoUrl: t.logoUrl,
							description: t.description,
							status: 'SUCCESS - Pending confirmation on blockchain.',
							blockchainAssetId: t.blockchainAssetId
						} 
					});
				}
				else {
					dispatch(AlertGlobal({
						type: ALERT_ERROR,
						content: res.body.Msg
					}));	
				}
			})

	
		});
	}
}

export function InitializeAssetBatchTransfer({transferringAsset}) {
	var receivers =  transferringAsset.receivers.map(r => {
		return {
			address: r.address,
			addressId: r.addressId,
			addressRandId: r.addressRandId,
			amount: r.value,
			assetId: transferringAsset.blockchainAssetID
		}
	});
	
	var params = {
		assetID: transferringAsset.assetID,
		blockchainAssetID: transferringAsset.blockchainAssetID,
		assetCode: transferringAsset.assetCode,
		receivers: receivers 
	}

	var req = request
		.post(`${ROOT_URL}/api/secure/asset/initialize_asset_batch_transfer_tx`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.set('Content-Type', 'application/json')
		.accept('application/json')
		.send(params);		
	
	return dispatch => {
		return req.end((err, res) => {
			if (res.status === 200) {
				dispatch(push('/transaction-summary/assets'))
				dispatch(AlertGlobal({
					content: res.body.Msg,
					type: ALERT_SUCCESS
				}));
			}
			else {
				dispatch(AlertGlobal({
					type: ALERT_ERROR,
					content: res.body.Msg
				}))
			}
		});
	}
}

export function SignAndSendBatchAssetTransfer({txID, wallet, pwd}) {
	var prikey = CryptoJS.AES.decrypt(wallet.EncryptedPrikey, pwd).toString(CryptoJS.enc.Utf8);

	if (!prikey) {
		return dispatch => {
			dispatch(AlertGlobal({
				content: 'Wrong decryption password. Please try again.',
				type: ALERT_ERROR
			}));
			dispatch({
				type: ASSET_TX_UPDATED,
				data: {
					TxID: txID,
					timestamp: Date.now()
				}
			});
		}	
	}

	var req = request
		.post(`${ROOT_URL}/api/secure/asset/prepare_asset_batch_transfer_tx`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.set('Content-Type', 'application/json')
		.accept('application/json')
		.send({
			blockchainTxID: txID
		});		

	return dispatch => {
		return req.end((err, res) => {
			if (res.status !== 200) {
				dispatch(AlertGlobal({
					content: res.body.Msg,
					type: ALERT_ERROR
				}));
				return;
			}
			
			var t = res.body;
			var keyPair = bitcoin.ECPair.fromWIF(prikey, BTC_NETWORK);
	  	var tx =  bitcoin.Transaction.fromHex(t.unsignedTxHex);
	  	var txb = bitcoin.TransactionBuilder.fromTransaction(tx, BTC_NETWORK);
	  	    txb.tx.ins.forEach(function(input, i) {
	  	      txb.sign(i, keyPair);
	  	    });
	  	var signedtx = txb.build();
	  	var signedtxhash = signedtx.getId();
			var signedtxhex = signedtx.toHex();

			var req2 = request
				.post(`${ROOT_URL}/api/secure/asset/proceed_asset_batch_transfer_tx`)
				.set('Authorization', localStorage.getItem(AUTH_TOKEN))
				.set('Content-Type', 'application/json')
				.accept('application/json')
				.send({
					blockchainTxID: txID,
					signedTxHash: signedtxhash,
					unsignedTxHex: t.unsignedTxHex,
					signedTxHex: signedtxhex,
					coloredOutputIndexes: t.coloredOutputIndexes,
				});

			return req2.end((err, res) => {
				dispatch({
					type: ASSET_TX_UPDATED,
					data: {
						TxID: txID,
						timestamp: Date.now()
					}
				});
				if(res.status === 200) {
					dispatch(AlertGlobal({
						type: ALERT_SUCCESS,
						content: res.body.Msg
					}));	
					dispatch(FetchBatchAssetTransferTXs());
					dispatch(FetchAssetTxs(wallet.ID));
				}
				else {
					dispatch(AlertGlobal({
						type: ALERT_ERROR,
						content: res.body.Msg
					}));	
				}
			})
		});
	}
}

function prepareAssetIssuanceTransaction({
  issuer, code, name, amount, imageUrl, desc, address, city, country,
  wallet, financeOutputTxid, financeOutputAmount, vout
}) {
  return {
    'issueAddress': wallet.Address,
    'amount': amount,
    'divisibility': 0,
    'fee': ASSET_ISSUANCE_FEE,
    'reissueable':false,
    'financeOutput': {
        value: financeOutputAmount,
        n: vout,
        scriptPubKey: {
          asm: wallet.ASM,
          hex: wallet.ScriptPubkey,
          type: 'scripthash'
        }
    },
    'financeOutputTxid': financeOutputTxid,
    'transfer': [{
    	'address': wallet.Address,
    	'amount': amount
    }],
    'metadata': {
        'assetCode': code,
        'assetName': name,
        'issuer': issuer,
        'description': name,
        'urls': [{name:'icon', url: imageUrl, mimeType: 'image/png', dataHash: ''}],
        'userData': {
            'meta' : [
                {key: 'Code', value: code, type: 'String'},
                {key: 'Address', value: address + ', ' + city + ', ' + country, type: 'String'}
            ]
        }
    }
  }
}

function prepareAssetTransferTx({
  wallet, toAddr, blockchainAssetID, amount,
  financeOutputTxid, financeOutputAmount, vout
}) {
    return {
      'fee': ASSET_TRANSFER_FEE,
      'from': [wallet.Address],
      'financeOutput': {
          value: financeOutputAmount,
          n: vout,
          scriptPubKey: {
            asm: wallet.ASM,
            hex: wallet.ScriptPubkey,
            type: 'scripthash'
          }
      },
      'financeOutputTxid': financeOutputTxid,
      'to': [{
      	'address': toAddr,
      	'amount': amount,
          'assetId': blockchainAssetID
      }]
    }
}

export function FetchAllAssets() {
  var req = request
              .get(`${ROOT_URL}/api/asset/fetch_all_assets`)
              .accept('application/json');
  return dispatch => {
    return req.end((err, res) => {
			if (res.status === 200) {
				var assetList = res.body;
				var assetMap = {};

				for(var i = 0; i < assetList.length; i++) {
					assetMap[assetList[i].Code] = assetList[i];
				}

        dispatch({
          type: FETCH_ALL_ASSETS,
					data: {
						list: assetList,
						map: assetMap
					} 
        });
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    });
  }
}

export function FetchAssetBalances() {
  var req = request
              .get(`${ROOT_URL}/api/secure/asset/fetch_asset_balances`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .accept('application/json');
  return dispatch => {
    return req.end((err, res) => {
      if (res.status === 200) {
        dispatch({
          type: FETCH_ASSET_BALANCES,
          data: res.body
        });
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    });
  }
}

export function FetchAssetTxs(assetAddressID) {
  var req = request
              .post(`${ROOT_URL}/api/secure/asset/fetch_asset_txs`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .field('addr_id', assetAddressID)
              .accept('application/json');
  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch({
          type: FETCH_ASSET_TXS,
          data: res.body
        });
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    })
  }
}

export function FetchBatchAssetTransferTXs() {
	var req = request
		.get(`${ROOT_URL}/api/secure/blockchain/fetch_batch_blockchain_txs`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.accept('application/json');

	return dispatch => {
		return req.end((err, res) => {
			if (res.status === 200 && res.body) {
				dispatch({
					type: FETCH_BATCH_ASSET_TXS,
					data: res.body
				});
			}
		});
	}
}

export function FetchAssetIssuingTXs() {
	var req = request
		.get(`${ROOT_URL}/api/secure/asset/fetch_asset_issuing_txs`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.accept('application/json');

	return dispatch => {
		return req.end((err, res) => {
			if (res.status === 200 && res.body) {
				dispatch({
					type: FETCH_ASSET_ISSUING_TXS,
					data: res.body
				});
			}
		});
	}

}
