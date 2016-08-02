import { LOGIN_OPEN } from '../actions/account_action';
import { logoutUser } from '../actions/auth_action';

export const CheckAuthMiddleware = store => next => action => {
  if(action.errorCode && action.errorCode === 401) {
    store.dispatch(logoutUser());
    store.dispatch({type: LOGIN_OPEN, error: 'Your session has expired. Please login to proceed!'});
  }
  return next(action);
}
