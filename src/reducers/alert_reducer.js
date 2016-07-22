import { ALERT, ALERT_LOCAL } from '../actions/alert_action'

export default function(state={
  msg: '',
  localMsg: ''
}, action) {
  switch (action.type) {
    case ALERT:
      return Object.assign({}, state, {
        msg: action.msg
      });
    case ALERT_LOCAL:
      return Object.assign({}, state, {
        localMsg: action.msg
    });
    default:
      return state;
  }

}
