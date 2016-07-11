import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { VerifyEmail } from '../actions/account_action';
import Alert from './global_alert';

class EmailVerification extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.VerifyEmail(this.props.email, this.props.code);
  }

  render() {
    return (
      <div className="email-verification">
        <Alert />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    email: state.router.location.query.email,
    code: state.router.location.query.code
  }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({VerifyEmail}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EmailVerification);
