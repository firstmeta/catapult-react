import {
  FETCH_ASSET_BALANCES,
  REDIRECT_ASSET_ISSUANCE_CONFIRMATION, REDIRECT_ASSET_ISSUANCE_RESULT,
  PREPARE_ASSET_ISSUE_SUCCESS,
  ASSET_ISSUE_SUCCESS, ASSET_ISSUE_FAILURE,
  REDIRECT_ASSET_TRANSFER_CONFIRMATION, PREPARE_ASSET_TRANSFER_SUCCESS,
  REDIRECT_ASSET_TRANSFER_RESULT, ASSET_TRANSFER_SUCCESS

} from '../actions/asset_action';

export default function(
  state = {
    IssuingAsset: {},
    IssuedAsset: {},
    AssetBalances: {},
    TransferringAsset: {}
  },
  action) {
  switch(action.type) {
    case FETCH_ASSET_BALANCES:
      return Object.assign({}, state, {
        AssetBalances: action.data
      });
    case REDIRECT_ASSET_ISSUANCE_CONFIRMATION:
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
        IssuedAsset: action.data
      });
    case REDIRECT_ASSET_TRANSFER_CONFIRMATION:
      return Object.assign({}, state, {
        TransferringAsset: action.data
      });
    case PREPARE_ASSET_TRANSFER_SUCCESS:
      return Object.assign({}, state, {
        TransferringAsset: action.data
      });
    case REDIRECT_ASSET_TRANSFER_RESULT:
      return Object.assign({}, state, {
        TransferringAsset: action.data
      });
    case ASSET_TRANSFER_SUCCESS:
      return Object.assign({}, state, {
        TransferringAsset: action.data
      });
    default:
      return state;
  }
}
