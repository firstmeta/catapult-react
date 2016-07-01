import {
  ADMIN_FETCH_ALL_ACCOUNTS, ADMIN_FETCH_ALL_COMPANIES
} from '../actions/admin_action';

export default function(state = {
  allAccounts: ''
}, action) {
  switch (action.type) {
    case ADMIN_FETCH_ALL_ACCOUNTS:
      return Object.assign({}, state, {
        allAccounts: action.data
      });
    case ADMIN_FETCH_ALL_COMPANIES:
      return Object.assign({}, state, {
        allCompanies: action.data
      });
    default:
      return state;
  }
}
