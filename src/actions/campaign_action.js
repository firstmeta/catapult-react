import request from 'superagent';
import { push } from 'redux-router';
import { ROOT_URL, ROOT_IMAGE_URL } from '../config';
import { AUTH_TOKEN } from './auth_action';
import { AlertGlobal } from './alert_action';
import { ALERT_SUCCESS, ALERT_ERROR } from '../components/global_alert';

export const CAMPAIGN_START = 'CAMPAIGN_START';
export const CAMPAIGN_SAVE_BASICS_SUCCESS = 'CAMPAIGN_SAVE_BASICS_SUCCESS';
export const CAMPAIGN_SAVE_BASICS_FAILURE = 'CAMPAIGN_SAVE_BASICS_FAILURE';
export const CAMPAIGN_SUBMIT_REVIEW_SUCCESS = 'CAMPAIGN_SUBMIT_REVIEW_SUCCESS';
export const CAMPAIGN_SUBMIT_REVIEW_FAILURE = 'CAMPAIGN_SUBMIT_REVIEW_FAILURE';
export const FETCH_CAMPAIGN = 'FETCH_CAMPAIGN';
export const FETCH_CAMPAIGN_BASICS = 'FETCH_CAMPAIGN_BASICS';
export const FETCH_CAMPAIGN_STORY = 'FETCH_CAMPAIGN_STORY';

function startCampaignResult(data) {
  return {
    type: CAMPAIGN_START,
    data: data
  }
}
function saveCampaignBasicsSuccess(data) {
  return {
    type: CAMPAIGN_SAVE_BASICS_SUCCESS,
    data: data
  }
}
function saveCampaignBasicsFailure(data) {
  return {
    type: CAMPAIGN_SAVE_BASICS_FAILURE,
    data: data
  }
}
function submitReviewSuccess(data) {
  return {
    type: CAMPAIGN_SUBMIT_REVIEW_SUCCESS,
    data: data
  }
}
function submitReviewFailure(data) {
  return {
    type: CAMPAIGN_SUBMIT_REVIEW_FAILURE,
    data: data
  }
}
function fetchCampaignResult(data) {
  return {
    type: FETCH_CAMPAIGN,
    data: data
  }
}
function fetchCampaignStoryResult(data) {
  return {
    type: FETCH_CAMPAIGN_STORY,
    data: data
  }
}
function fetchCampaignBasicsResult(data) {
  return {
    type: FETCH_CAMPAIGN_BASICS,
    data: data
  }
}

export function StartCampaign(companyRandID) {
  var req = request
              .post(`${ROOT_URL}/api/secure/campaign/start`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .accept('application/json')
              .field('companyRandID', companyRandID);

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch(startCampaignResult(res.body.CampaignRandID));
        dispatch(push('/campaign/' + res.body.CampaignRandID + '/edit'));
      }
      else {
        console.log(err);
      }
    })
  }
}
export function SaveCampaignBasics(content) {
  var req = request
              .post(`${ROOT_URL}/api/secure/campaign/save/basics`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .set('Content-Type', 'application/json')
              .accept('application/json')
              .send(content);

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch(saveCampaignBasicsSuccess(res.body.CampaignRandID));
        dispatch(push('/campaign/' + content.campaignRandID + '/edit?step=story'));
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    })
  }
}

export function SaveCampaignStory(content) {
  var req = request
              .post(`${ROOT_URL}/api/secure/campaign/save/story`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .set('Content-Type', 'application/json')
              .accept('application/json')
              .send(content);
  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch(push('/campaign/'+ content.campaignRandID + '/edit?step=preview'));
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    })
  }
}

export function SubmitCampaignForReview(randID) {
  var req = request
              .post(`${ROOT_URL}/api/secure/campaign/submitforreview`)
              .set('Authorization', localStorage.getItem(AUTH_TOKEN))
              .field('randID', randID);

  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        //dispatch(submitReviewSuccess(res.text));
        dispatch(AlertGlobal({content: res.text, type: ALERT_SUCCESS}));
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    })
  }
}

export function FetchCampaignByRandID(randID) {
  var req = request
              .get(`${ROOT_URL}/api/campaign/fetch_by_rand_id/${randID}`)
              .accept('application/json')
  return dispatch => {
    return req.end((err, res) => {
      dispatch(fetchCampaignResult(res.body));
    })
  }
}

export function FetchCampaignBasics(randID) {
  var req = request
              .get(`${ROOT_URL}/api/campaign/fetch_campaign_basics/${randID}`)
              .accept('application/json')
  return dispatch => {
    return req.end((err, res) => {
      if(res.status === 200) {
        dispatch(fetchCampaignBasicsResult(res.body));
      }
      else {
        dispatch(AlertGlobal({content: res.text, type: ALERT_ERROR}));
      }
    })
  }
}

export function FetchCampaignStory(randID) {
  var req = request
              .get(`${ROOT_URL}/api/campaign/fetch_campaign_story/${randID}`)
              .accept('application/json')
  return dispatch => {
    return req.end((err, res) => {
      dispatch(fetchCampaignStoryResult(res.body.Story));
    })
  }
}
