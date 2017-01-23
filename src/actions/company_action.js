import request from 'superagent';
import { push } from 'redux-router';
import { ROOT_URL, ROOT_IMAGE_URL } from '../config';
import { AUTH_TOKEN } from './auth_action';
import { AlertGlobal, ALERT_SUCCESS, ALERT_ERROR } from './alert_action';

export const COMPANY_START_SUCCESS = 'COMPANY_START_SUCCESS';
export const COMPANY_START_FAILURE = 'COMPANY_START_FAILURE';
export const COMPANY_SAVE_BASICS_SUCCESS = 'COMPANY_SAVE_BASICS_SUCCESS';
export const COMPANY_SAVE_BASICS_FAILURE = 'COMPANY_SAVE_BASICS_FAILURE';
export const COMPANY_SAVE_OVERVIEW_SUCCESS = 'COMPANY_SAVE_OVERVIEW_SUCCESS';
export const COMPANY_SAVE_OVERVIEW_FAILURE = 'COMPANY_SAVE_OVERVIEW_FAILURE';
export const COMPANY_SAVE_SUMMARY_SUCCESS = 'COMPANY_SAVE_SUMMARY_SUCCESS';
export const COMPANY_SAVE_SUMMARY_FAILURE = 'COMPANY_SAVE_SUMMARY_FAILURE';
export const COMPANY_SAVE_FILE_SUCCESS = 'COMPANY_SAVE_FILE_SUCCESS';
export const COMPANY_SAVE_FILE_FAILURE = 'COMPANY_SAVE_FILE_FAILURE';
export const COMPANY_SUBMIT_REVIEW_SUCCESS = 'COMPANY_SUBMIT_REVIEW_SUCCESS';
export const COMPANY_SUBMIT_REVIEW_FAILURE = 'COMPANY_SUBMIT_REVIEW_FAILURE';
export const FETCH_COMPANY = 'FETCH_COMPANY';
export const FETCH_ALL_ACTIVE_COMPANIES = 'FETCH_ALL_COMPANIES';
export const FETCH_ALL_MY_COMPANIES = 'FETCH_ALL_MY_COMPANIES';

function startCompanySuccess(company) {
  return {
    type: COMPANY_START_SUCCESS,
    data: company.RandID
  }
}
function startCompanyFailure(msg, errorCode) {
  return {
    type: COMPANY_START_FAILURE,
    msg: msg,
    errorCode: errorCode
  }
}
function saveCompanyBasicsSuccess(msg) {
  return {
    type: COMPANY_SAVE_BASICS_SUCCESS,
    msg: msg
  }
}
function saveCompanyBasicsFailure(msg, errorCode) {
  return {
    type: COMPANY_SAVE_BASICS_FAILURE,
    msg: msg,
    errorCode: errorCode
  }
}
function saveCompanyOverviewSuccess(msg) {
  return {
    type: COMPANY_SAVE_OVERVIEW_SUCCESS,
    msg: msg
  }
}
function saveCompanyOverviewFailure(msg, errorCode) {
    return {
      type: COMPANY_SAVE_OVERVIEW_FAILURE,
      msg: msg,
      errorCode: errorCode
    }
}
function saveCompanySummarySuccess(msg) {
  return {
    type: COMPANY_SAVE_SUMMARY_SUCCESS,
    msg: msg
  }
}
function saveCompanySummaryFailure(msg, errorCode) {
  return {
    type: COMPANY_SAVE_SUMMARY_FAILURE,
    msg: msg,
    errorCode: errorCode
  }
}

function submitReviewSuccess(msg) {
  return {
    type: COMPANY_SUBMIT_REVIEW_SUCCESS,
    msg: msg
  }
}
function submitReviewFailure(msg, errorCode) {
  return {
    type: COMPANY_SUBMIT_REVIEW_FAILURE,
    msg: msg,
    errorCode: errorCode
  }
}

function fetchCompanyResult(data) {
  return {
    type: FETCH_COMPANY,
    data: data
  }
}
function fetchAllActiveCompaniesResult(data) {
  return {
    type: FETCH_ALL_ACTIVE_COMPANIES,
    data: data
  }
}
function fetchAllMyCompaniesResult(data) {
  return {
    type: FETCH_ALL_MY_COMPANIES,
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
        dispatch(startCompanySuccess(res.body));
        dispatch(push('/company/' + res.body.RandID + '/edit'));
      }
      else {
        dispatch(startCompanyFailure(res.body, res.status));
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
export function FetchCompanyByAssetCode(assetCode) {
  var req = request
              .get(`${ROOT_URL}/api/company/fetch_by_asset_code/${assetCode}`)
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
        dispatch(saveCompanyBasicsSuccess('Company basics saved!'));
        dispatch(push('/company/' + content.randID + '/edit?step=overview'))
      }
      else {
        dispatch(saveCompanyBasicsFailure('Error saving company basics! Please check all the fields!', res.status));
      }
    })
  }
}

export function SaveCompanyOverview(content, overallSketch, listingImage, teamPhotos) {
  var req = request
              .post(`${ROOT_URL}/api/secure/company/save/overview`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN));

  var team = [];
  teamPhotos.forEach((photo) => {
    req.attach(photo.name, photo);
  })

  if(overallSketch) {
    req.attach(overallSketch.name, overallSketch);
  }

  if(listingImage) {
    req.attach(listingImage.name, listingImage)
  }

  req.field('CompanyOverview', JSON.stringify(content));

  return dispatch => {
    return req.end((err, res) => {
      if (res.status === 200) {
        dispatch(saveCompanyOverviewSuccess(res));
        dispatch(push('/company/' + content.randID + '/edit?step=summary'));
      }
      else {
        dispatch(saveCompanyOverviewFailure(res.body, res.status));
      }
    })
  }
}

export function SaveCompanySummary(content) {
  var req = request
              .post(`${ROOT_URL}/api/secure/company/save/summary`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .set('Content-Type', 'application/json')
              .accept('application/json')
              .send(content);

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch(push('/company/' + content.randID + '/edit?step=documents'));
      }
      else {
        dispatch(saveCompanySummaryFailure(res.body, res.status));
      }

    })
  }
}
export function SaveCompanyFile(randID, file) {
  var req = request
              .post(`${ROOT_URL}/api/secure/company/save/file`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .field('randID', randID)
              .field('fileName', file.name)
              .attach(file.name, file);

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch(push('/company/' + randID + '/edit?step=preview'));
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}, res.status));
      }
    })
  }
}
export function SubmitCompanyForReview(randID) {
  var req = request
              .post(`${ROOT_URL}/api/secure/company/submitforreview`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .field('randID', randID);
  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        //dispatch(submitReviewSuccess(res.text))
        dispatch(AlertGlobal({content: res.text, type: ALERT_SUCCESS}));
      }
      else {
        //dispatch(submitReviewFailure(res.text));
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}, res.status));
      }
    })
  }
}

export function UploadCompanySummaryImage(imgObj, randID) {
  var req = request
              .post(`${ROOT_URL}/api/secure/upload/public_image`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
  var img = imgObj.data.file
  req.attach(img.name, img);
  req.field('imageName', img.name);
  req.field('imageID', randID);

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        imgObj.data.el.$.src = `${ROOT_IMAGE_URL}/${res.text}`
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}, res.status));
      }
    })
  }
}

export function FetchAllActiveCompanies() {
  var req = request
              .get(`${ROOT_URL}/api/company/fetch_all_active_companies`)
              .accept('application/json');

  return dispatch => {
    return req.end((err, res) => {
      dispatch(fetchAllActiveCompaniesResult(res.body));
    })
  }

}
export function FetchAllMyCompanies() {
  var req = request
          .get(`${ROOT_URL}/api/secure/company/fetch_all_my_companies`)
          .set('Authorization', localStorage.getItem(AUTH_TOKEN))
          .accept('application/json')

  return dispatch => {
    return req.end((err, res) => {
      dispatch(fetchAllMyCompaniesResult(res.body));
    })
  }
}
