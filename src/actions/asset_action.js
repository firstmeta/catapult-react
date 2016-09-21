import request from 'superagent';
import { push } from 'redux-router';
import { AUTH_TOKEN } from './auth_action';
import { ROOT_URL, BTC_NETWORK } from '../config';
import { AlertGlobal, AlertLocal, ALERT_SUCCESS, ALERT_ERROR } from './alert_action';

var bitcoin = require('bitcoinjs-lib');
var script = bitcoin.script;
var address = bitcoin.address;

var CryptoJS = require("crypto-js");

export const REDIRECT_ASSET_CONFIRMATION = 'REDIRECT_ASSET_CONFIRMATION';
export const REDIRECT_ASSET_ISSUANCE_RESULT = 'REDIRECT_ASSET_ISSUANCE_RESULT';

export const PREPARE_ASSET_ISSUE_SUCCESS = 'PREPARE_ASSET_ISSUE_SUCCESS';

export const ASSET_ISSUE_SUCCESS = 'ASSET_ISSUE_SUCCESS';
export const ASSET_ISSUE_FAILURE = 'ASSET_ISSUE_FAILURE';

export function RedirectAssetConfirmation(assetData) {
  return dispatch => {
    dispatch({
      type: REDIRECT_ASSET_CONFIRMATION,
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

export function PrepareIssueAsset({issuer, name, amount, imageUrl, desc, address, city, country, wallet}) {

  var addr = wallet.Address;
  var req = request
              .get(`https://test-insight.bitpay.com/api/addr/${addr}/utxo`)
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
            console.log('Unsufficent fund!!!');
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
                                .field('json_tx', JSON.stringify(issueTx));
        assetPrepareReq.end((err, res) => {

          if(res.status === 200) {
            var data = JSON.parse(res.text);
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
              dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
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
  code, name, issuedAmount, imageUrl,
  desc, blockchainAssetId,
  issuedAddress, issuedAddressID, issuedAddressRandID,
  unsignedtxhex, coloredOutputIndexes,
  encryptedPrikey, pwd
}) {

  var prikey = CryptoJS.AES.decrypt(encryptedPrikey, pwd).toString(CryptoJS.enc.Utf8);
  var keyPair = bitcoin.ECPair.fromWIF(prikey, BTC_NETWORK);
  var tx =  bitcoin.Transaction.fromHex(unsignedtxhex);
  var txb = bitcoin.TransactionBuilder.fromTransaction(tx, BTC_NETWORK);
      txb.sign(0, keyPair);

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
                colored_output_indexes: coloredOutputIndexes
              });
  return dispatch => {
    return req.end((err, res) => {
      if (res.status === 200) {
        console.log(res.body);
        dispatch({
          type: ASSET_ISSUE_SUCCESS,
          data: {
            name: name,
            amount: issuedAmount,
            imageUrl: imageUrl,
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

function prepareAssetIssuanceTransaction({
  issuer, code, name, amount, imageUrl, desc, address, city, country,
  wallet, financeOutputTxid, financeOutputAmount, vout
}) {
  return {
    'issueAddress': wallet.Address,
    'amount': amount,
    'divisibility': 0,
    'fee': 5000,
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
