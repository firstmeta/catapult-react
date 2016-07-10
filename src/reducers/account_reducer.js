import {
  ACCOUNT_SIGNUP_SUCCESS, ACCOUNT_SIGNUP_FAILURE,
  SIGNUP_OPEN, SIGNUP_CLOSE
} from '../actions/account_action';

export default function(state = {
  isFetching: false,
  signupShowed: false
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
    default:
      return state;
  }
}
