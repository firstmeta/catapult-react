import {
  WALLET_FETCH_SUCCESS,
  WALLET_PRE_GENERATE, CLEAR_PRIKEYS_CACHE,
  WALLET_GENERATE_SUCCESS, WALLET_GENERATE_FAILURE
} from '../actions/wallet_action';

export default function(state = {
    address:'',
    prikeys:[],
    prikey:'',
    pwd: '',
    wallet: {RandID: '', Address: '', EncryptedPrikey:'', RedeemScript: '', ScriptPubkey: '', ASM: ''},
    fetched: false
  }, action) {
  switch (action.type) {
    case WALLET_FETCH_SUCCESS:
      return Object.assign({}, state, {
        wallet: action.data,
        fetched: true
      });
    case WALLET_PRE_GENERATE:
      return Object.assign({}, state, {
        pwd: action.data.pwd
      });
    case WALLET_GENERATE_SUCCESS:
      return Object.assign({}, state, {
        address: action.data.address,
        //prikeys: action.data.prikeys,
        prikey: action.data.prikey,
        wallet: action.data.wallet,
        pwd: ''
      });
    case CLEAR_PRIKEYS_CACHE:
      return Object.assign({}, state, {
        prikeys:[],
        prikey: ''
      });
    default:
      return state;
  }
}
