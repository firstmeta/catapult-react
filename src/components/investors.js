import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OpenSignup } from '../actions/account_action';

class Investors extends Component {

  render() {
    const { isLogined } = this.props;
    return (
      <div className="investors">
        <div className="jumbotron">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-10 col-md-offset-1 intro-section">
                <div className="text-bg">
                  <h2>Don't Miss the Growth Journeys of Asia's Most Exciting Startups!</h2>
                  <p>Soon investors will be able to invest in Southeast Asian startups via the Catapult investment platform. What's more, investors will have the chance to trade acquired investment tokens on the secondary market.</p>
                  <p>The Catapult team believes that everyone deserves a chance to invest in promising startups, this is why the platform will enable retail investors to co-invest alongside established investors.</p>
                  <p>The platform will be launching soon. Until then, please feel free to sign up for our waiting list to stay up-to-date on launch details, new startups on the platform, established partnerships, etc.</p>
                  {
                    !isLogined &&
                    <a
                      className="btn btn-common animated wow bounceIn"
                      onClick={() => this.props.OpenSignup()}>Join our waiting list</a>
                  }

                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="space">

        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    isLogined: state.AuthState.isLogined,
  }
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
    OpenSignup: OpenSignup
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Investors);
