import {
  ADMIN_FETCH_ALL_ACCOUNTS, ADMIN_FETCH_ALL_COMPANIES,
  ADMIN_FETCH_COMPANY_FILE_DOWNLOAD_URL
} from '../actions/admin_action';

export default function(state = {
  allAccounts: '',
  allCompanies: '',
  companyFileDownloadUrl: ''
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
    case ADMIN_FETCH_COMPANY_FILE_DOWNLOAD_URL:
      return Object.assign({}, state, {
        companyFileDownloadUrl: action.data
      });
    default:
      return state;
  }
}
