export const ALERT = 'ALERT_SHOW';
export const ALERT_LOCAL = 'ALERT_LOCAL_SHOW';

export const ALERT_SUCCESS = 'success';
export const ALERT_INFO = 'info';
export const ALERT_WARNING = 'warning';
export const ALERT_ERROR = 'danger';

export function AlertGlobal(msg, errorCode) {
  return {
    type: ALERT,
    msg: msg,
    errorCode: errorCode
  }
}

export function RemoveAlert() {
  return {
    type: ALERT,
    msg: ''
  }
}

export function AlertLocal(msg) {
  return {
    type: ALERT_LOCAL,
    msg: msg
  }
}

export function RemoveAlertLocal() {
  return {
    type: ALERT_LOCAL,
    msg: ''
  }
}
