export const ALERT = 'ALERT_SHOW';

export const ALERT_SUCCESS = 'success';
export const ALERT_INFO = 'info';
export const ALERT_WARNING = 'warning';
export const ALERT_ERROR = 'danger';

export function AlertGlobal(msg) {
  return {
    type: ALERT,
    msg: msg
  }
}

export function RemoveAlert() {
  return {
    type: ALERT,
    msg: ''
  }
}
