import {
  REDIRECT_ASSET_CONFIRMATION, REDIRECT_ASSET_ISSUANCE_RESULT,
  PREPARE_ASSET_ISSUE_SUCCESS,
  ASSET_ISSUE_SUCCESS, ASSET_ISSUE_FAILURE
} from '../actions/asset_action';

export default function(
  state = {
    IssuingAsset: {},
    IssuedAsset: {}
  },
  action) {
  switch(action.type) {
    case REDIRECT_ASSET_CONFIRMATION:
      return Object.assign({}, state, {
        IssuingAsset: action.data
      });
    case PREPARE_ASSET_ISSUE_SUCCESS:
      return Object.assign({}, state, {
        IssuingAsset: action.data
      });
    case REDIRECT_ASSET_ISSUANCE_RESULT:
      return Object.assign({}, state, {
        IssuingAsset: action.data
      });
    case ASSET_ISSUE_SUCCESS:
      return Object.assign({}, state, {
        IssuingAsset: {},
        IssuedAsset: action.data,
        Processing: false
      });
    default:
      return state;
  }
}
