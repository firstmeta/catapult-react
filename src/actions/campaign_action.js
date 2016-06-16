import request from 'superagent';
import { push } from 'redux-router';
import { ROOT_URL, ROOT_IMAGE_URL } from '../config';
import { AUTH_TOKEN } from './auth_action';

export const CAMPAIGN_SAVE_BASICS_SUCCESS = 'CAMPAIGN_SAVE_BASICS_SUCCESS';
export const CAMPAIGN_SAVE_BASICS_FAILURE = 'CAMPAIGN_SAVE_BASICS_FAILURE';
export const FETCH_CAMPAIGN = 'FETCH_CAMPAIGN';
export const FETCH_CAMPAIGN_STORY = 'FETCH_CAMPAIGN_STORY';

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
        dispatch(push('/campaign/' + content.companyRandID + '/' + res.body.CampaignRandID + '/edit?step=summary'));
      }
      else {
        dispatch(saveCampaignBasicsFailure(res.text));
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
        dispatch(push('/campaign/'+ content.companyRandID + '/' + content.campaignRandID + '/edit?step=preview'));
      }
      else {
        console.log(err);
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
      console.log(res.body);
      dispatch(fetchCampaignResult(res.body));
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
