import request from 'superagent';
import { push } from 'redux-router';
import { ROOT_URL } from './index';
import { AUTH_TOKEN } from './auth_action';

export const COMPANY_START_SUCCESS = 'COMPANY_START_SUCCESS';
export const COMPANY_START_FAILURE = 'COMPANY_START_FAILURE';
export const COMPANY_SAVE_BASICS_SUCCESS = 'COMPANY_SAVE_BASICS_SUCCESS';
export const COMPANY_SAVE_BASICS_FAILURE = 'COMPANY_SAVE_BASICS_FAILURE';
export const COMPANY_SAVE_OVERVIEW_SUCCESS = 'COMPANY_SAVE_OVERVIEW_SUCCESS';
export const COMPANY_SAVE_OVERVIEW_FAILURE = 'COMPANY_SAVE_OVERVIEW_FAILURE';
export const FETCH_COMPANY = 'FETCH_COMPANY';

function startCompanySuccess(company) {
  return {
    type: COMPANY_START_SUCCESS,
    data: company.RandID
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

function fetchCompanyResult(data) {
  return {
    type: FETCH_COMPANY,
    data: data
  }
}

export function StartCompany(content) {
  var req = request
              .post(`${ROOT_URL}/api/secure/company/start`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .set('Content-Type', 'application/json')
              .accept('application/json')
              .send(content);
  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        console.log(res.body);
        dispatch(startCompanySuccess(res.body));
        dispatch(push('/company/' + res.body.RandID + '/edit'));
      }
      else {
        dispatch(startCompanyFailure(res.body));
      }
    })
  }
}

export function FetchCompanyByRandID(randID) {
  var req = request
              .get(`${ROOT_URL}/api/company/fetch_by_rand_id/${randID}`)
              .accept('application/json');

  return dispatch => {
    return req.end((err, res) => {
      dispatch(fetchCompanyResult(res.body));
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
        dispatch(push('/company/' + content.randID + '/edit?step=overview'))
      }
      else {
        console.log(res);
        dispatch(saveCompanyBasicsFailure('Error saving company basics! Please check all the fields!'));
      }
    })
  }
}

export function SaveCompanyOverview(content, logo, teamPhotos) {
  var req = request
              .post(`${ROOT_URL}/api/secure/company/save/overview`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))

  var team = [];
  teamPhotos.forEach((photo) => {
    req.attach(photo.name, photo);
  })

  req.attach(logo.name, logo);

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
