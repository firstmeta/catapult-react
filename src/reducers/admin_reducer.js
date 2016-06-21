import {
  ADMIN_FETCH_ALL_ACCOUNTS
} from '../actions/admin_action';

export default function(state = {
  allAccounts: ''
}, action) {
  switch (action.type) {
    case ADMIN_FETCH_ALL_ACCOUNTS:
      return Object.assign({}, state, {
        allAccounts: action.data
      });
    default:
      return state;
  }
}
