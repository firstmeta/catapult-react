import {
  CAMPAIGN_START,
  CAMPAIGN_SAVE_BASICS_SUCCESS, CAMPAIGN_SAVE_BASICS_FAILURE,
  FETCH_CAMPAIGN, FETCH_CAMPAIGN_BASICS, FETCH_CAMPAIGN_STORY
} from '../actions/campaign_action';

export default function(state = {
  campaignDetails: '',
  campaignStory: '',
  campaignRandID: '',
  msg: ''
}, action){
  switch(action.type) {
    case CAMPAIGN_START:
      return Object.assign({}, state, {
        campaignRandID: action.data
      })
    case CAMPAIGN_SAVE_BASICS_SUCCESS:
      return Object.assign({}, state, {
        campaignRandID: action.data
      });
    case FETCH_CAMPAIGN:
      return Object.assign({}, state, {
        campaignDetails: action.data
      });
    case FETCH_CAMPAIGN_BASICS:
      return Object.assign({}, state, {
        campaignBasics: action.data
      })
    case FETCH_CAMPAIGN_STORY:
      return Object.assign({}, state, {
        campaignStory: action.data
      });
    default:
      return state;
  }
}
