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

export function PrepareIssueAsset({name, amount, imageUrl, desc, wallet}) {

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
            return
        }
        var issueTx = prepareAssetIssuanceTransaction(
            name,
            amount,
            imageUrl,
            desc,
            wallet,
            financeUtxo.txid,
            financeUtxo.satoshis,
            financeUtxo.vout
        );

        var assetPrepareReq = request
                                .post(`${ROOT_URL}/api/asset/preparetx`)
                                .accept('application/json')
                                .field('json_tx', JSON.stringify(issueTx));
        assetPrepareReq.end((err, res) => {

          if(res.status === 200) {
            var data = JSON.parse(res.text);
            if(data.txHex) {
              data.name = name;
              data.amount = amount;
              data.imageUrl = imageUrl;
              data.desc = desc;
              dispatch({type: ASSET_ISSUE_SUCCESS, data: data});
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
  name, amount, imageUrl,
  desc, blockchainAssetId,
  unsignedtx, coloredOutputIndexes,
  encryptedPrikey, pwd
}) {
  var prikey = CryptoJS.AES.decrypt(encryptedPrikey, pwd).toString(CryptoJS.enc.Utf8);
  var keyPair = bitcoin.ECPair.fromWIF(prikey, network);
  var tx =  bitcoin.Transaction.fromHex(unsignedtx);
  var signedtx = tx.sign(0, keyPair);

  var req = request
              .post(`${ROOT_URL}/api/secure/asset/issue_asset`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .set('Content-Type', 'application/json')
              .accept('application/json')
              .send({
                "name": name,
                "amount": amount,

              })
}

function prepareAssetIssuanceTransaction(name, amount, imageUrl, desc, wallet, financeOutputTxid, financeOutputAmount, vout) {
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
        'assetId': '1',
        'assetName': name,
        'issuer': 'Cata Pte Ltd',
        'description': 'My Description',
        'urls': [{name:'icon', url: imageUrl, mimeType: 'image/png', dataHash: ''}],
        'userData': {
            'meta' : [
                {key: 'Item ID', value: 2, type: 'Number'},
                {key: 'Item Name', value: 'Item Name', type: 'String'},
                {key: 'Company', value: 'My Company', type: 'String'},
                {key: 'Address', value: 'San Francisco, CA', type: 'String'}
            ]
        }
    }
  }
}
