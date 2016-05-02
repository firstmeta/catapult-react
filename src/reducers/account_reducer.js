import {
  ACCOUNT_SIGNUP_SUCCESS, ACCOUNT_SIGNUP_FAILURE
} from '../actions/account_action';

export default function(state = {
  isFetching: false,
}, action) {
  switch (action.type) {
    case ACCOUNT_SIGNUP_SUCCESS:
      return Object.assign({}, state ,{
        isFetching: false
      });
    case ACCOUNT_SIGNUP_FAILURE:
      return Object.assign({}, state, {
        isFetching: true
      })
    default:
      return state;
  }
}
