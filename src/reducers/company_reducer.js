import {
  COMPANY_SAVE_BASICS_SUCCESS, COMPANY_SAVE_BASICS_FAILURE
} from '../actions/company_action';

export default function(state = {
  msg: '',
  companyEditingId: ''
}, action) {
  switch (action.type) {
    case COMPANY_SAVE_BASICS_SUCCESS:
      return Object.assign({}, state, {
        msg: action.msg
      });
    case COMPANY_SAVE_BASICS_FAILURE:
      return Object.assign({}, state, {
        msg: action.msg
      });
    default:
      return state;
  }
}
