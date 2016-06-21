import request from 'superagent'
import { ROOT_URL, ROOT_IMAGE_URL } from '../config';
import { AUTH_TOKEN } from './auth_action';
import { AlertGlobal } from './alert_action';
import { ALERT_SUCCESS, ALERT_ERROR } from '../components/global_alert';

export const ADMIN_FETCH_ALL_ACCOUNTS = 'ADMIN_FETCH_ALL_ACCOUNTS';

function fetchAllAccountsResult(data) {
  return {
    type: ADMIN_FETCH_ALL_ACCOUNTS,
    data: data
  }
}

export function AdminFetchAllAccounts() {
  var req = request
              .get(`${ROOT_URL}/api/keeper/fetch_all_accounts`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .accept('application/json')

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
