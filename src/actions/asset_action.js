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


export function RedirectAssetConfirmation(assetData) {
  return dispatch => {
    dispatch({
      type: REDIRECT_ASSET_ISSUANCE_CONFIRMATION,
      data: assetData
    });
    dispatch(push('/assets/issuance?step=confirmation'));
  }
}

export function RedirectAssetIssuanceResult(issuingAsset) {
  return dispatch => {
    dispatch({
      type: REDIRECT_ASSET_ISSUANCE_RESULT,
      data: issuingAsset
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

export function PrepareIssueAsset({
	issuer, name, code, amount, logoUrl, desc, address, city, country, wallet}) {

	var assetPrepareReq = request
			.post(`${ROOT_URL}/api/secure/asset/prepare_asset_issuance_tx`)
				.set('Authorization', localStorage.getItem(AUTH_TOKEN))
        .set('Content-Type', 'application/json')
   		 	.accept('application/json')
				.send({
					asset_code: code,
					asset_name: name,
					issuer: issuer,
					desc: desc,
					logo_url: logoUrl,
					amount: amount
				});

	return dispatch => {
		return assetPrepareReq.end((err, res) => {
			var data = res.body;
    	if(res.status === 200) {
				if(data.txHex) {
       		data.assetAddressRandID = wallet.RandID;
          data.assetAddress = wallet.Address;
          data.code = code;
          data.name = name;
          data.amount = amount;
          data.logoUrl = logoUrl;
					data.desc = desc;
					//data.metadata = issueTx.metadata;

           dispatch({type: PREPARE_ASSET_ISSUE_SUCCESS, data: data});
        }
        else {
          dispatch(AlertGlobal({
            content: data.message + ', ' + data.explanation,
            type: ALERT_ERROR
          }));
        }
			}
			else {
      	dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
			}
		});	
	}
}
export function PrepareIssueAsset2({issuer, name, amount, imageUrl, desc, address, city, country, wallet}) {

  var addr = wallet.Address;
  var req = request
              .get(`${BTC_API_URL}/addr/${addr}/utxo`)
              .accept('application/json');
  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        var utxos = res.body;
        var financeUtxo;
        for(var i = 0; i < utxos.length; i++) {
          var utxo = utxos[i];
          if(utxo.satoshis >= 5000) {
            financeUtxo = utxo;
            break;
          }
        }

        if(!financeUtxo) {
          dispatch(AlertGlobal({
            content: 'Unsufficent bitcoin to issue asset!!!',
            type: ALERT_ERROR
          }));
          return;
        }

        //TO DO: Adding random character to prevent collision
        var code = name.toUpperCase().replace(/\s/g, '').slice(0, 4);

        var issueTx = prepareAssetIssuanceTransaction({
            issuer: issuer,
            code: code,
            name: name,
            amount: amount,
            imageUrl: imageUrl,
            desc: desc,
            address: address,
            country: country,
            city: city,
            wallet: wallet,
            financeOutputTxid: financeUtxo.txid,
            financeOutputAmount: financeUtxo.satoshis,
            vout: financeUtxo.vout
        });

        var assetPrepareReq = request
                                .post(`${ROOT_URL}/api/asset/preparetx`)
                                .accept('application/json')
                                .field('json_tx', JSON.stringify(issueTx))
                                .field('end_point', 'issue');
        assetPrepareReq.end((err, res) => {
          var data = JSON.parse(res.text);
          if(res.status === 200) {
            if(data.txHex) {
              data.assetAddressRandID = wallet.RandID;
              data.assetAddress = wallet.Address;
              data.code = code;
              data.name = name;
              data.amount = amount;
              data.imageUrl = imageUrl;
              data.desc = desc;
              data.metadata = issueTx.metadata;

              dispatch({type: PREPARE_ASSET_ISSUE_SUCCESS, data: data});
            }
            else {
              dispatch(AlertGlobal({
                content: data.message + ', ' + data.explanation,
                type: ALERT_ERROR
              }));
            }
          }
          else {
            dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
          }

        });
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    });
  }

}

export function ProceedAssetIssuance({
  code, name, issuedAmount, iconUrl,
  desc, blockchainAssetId,
  issuedAddress, issuedAddressID, issuedAddressRandID,
  unsignedtxhex, coloredOutputIndexes, fundingAddrRandId,
  encryptedPrikey, pwd
}) {

  var prikey = CryptoJS.AES.decrypt(encryptedPrikey, pwd).toString(CryptoJS.enc.Utf8);
  var keyPair = bitcoin.ECPair.fromWIF(prikey, BTC_NETWORK);
  var tx =  bitcoin.Transaction.fromHex(unsignedtxhex);
  var txb = bitcoin.TransactionBuilder.fromTransaction(tx, BTC_NETWORK);
      //txb.sign(0, keyPair);
      txb.tx.ins.forEach(function(input, i) {
        txb.sign(i, keyPair);
      });

  var signedtx = txb.build();
  var signedtxhash = signedtx.getId();
  var signedtxhex = signedtx.toHex();

  var req = request
              .post(`${ROOT_URL}/api/secure/asset/issue_asset`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .set('Content-Type', 'application/json')
              .accept('application/json')
              .send({
                code: code,
                name: name,
                issued_amount: parseInt(issuedAmount),
                blockchain_asset_id: blockchainAssetId,
                blockchaintx_hash: signedtxhash,
                blockchaintx_hex: signedtxhex,
                issued_address: issuedAddress,
                issued_address_id: issuedAddressID,
                issued_address_rand_id: issuedAddressRandID,
								colored_output_indexes: coloredOutputIndexes,
								funding_addr_rand_id: fundingAddrRandId
              });
  return dispatch => {
    return req.end((err, res) => {
      if (res.status === 200) {
        dispatch({
          type: ASSET_ISSUE_SUCCESS,
          data: {
            name: name,
            amount: issuedAmount,
            iconUrl: iconUrl,
            desc: desc,
            assetId: blockchainAssetId,
            status: 'SUCCESS - Pending confirmation on blockchain.'
          }
        });
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
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
		}	
	}

	console.log(txID);
	console.log(pwd);

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
				if(res.status === 200) {
					dispatch(AlertGlobal({
						type: ALERT_SUCCESS,
						content: res.body.Msg
					}));	
					//dispatch(push('/transaction-summary/assets'));
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

export function ProceedBatchAssetTransfer({transferringAsset, wallet, pwd}) {
	var prikey = CryptoJS.AES.decrypt(wallet.EncryptedPrikey, pwd).toString(CryptoJS.enc.Utf8);

	if (!prikey) {
		return dispatch => {
			dispatch(AlertGlobal({
				content: 'Wrong decryption password. Please try again.',
				type: ALERT_ERROR
			}));
		}	
	}

	var receivers =  transferringAsset.receivers.map(r => {
		return {
			address: r.address,
			addressId: r.addressId,
			addressRandId: r.addressRandId,
			amount: r.value,
			assetId: transferringAsset.blockchainAssetID
		}
	})

	var params = {
		assetID: transferringAsset.assetID,
		blockchainAssetID: transferringAsset.blockchainAssetID,
		assetCode: transferringAsset.assetCode,
		receivers: receivers 
	}

	var req = request
		.post(`${ROOT_URL}/api/secure/asset/prepare_asset_batch_transfer_tx`)
		.set('Authorization', localStorage.getItem(AUTH_TOKEN))
		.set('Content-Type', 'application/json')
		.accept('application/json')
		.send(params);		

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
	  	var tx =  bitcoin.Transaction.fromHex(t.txHex);
	  	var txb = bitcoin.TransactionBuilder.fromTransaction(tx, BTC_NETWORK);
	  	    txb.tx.ins.forEach(function(input, i) {
	  	      txb.sign(i, keyPair);
	  	    });
	  	var signedtx = txb.build();
	  	var signedtxhash = signedtx.getId();
			var signedtxhex = signedtx.toHex();
			
			var ta = transferringAsset;
			var req2 = request
				.post(`${ROOT_URL}/api/secure/asset/proceed_asset_batch_transfer_tx`)
				.set('Authorization', localStorage.getItem(AUTH_TOKEN))
				.set('Content-Type', 'application/json')
				.accept('application/json')
				.send({
					assetID: ta.assetID,
					assetCode: ta.assetCode,
					blockchainAssetID: ta.blockchainAssetID,
					blockchainTxHash: signedtxhash,
					blockchainTxHex: signedtxhex,
					fundingAddressRandID: t.fundingAddressRandID,
					coloredOutputIndexes: t.coloredOutputIndexes,
					receivers: receivers
				});

			return req2.end((err, res) => {
				if(res.status === 200) {
					dispatch(AlertGlobal({
						type: ALERT_SUCCESS,
						content: res.body.Msg
					}));	
					//dispatch(push('/transaction-summary/assets'));
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

export function PrepareTransferAsset({
  wallet, assetID, assetCode, assetName, blockchainAssetID, amount, toAddr
}) {
  var addr = wallet.Address;
  var req = request
              .get(`${BTC_API_URL}/addr/${addr}/utxo`)
              .accept('application/json');
  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        var utxos = res.body;
        var financeUtxo;
        for(var i = 0; i < utxos.length; i++) {
          var utxo = utxos[i];
          if(utxo.satoshis >= 5000) {
            financeUtxo = utxo;
            break;
          }
        }

        if(!financeUtxo) {
          dispatch(AlertGlobal({
            content: 'Unsufficent bitcoin to issue asset!!!',
            type: ALERT_ERROR
          }));
          return;
        }

        var transferTx = prepareAssetTransferTx({
          wallet: wallet,
          toAddr: toAddr,
          blockchainAssetID: blockchainAssetID,
          amount: parseInt(amount),
          financeOutputTxid: financeUtxo.txid,
          financeOutputAmount: financeUtxo.satoshis,
          vout: financeUtxo.vout
        });

        var transferPrepareReq = request
                                .post(`${ROOT_URL}/api/asset/preparetx`)
                                .accept('application/json')
                                .field('json_tx', JSON.stringify(transferTx))
                                .field('end_point', 'sendasset');
        transferPrepareReq.end((err, res) => {
          var data = JSON.parse(res.text);
          if(res.status === 200) {
            if(data.txHex) {
              data.assetID = assetID;
              data.blockchainAssetID = blockchainAssetID;
              data.assetCode = assetCode;
              data.assetName = assetName;
              data.amount = amount;
              data.toAddr = toAddr;

              dispatch({type: PREPARE_ASSET_TRANSFER_SUCCESS, data: data});
            }
            else {
              dispatch(AlertGlobal({
                content: data.message + ', asset: ' + data.asset,
                type: ALERT_ERROR
              }));
            }
          }
          else {
            dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
          }
        });
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    });
  }
}

export function ProceedAssetTransfer({
  blockchainAssetID, assetID, assetCode,
  assetName, fromAdrr, toAddr, amount, unsignedtxhex,
  wallet, pwd, coloredOutputIndexes
}) {

  var prikey = CryptoJS.AES.decrypt(wallet.EncryptedPrikey, pwd).toString(CryptoJS.enc.Utf8);
  var keyPair = bitcoin.ECPair.fromWIF(prikey, BTC_NETWORK);
  var tx =  bitcoin.Transaction.fromHex(unsignedtxhex);
  var txb = bitcoin.TransactionBuilder.fromTransaction(tx, BTC_NETWORK);
      txb.tx.ins.forEach(function(input, i) {
        txb.sign(i, keyPair);
      });


  var signedtx = txb.build();
  var signedtxhash = signedtx.getId();
  var signedtxhex = signedtx.toHex();

  var req = request
              .post(`${ROOT_URL}/api/secure/asset/transfer_asset`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .set('Content-Type', 'application/json')
              .accept('application/json')
              .send({
                asset_id: assetID,
                asset_code: assetCode,
                amount: parseInt(amount),
                blockchain_asset_id: blockchainAssetID,
                from_addr_id: wallet.ID,
                from_addr_rand_id: wallet.RandID,
                from_addr: wallet.Address,
                to_addr: toAddr,
                blockchaintx_hash: signedtxhash,
                blockchaintx_hex: signedtxhex,
                colored_output_indexes: coloredOutputIndexes
              });
  return dispatch => {
    return req.end((err, res) => {
      if (res.status === 200) {
        dispatch({
          type: ASSET_TRANSFER_SUCCESS,
          data: {
            assetName: assetName,
            assetCode: assetCode,
            amount: parseInt(amount),
            fromAddress: wallet.Address,
            toAddress: toAddr,
            signedtxhash: signedtxhash,
            completed: true,
            status: 'SUCCESS - Pending confirmation on blockchain.'
          }
        });
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
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
        dispatch({
          type: FETCH_ALL_ASSETS,
          data: res.body
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

			console.log(res.body);
				dispatch({
					type: FETCH_BATCH_ASSET_TXS,
					data: res.body
				});
			}
		});
	}

}
