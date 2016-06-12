import request from 'superagent';
import { push } from 'redux-router';
import { ROOT_URL, ROOT_IMAGE_URL } from '../config';
import { AUTH_TOKEN } from './auth_action';

export const CAMPAIGN_SAVE_BASICS_SUCCESS = 'CAMPAIGN_SAVE_BASICS_SUCCESS';
export const CAMPAIGN_SAVE_BASICS_FAILURE = 'CAMPAIGN_SAVE_BASICS_FAILURE';

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
        console.log(res.body);
        console.log(res.body.CampaignRandID);
        dispatch(saveCampaignBasicsSuccess(res.body.CampaignRandID));
        dispatch(push('/campaign/' + res.body.CampaignRandID + '/edit?step=preview'));
      }
      else {
        dispatch(saveCampaignBasicsFailure(res.text));
      }
    })
  }
}
