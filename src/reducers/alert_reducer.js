import { ALERT } from '../actions/alert_action'

export default function(state={
  msg: ''
}, action) {
  switch (action.type) {
    case ALERT:
      return Object.assign({}, state, {
        msg: action.msg
      });
    default:
      return state;
  }

}
