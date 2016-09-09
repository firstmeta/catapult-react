import {
  WALLET_FETCH_SUCCESS,
  WALLET_PRE_GENERATE, CLEAR_PRIKEYS_CACHE,
  WALLET_GENERATE_SUCCESS, WALLET_GENERATE_FAILURE
} from '../actions/wallet_action';

export default function(state = {
    address:'',
    randID: '',
    prikeys:[],
    encryptedPrikey:'',
    redeemScript:'',
    scriptPubkey:'',
    asm:'',
    pwd: '',
    fetched: false
  }, action) {
  switch (action.type) {
    case WALLET_FETCH_SUCCESS:
      return Object.assign({}, state, {
        address: action.data.Address,
        randID: action.data.RandID,
        encryptedPrikey: action.data.Prikey,
        redeemScript: action.data.RedeemScript,
        scriptPubkey: action.data.ScriptPubkey,
        asm: action.data.ASM,
        fetched: true
      });
    case WALLET_PRE_GENERATE:
      return Object.assign({}, state, {
        pwd: action.data.pwd
      });
    case WALLET_GENERATE_SUCCESS:
      return Object.assign({}, state, {
        address: action.data.address,
        prikeys: action.data.prikeys,
        pwd: ''
      });
    case CLEAR_PRIKEYS_CACHE:
      return Object.assign({}, state, {
        prikeys:[]
      });
    default:
      return state;
  }
}
