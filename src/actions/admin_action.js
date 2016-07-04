import request from 'superagent'
import { ROOT_URL, ROOT_IMAGE_URL } from '../config';
import { AUTH_TOKEN } from './auth_action';
import { AlertGlobal } from './alert_action';
import { ALERT_SUCCESS, ALERT_ERROR } from '../components/global_alert';

export const ADMIN_FETCH_ALL_ACCOUNTS = 'ADMIN_FETCH_ALL_ACCOUNTS';
export const ADMIN_FETCH_ALL_COMPANIES = 'ADMIN_FETCH_ALL_COMPANIES';
export const ADMIN_FETCH_COMPANY_FILE = 'ADMIN_FETCH_COMPANY_FILE';

function fetchAllAccountsResult(data) {
  return {
    type: ADMIN_FETCH_ALL_ACCOUNTS,
    data: data
  }
}
function fetchAllCompaniesResult(data) {
  return {
    type: ADMIN_FETCH_ALL_COMPANIES,
    data: data
  }
}
function fetchCompanyFileResult(data) {
  return {
    type: ADMIN_FETCH_COMPANY_FILE,
    data: data
  }
}

export function AdminFetchAllAccounts() {
  var req = request
              .get(`${ROOT_URL}/api/keeper/fetch_all_accounts`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .accept('application/json');

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch(fetchAllAccountsResult(res.body));
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    })
  }
}

export function AdminFetchAllCompanies() {
  var req = request
              .get(`${ROOT_URL}/api/keeper/fetch_all_companies`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .accept('application/json')

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch(fetchAllCompaniesResult(res.body));
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    })
  }
}
export function AdminSaveCompanyStatus(companyRandID, status) {
  var req = request
              .post(`${ROOT_URL}/api/keeper/save_company_status`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .field('companyRandID', companyRandID)
              .field('companyStatus', status);

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch(AlertGlobal({content: res.text, type: ALERT_SUCCESS}));
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    })
  }
}
export function AdminFetchCompanyFile(companyRandID) {
  var req = request
              .post(`${ROOT_URL}/api/keeper/fetch_company_file`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .field('companyRandID', companyRandID)
  return dispatch => {
    return req.end((err, res) => {
      console.log(res);
      console.log(res.header);
      console.log(res.headers);
      dispatch(fetchCompanyFileResult({
        mime: res.header['content-type'],
        filename: res.header['filename'],
        fileData: res.text
      }))
    })
  }
}
