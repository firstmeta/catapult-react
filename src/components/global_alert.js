import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RemoveAlert } from '../actions/alert_action';

export const ALERT_SUCCESS = 'success';
export const ALERT_INFO = 'info';
export const ALERT_WARNING = 'warning';
export const ALERT_ERROR = 'danger';

class GlobalAlert extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { alert } = this.props;
    if (!alert) {
      return <div></div>
    }
    return (
      <div className="global-alert">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className={"alert alert-" + alert.type + " alert-dismissible"}>
                <button
                  type="button" className="close" data-dismiss="alert" aria-label="Close"
                    onClick={() => {this.props.RemoveAlert()}}>
                    <span aria-hidden="true">&times;</span>
                </button>
                {alert.content}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { alert: state.AlertGlobalState.msg };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({RemoveAlert: RemoveAlert}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(GlobalAlert);
