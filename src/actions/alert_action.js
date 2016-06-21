export const ALERT = 'ALERT_SHOW';

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
