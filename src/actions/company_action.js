import request from 'superagent';
import { browserHistory } from 'react-router';
import { ROOT_URL } from './index';
import { AUTH_TOKEN } from './auth_action';

export const COMPANY_START_SUCCESS = 'COMPANY_START_SUCCESS';
export const COMPANY_START_FAILURE = 'COMPANY_START_FAILURE';
export const COMPANY_SAVE_BASICS_SUCCESS = 'COMPANY_SAVE_BASICS_SUCCESS';
export const COMPANY_SAVE_BASICS_FAILURE = 'COMPANY_SAVE_BASICS_FAILURE';
export const COMPANY_SAVE_OVERVIEW_SUCCESS = 'COMPANY_SAVE_OVERVIEW_SUCCESS';
export const COMPANY_SAVE_OVERVIEW_FAILURE = 'COMPANY_SAVE_OVERVIEW_FAILURE';

function startCompanySuccess(company) {
  return {
    type: COMPANY_START_SUCCESS,
    data: company
  }
}
function startCompanyFailure(msg) {
  return {
    type: COMPANY_START_FAILURE,
    msg: msg
  }
}
function saveCompanyBasicsSuccess(msg) {
  return {
    type: COMPANY_SAVE_BASICS_SUCCESS,
    msg: msg
  }
}
function saveCompanyBasicsFailure(msg) {
  return {
    type: COMPANY_SAVE_BASICS_FAILURE,
    msg: msg
  }
}
function saveCompanyOverviewSuccess(msg) {
  return {
    type: COMPANY_SAVE_OVERVIEW_SUCCESS,
    msg: msg
  }
}
function saveCompanyOverviewFailure(msg) {
    return {
      type: COMPANY_SAVE_OVERVIEW_FAILURE,
      msg: msg
    }
}

export function StartCompany(content) {
  var req = request
              .post(`${ROOT_URL}/api/secure/startcompany`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .set('Content-Type', 'application/json')
              .accept('application/json')
              .send(content);
  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch(startCompanySuccess(res.body.Company));
        browserHistory.push('/companycreate');
      }
      else {
        dispatch(startCompanyFailure(res.body.Error));
      }
    })
  }
}

export function SaveCompanyBasics(content) {
  var req = request
              .post(`${ROOT_URL}/api/secure/company/save/basics`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .set('Content-Type', 'application/json')
              .accept('application/json')
              .send(content);

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        console.log(res);
        dispatch(saveCompanyBasicsSuccess('Company basics saved!'));
      }
      else {
        console.log(res);
        dispatch(saveCompanyBasicsFailure('Error saving company basics! Please check all the fields!'));
      }
    })
  }
}

export function SaveCompanyOverview(content, teamPhotos) {
  var req = request
              .post(`${ROOT_URL}/api/secure/company/save/overview`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))

  var team = [];

  teamPhotos.forEach((photo) => {
    req.attach(photo.name, photo);
  })

  req.field('CompanyOverview', JSON.stringify(content));

  return dispatch => {
    return req.end((err, res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch(saveCompanyOverviewSuccess(res));
      }
      else {
        dispatch(saveCompanyOverviewFailure(res));
      }
    })
  }

}
