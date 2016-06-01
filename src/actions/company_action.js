import request from 'superagent';
import { push } from 'redux-router';
import { ROOT_URL } from './index';
import { ROOT_IMAGE_URL } from '../config';
import { AUTH_TOKEN } from './auth_action';

export const COMPANY_START_SUCCESS = 'COMPANY_START_SUCCESS';
export const COMPANY_START_FAILURE = 'COMPANY_START_FAILURE';
export const COMPANY_SAVE_BASICS_SUCCESS = 'COMPANY_SAVE_BASICS_SUCCESS';
export const COMPANY_SAVE_BASICS_FAILURE = 'COMPANY_SAVE_BASICS_FAILURE';
export const COMPANY_SAVE_OVERVIEW_SUCCESS = 'COMPANY_SAVE_OVERVIEW_SUCCESS';
export const COMPANY_SAVE_OVERVIEW_FAILURE = 'COMPANY_SAVE_OVERVIEW_FAILURE';
export const COMPANY_SUBMIT_REVIEW_SUCCESS = 'COMPANY_SUBMIT_REVIEW_SUCCESS';
export const COMPANY_SUBMIT_REVIEW_FAILURE = 'COMPANY_SUBMIT_REVIEW_FAILURE';
export const FETCH_COMPANY = 'FETCH_COMPANY';
export const FETCH_ALL_COMPANIES = 'FETCH_ALL_COMPANIES';

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
function submitReviewSuccess(msg) {
  return {
    type: COMPANY_SUBMIT_REVIEW_SUCCESS,
    msg: msg
  }
}
function submitReviewFailure(msg) {
  return {
    type: COMPANY_SUBMIT_REVIEW_FAILURE,
    msg: msg
  }
}

function fetchCompanyResult(data) {
  return {
    type: FETCH_COMPANY,
    data: data
  }
}
function fetchAllCompaniesResult(data) {
  return {
    type: FETCH_ALL_COMPANIES,
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
        dispatch(saveCompanyBasicsSuccess('Company basics saved!'));
        dispatch(push('/company/' + content.randID + '/edit?step=overview'))
      }
      else {
        dispatch(saveCompanyBasicsFailure('Error saving company basics! Please check all the fields!'));
      }
    })
  }
}

export function SaveCompanyOverview(content, logo, listingImage, teamPhotos) {
  var req = request
              .post(`${ROOT_URL}/api/secure/company/save/overview`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN));

  var team = [];
  teamPhotos.forEach((photo) => {
    req.attach(photo.name, photo);
  })

  if(logo) {
    req.attach(logo.name, logo);
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
        dispatch(saveCompanyOverviewFailure(res));
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
        dispatch(push('/company/' + content.randID + '/edit?step=preview'));
      }
      else {
        console.log(err);
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
        dispatch(submitReviewSuccess(res.text))
      }
      else {
        console.log(err);
        dispatch(submitReviewFailure(res.text));
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
      console.log(res);
      if(res.status === 200) {
        imgObj.data.el.$.src = `${ROOT_IMAGE_URL}/${res.text}`
      }
      else {
        console.log(err);
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
      dispatch(fetchAllCompaniesResult(res.body));
    })
  }

}
