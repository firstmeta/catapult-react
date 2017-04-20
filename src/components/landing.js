import React, { Component } from 'react';
import WorldMapImg from '../images/world_map.png';
import PeopleConnectImg from '../images/people_connect.png';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OpenSignup } from '../actions/account_action';

class Landing extends Component {

  constructor(props) {
    super(props);

    this.state = { hiddens: ['hidden', 'hidden'], hiddenBtnTxts: ['Show more', 'Show more']};
  }

	render() {
    const { isLogined } = this.props;
		return (
			<div className="landing">
				<div className="jumbotron">
					<div className="container-fluid">
					  	<div className="row">
              	<div className="col-md-10 col-md-offset-1 intro-section">
                      <h1 className="intro">
                        Buy & Sell Securities. <br />
                        On Blockchain.
											</h1>
                      <p className="sub-heading">
                          Southeast Asia's startup & SME marketplace
                      </p>
                      {
                        !isLogined &&
                        <a
                          className="btn btn-common animated wow bounceIn"
                          onClick={() => this.props.OpenSignup()}>Get Started</a>
                      }
                </div>
              </div>
					</div>
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
	return bindActionCreators({ OpenSignup: OpenSignup }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
