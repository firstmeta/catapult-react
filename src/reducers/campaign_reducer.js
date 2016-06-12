import {
  CAMPAIGN_SAVE_BASICS_SUCCESS, CAMPAIGN_SAVE_BASICS_FAILURE
} from '../actions/campaign_action';

export default function(state = {
  campaignDetails: '',
  editingCampaignID: ''
}, action){
  switch(action.type) {
    case CAMPAIGN_SAVE_BASICS_SUCCESS:
      return Object.assign({}, state, {
        editingCampaignID: action.data
      });
    default:
      return state;
  }
}
