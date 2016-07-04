import {
  ADMIN_FETCH_ALL_ACCOUNTS, ADMIN_FETCH_ALL_COMPANIES, ADMIN_FETCH_COMPANY_FILE
} from '../actions/admin_action';

export default function(state = {
  allAccounts: '',
  allCompanies: '',
  companyFile: ''
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
    case ADMIN_FETCH_COMPANY_FILE:
      return Object.assign({}, state, {
        companyFile: action.data
      });
    default:
      return state;
  }
}
