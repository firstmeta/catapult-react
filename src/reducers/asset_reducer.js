import {
  REDIRECT_ASSET_CONFIRMATION,
  ASSET_ISSUE_SUCCESS, ASSET_ISSUE_FAILURE
} from '../actions/asset_action';

export default function(
  state = {
    IssuingAsset: {}
  },
  action) {
  switch(action.type) {
    case REDIRECT_ASSET_CONFIRMATION:
      return Object.assign({}, state, {
        IssuingAsset: action.data
      });
    case ASSET_ISSUE_SUCCESS:
      return Object.assign({}, state, {
        IssuingAsset: action.data,
        Processing: false
      });
    default:
      return state;
  }
}
