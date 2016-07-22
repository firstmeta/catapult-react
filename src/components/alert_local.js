import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RemoveAlertLocal } from '../actions/alert_action';

class AlertLocal extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { alert } = this.props;
    if (!alert) {
      return <div></div>
    }
    return (
      <div className="alert-local">
        <div className={"alert alert-" + alert.type + " alert-dismissible"}>
          <button
            type="button" className="close" data-dismiss="alert" aria-label="Close"
              onClick={() => {this.props.RemoveAlertLocal()}}>
              <span aria-hidden="true">&times;</span>
          </button>
          {alert.content}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { alert: state.AlertGlobalState.localMsg };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({RemoveAlertLocal: RemoveAlertLocal}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AlertLocal);
