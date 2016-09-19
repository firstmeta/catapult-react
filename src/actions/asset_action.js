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
  console.log(assetData);
  return dispatch => {
    dispatch({
      type: REDIRECT_ASSET_CONFIRMATION,
      data: assetData
    });
    dispatch(push('/assets/issuance?step=confirmation'));
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

        console.log(issueTx);

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
              dispatch({type: ASSET_ISSUE_SUCCESS, data: data});

  //             id serial primary key,
	// code text not null,
	// name text not null,
	// blockchain_asset_id text not null,
	// blockchaintxs_id integer not null,
	// issued_amount integer not null,
	// issuer_id integer not null,
	// metadata text,
	// reissueable boolean not null default false,
	// colored_output_index integer not null,
	// colored_output_indexes jsonb not null,

  // id serial primary key,
	// tx_id text not null default '404',
	// from_addr text not null,
	// from_rand_id text not null,
	// to_addrs jsonb not null,
	// partial_signed_tx text not null,
	// signed_tx text,
	// tx_status blockchaintxs_status not null default 'PARTIAL_SIGNED',
	// created_on timestamp not null,
	// sended_on timestamp,
	// confirmed_on timestamp,
	// multisig_outputs jsonb,
	// colored_output_index integer not null,
	// colored_output_indexes jsonb not null,

  // reate table assettxs (
  // 	id serial primary key,
  // 	txid text not null,
  // 	group_txid text not null,
  // 	blockchaintxs_id integer not null,
  // 	blockchaintx_hash text,
  // 	tx_type assettxs_type not null,
  // 	asset_id integer not null,
  // 	from_acct_id integer not null,
  // 	to_acct_id integer not null,
  // 	amount integer not null,
  // 	satoshi_fee integer not null,
  // 	tx_status assettxs_status not null default 'PROCESSING',
  // 	colored_output_index integer not null,
  // 	colored_output_indexes jsonb not null,
  // 	initiated_on timestamp not null,
  // 	ended_on timestamp,

  // create table assetbalances (
  // 	id serial primary key,
  // 	account_id integer not null,
  // 	asset_id integer not null,
  // 	asset_code text not null,
  // 	asset_address_id integer not null,
  // 	amount integer not null default 0,
  // 	locked_amount integer not null default 0,
  // 	assettx_id integer not null,

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
  var keyPair = bitcoin.ECPair.fromWIF(prikey, BTC_NETWORK);
  var tx =  bitcoin.Transaction.fromHex(unsignedtx);
  var txb = bitcoin.TransactionBuilder.fromTransaction(tx, BTC_NETWORK);
      txb.sign(0, keyPair);
  var signedtx = txb.build().toHex();
  

  // var req = request
  //             .post(`${ROOT_URL}/api/secure/asset/issue_asset`)
  //             .set('Authorization', localStorage.getItem(AUTH_TOKEN))
  //             .set('Content-Type', 'application/json')
  //             .accept('application/json')
  //             .send({
  //               "name": name,
  //               "amount": amount,
  //
  //             })
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
