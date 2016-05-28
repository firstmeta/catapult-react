import {
  COMPANY_START_SUCCESS, FETCH_COMPANY,
  COMPANY_SAVE_BASICS_SUCCESS, COMPANY_SAVE_BASICS_FAILURE,
  COMPANY_SAVE_OVERVIEW_SUCCESS
} from '../actions/company_action';

export default function(state = {
  msg: '',
  companyDetails: ''
}, action) {
  switch (action.type) {
    case COMPANY_START_SUCCESS:
      return Object.assign({}, state, {
        companyEditingId: action.data
      });
    case FETCH_COMPANY:
      return Object.assign({}, state, {
        companyDetails: action.data
      })
    case COMPANY_SAVE_BASICS_SUCCESS:
      return Object.assign({}, state, {
        msg: action.msg
      });
    case COMPANY_SAVE_BASICS_FAILURE:
      return Object.assign({}, state, {
        msg: action.msg
      });
      case COMPANY_SAVE_OVERVIEW_SUCCESS:
        return Object.assign({}, state, {
          msg: action.msg,
          companyDetails: ''
        });
    default:
      return state;
  }
}
