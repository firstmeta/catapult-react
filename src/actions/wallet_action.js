import request from 'superagent';
import { push } from 'redux-router';
import { AUTH_TOKEN } from './auth_action';
import { ROOT_URL, BTC_NETWORK } from '../config';
import { AlertGlobal, AlertLocal, ALERT_SUCCESS, ALERT_ERROR } from './alert_action';

var bitcoin = require('bitcoinjs-lib');
var script = bitcoin.script;
var address = bitcoin.address;

var CryptoJS = require("crypto-js");


export const WALLET_FETCH_SUCCESS = 'WALLET_FETCH_SUCCESS';
export const WALLET_FETCH_FAILURE = 'WALLET_FETCH_FAILURE';

export const WALLET_GENERATE_SUCCESS = 'WALLET_GENERATE_SUCCESS';
export const WALLET_GENERATE_FAILURE = 'WALLET_GENERATE_FAILURE';

export const WALLET_PRE_GENERATE = 'WALLET_PRE_GENERATE';

export const CLEAR_PRIKEYS_CACHE = 'CLEAR_PRIKEYS_CACHE';


export function FetchWallet() {
  var req = request
              .get(`${ROOT_URL}/api/secure/wallet/fetch_active_wallet`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .accept('application/json');

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch({
          type: WALLET_FETCH_SUCCESS,
          data: res.body
        });
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    });
  }
}

export function PreGenerateWallet(pwd) {
  return dispatch => {
    dispatch({
      type: WALLET_PRE_GENERATE,
      data: {pwd: pwd}
    });
    dispatch(push('/settings/wallet?step=result'));

  }
}

export function GenerateMultisigWallet(pwd) {

	return dispatch => {
    var keyPair1 = bitcoin.ECPair.makeRandom({network: BTC_NETWORK});
  	var keyPair2 = bitcoin.ECPair.makeRandom({network: BTC_NETWORK});

  	var pubkey1 = keyPair1.getPublicKeyBuffer().toString('hex');
  	var pubkey2 = keyPair2.getPublicKeyBuffer().toString('hex');

    var encryptedPrikey = CryptoJS.AES.encrypt(keyPair1.toWIF(), pwd).toString();
    //var decrypted = CryptoJS.AES.decrypt(encrypted, pwd).toString(CryptoJS.enc.Utf8);
    var req = request
                .post(`${ROOT_URL}/api/secure/wallet/generate_multisig_wallet`)
                .set('Authorization', localStorage.getItem(AUTH_TOKEN))
                .set('Content-Type', 'application/json')
                .accept('application/json')
                .send({
                    "prikey": encryptedPrikey,
                    "pubkeys": [pubkey1, pubkey2]
                 });

		return req.end((err, res) => {
			if(res.status === 200) {
        dispatch({
          type: WALLET_GENERATE_SUCCESS,
          data: {address: res.body.Address, prikeys:[keyPair1.toWIF(), keyPair2.toWIF()]}
        });
			}
			else {
				dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
			}
		})
	}
}

export function GenerateClientWallet(pwd) {
  return dispatch => {
    var keyPair = bitcoin.ECPair.makeRandom({network: BTC_NETWORK});

    var address = keyPair.getAddress();
    var scriptPubKey = bitcoin.address.toOutputScript(address, BTC_NETWORK);
    var asm = bitcoin.script.toASM(scriptPubKey);

    var encryptedPrikey = CryptoJS.AES.encrypt(keyPair.toWIF(), pwd).toString();

    //var decrypted = CryptoJS.AES.decrypt(encrypted, pwd).toString(CryptoJS.enc.Utf8);
    var req = request
                .post(`${ROOT_URL}/api/secure/wallet/save_client_generated_wallet`)
                .set('Authorization', localStorage.getItem(AUTH_TOKEN))
                .set('Content-Type', 'application/json')
                .accept('application/json')
                .send({
                    "address": address,
                    "encrypted_prikey": encryptedPrikey,
                    "redeem_script": scriptPubKey.toString('hex'),
                    "script_pubkey": scriptPubKey.toString('hex'),
                    "asm": asm
                 });

		return req.end((err, res) => {
			if(res.status === 200) {
        dispatch({
          type: WALLET_GENERATE_SUCCESS,
          data: {prikey:keyPair.toWIF(), wallet: res.body}
        });
			}
			else {
				dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
			}
		})
	}
}

export function ClearPrikeysCache() {
  return dispatch => {
    dispatch({type: CLEAR_PRIKEYS_CACHE});
  }
}
