import {
  CAMPAIGN_SAVE_BASICS_SUCCESS, CAMPAIGN_SAVE_BASICS_FAILURE,
  FETCH_CAMPAIGN, FETCH_CAMPAIGN_STORY
} from '../actions/campaign_action';

export default function(state = {
  campaignDetails: '',
  campaignStory: '',
  editingCampaignID: ''
}, action){
  switch(action.type) {
    case CAMPAIGN_SAVE_BASICS_SUCCESS:
      return Object.assign({}, state, {
        editingCampaignID: action.data
      });
    case FETCH_CAMPAIGN:
      return Object.assign({}, state, {
        campaignDetails: action.data
      });
    case FETCH_CAMPAIGN_STORY:
      return Object.assign({}, state, {
        campaignStory: action.data
      })
    default:
      return state;
  }
}
