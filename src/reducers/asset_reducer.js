import {
	FETCH_ASSET_BALANCES, FETCH_ALL_ASSETS, 
	FETCH_ASSET_TXS, FETCH_BATCH_ASSET_TXS, FETCH_ASSET_ISSUING_TXS,
  REDIRECT_ASSET_ISSUANCE_CONFIRMATION, REDIRECT_ASSET_ISSUANCE_RESULT,
  PREPARE_ASSET_ISSUE_SUCCESS,
  ASSET_ISSUE_SUCCESS, ASSET_ISSUE_FAILURE, ASSET_TX_UPDATED,
	REDIRECT_ASSET_TRANSFER_CONFIRMATION, ASSET_BATCH_TRANSFER_CONFIRMATION,
	PREPARE_ASSET_TRANSFER_SUCCESS,
  REDIRECT_ASSET_TRANSFER_RESULT, ASSET_TRANSFER_SUCCESS

} from '../actions/asset_action';

export default function(
  state = {
    IssuingAsset: {},
    IssuedAsset: {},
		AssetBalances: '',
		AllAssets: '',
		TransferringAsset: {},
		BatchTransferringAsset: '',
		AssetTXs: [],
		BatchAssetTXs: [],
		AssetIssuingTXs: [],
		AssetTXUpdated: ''
  },
  action) {
		switch(action.type) {
		case FETCH_ALL_ASSETS:
			return Object.assign({}, state, {
				AllAssets: action.data
			});
    case FETCH_ASSET_BALANCES:
      return Object.assign({}, state, {
        AssetBalances: action.data
      });
    case FETCH_ASSET_TXS:
      return Object.assign({}, state, {
        AssetTXs: action.data
			});
		case FETCH_ASSET_ISSUING_TXS:
      return Object.assign({}, state, {
        AssetIssuingTXs: action.data
		});
		case FETCH_BATCH_ASSET_TXS:
			return Object.assign({}, state, {
				BatchAssetTXs: action.data
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
        IssuedAsset: action.data
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
		case ASSET_BATCH_TRANSFER_CONFIRMATION: 
				return Object.assign({}, state, {
					BatchTransferringAsset: action.data
				});
		case ASSET_TX_UPDATED:
				return Object.assign({}, state, {
					AssetTXUpdated: action.data
				});
    default:
      return state;
  }
}
