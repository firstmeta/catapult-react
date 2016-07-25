import React, { Component } from 'react';
import WorldMapImg from '../images/world_map.png';
import PeopleConnectImg from '../images/people_connect.png';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OpenSignup } from '../actions/account_action';

 class Landing extends Component {
	render() {
		return (
			<div className="landing">
				<div className="jumbotron">
					<div className="container-fluid">
					  	<div className="row">
                  <div className="col-md-10 col-md-offset-1 intro-section">
                      <h1 className="intro">
												Rethink Crowdfunding. <br />
												Empowered by Blockchain.
											</h1>
                      <p className="sub-heading">
                          Find out more about featured startups on our platform
                      </p>

                      <a
												className="btn btn-common animated wow bounceIn"
												onClick={() => this.props.OpenSignup()}>Join our waiting list</a>
                  </div>
              </div>
					</div>
		    </div>

		    <div className="container-fluid main-features" id="main-features">
		    	<div className="row title">
            <div className="col-md-12">
               <h2>Startup investing made easy, efficient & transparent</h2>
            </div>
          </div>

          <div className="row content">
          	<div className="col-md-8 col-md-offset-2">
          		<div className="row">

	              <div className= "col-md-4">
                  <div className="row">
                  	 	<div className="col-sm-10 col-sm-offset-1 text-center">
                        <img src="http://catapult.asia/imgs/briefcase.svg" />
	                    </div>

                  </div>
                  <div className= "row">
                    <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">

                        <h3 className="small-title text-center">COLLABORATION</h3>
                        <p className="text-justify">
                            <span className="feature-desc">Leverage on the expertise of established venture capital funds.</span>
                        </p>
                    </div>
                  </div>
	              </div>

	              <div className= "col-md-4">
                  <div className="row">
                  	 	<div className="col-sm-10 col-sm-offset-1 text-center">
	                    	<img src="http://catapult.asia/imgs/lightning.svg" />
	                    </div>

                  </div>
                  <div className= "row">
                    <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">

                        <h3 className="small-title text-center">LIQUIDITY</h3>
                        <p className="text-justify">
                          <span className="feature-desc">Trade securities on the secondary market.</span>
                        </p>
                    </div>
                  </div>
	              </div>

	              <div className= "col-md-4">
                  <div className="row">
                  	 	<div className="col-sm-10 col-sm-offset-1 text-center">
	                    	<img src="http://catapult.asia/imgs/lightbulb.svg" />
	                    </div>

                  </div>
                  <div className= "row">
                    <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">

                        <h3 className="small-title text-center">TRANSPARENCY</h3>
                        <p className="text-justify">
                          <span className="feature-desc">All fundraising campaigns & transactions recorded & visible on the blockchain.</span>
                        </p>
                    </div>
                  </div>
	              </div>

	            </div>
             </div>
          </div>
        </div>

        <div className="container-fluid explain">
          <div className="row title">
            <div className="col-md-10 col-md-offset-1">
               <h2>Why Crowdfunding?</h2>
               <p>
                 Startup crowdfunding unleashes endless potential. With crowdfunding, anyone with a promising idea and a plan in place can reach out to the crowds and receive funding to build a successful company.
               </p>
            </div>
          </div>

          <div className="row content">
            <div className="col-md-6 col-md-offset-3">
              <div className="row">
                <div className="col-sm-6 col">
                  Investors
                  <ul>
                    <li>invest with small amounts.</li>
                    <li>diversify investment portfolios.</li>
                    <li>trade their investments.</li>
                  </ul>
                </div>
                <div className="col-sm-6 col">
                  Startups
                  <ul>
                    <li>save time fundraising.</li>
                    <li>increase traction.</li>
                    <li>receive crowd validation.</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>

        <div className="container-fluid summary">
        	<div className="row">
        		<div className="col-md-8 col-md-offset-2 animated zoomIn">
              <h2 className="call-to-action">Don't Miss the Growth Journeys of Asia's Most Exciting Startups!</h2>
          </div>
        	</div>
        </div>

      </div>
		)
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({ OpenSignup: OpenSignup }, dispatch);
}
export default connect(null, mapDispatchToProps)(Landing);
