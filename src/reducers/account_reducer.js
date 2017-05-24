import {
  ACCOUNT_SIGNUP_SUCCESS, ACCOUNT_SIGNUP_FAILURE,
  SIGNUP_OPEN, SIGNUP_CLOSE, LOGIN_OPEN, LOGIN_CLOSE,
	PWD_RESET_OPEN, PWD_RESET_CLOSE,
	ACCOUNT_PROFILE
} from '../actions/account_action';

export default function(state = {
  isFetching: false,
  signupShowed: false,
  loginShowed: false,
  pwdResetShowed: false,
  walletAddress:'',
	walletPrikeys:[],
	accountProfile: '',
  error: ''
}, action) {
  switch (action.type) {
    case ACCOUNT_SIGNUP_SUCCESS:
      return Object.assign({}, state ,{
        isFetching: false
      });
    case ACCOUNT_SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: true
      });
    case SIGNUP_OPEN:
      return Object.assign({}, state, {
        signupShowed: true
      });
    case SIGNUP_CLOSE:
      return Object.assign({}, state, {
        signupShowed: false
      });
    case LOGIN_OPEN:
      return Object.assign({}, state, {
        loginShowed: true,
        error: action.error
      });
    case LOGIN_CLOSE:
      return Object.assign({}, state, {
        loginShowed: false,
        error: ''
      });
    case PWD_RESET_OPEN:
      return Object.assign({}, state, {
        pwdResetShowed: true
      });
    case PWD_RESET_CLOSE:
      return Object.assign({}, state, {
        pwdResetShowed: false
			});
		case ACCOUNT_PROFILE: 
			return Object.assign({}, state, {
				accountProfile: action.data
			})
    default:
      return state;
  }
}
