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
                      <h1 className="intro">Grow Your Startup Investment Today</h1>
                      <p className="sub-heading">
                          Invest in startup companies together with peers and established venture capitals
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
               <h2>Catapult: Equity Crowdfunding on Blockchain</h2>
            </div>
          </div>

          <div className="row content">
          	<div className="col-md-10 col-md-offset-1">
          		<div className="row">

	              <div className= "col-md-4">
                  <div className="row">
                  	 	<div className="col-sm-8 col-sm-offset-2 text-center">
	                    	<i className="fa fa-slideshare"></i>
	                    </div>

                  </div>
                  <div className= "row">
                    <div className="col-sm-8 col-sm-offset-2 animated fadeInRight">

                        <h3 className="small-title text-center" >Collaboration</h3>
                        <p className="text-justify">
                            Leverage on the expertise of established venture capital funds.
                        </p>
                        <p className="text-justify">
                            Co-invest together on startups with strong potential.
                        </p>
                    </div>
                  </div>
	              </div>

	              <div className= "col-md-4">
                  <div className="row">
                  	 	<div className="col-sm-8 col-sm-offset-2 text-center">
	                    	<i className="fa fa-line-chart"></i>
	                    </div>

                  </div>
                  <div className= "row">
                    <div className="col-sm-8 col-sm-offset-2 animated fadeInRight">

                        <h3 className="small-title text-center">Liquidity</h3>
                        <p className="text-justify">
                            Missed out on prior startup investment opportunities? You can now get back into the action.
                        </p>
                        <p className="text-justify">
                            Buy, trade and build your startup portfolio with other peers through the <a href="https://www.ethereum.org/">Ethereum blockchain</a>.
                        </p>
                    </div>
                  </div>
	              </div>

	              <div className= "col-md-4">
                  <div className="row">
                  	 	<div className="col-sm-8 col-sm-offset-2 text-center">
	                    	<i className="fa fa-folder-open-o"></i>
	                    </div>

                  </div>
                  <div className= "row">
                    <div className="col-sm-8 col-sm-offset-2 animated fadeInRight">

                        <h3 className="small-title text-center">Transparency</h3>
                        <p className="text-justify">
                            No more opaque corporate structures on your investments.
                        </p>
                        <p className="text-justify">
                            With the corporate structures on the <a href="https://www.ethereum.org/">Ethereum blockchain</a>, you can easily track the status and the progress of the startups in your portfolio.
                        </p>
                    </div>
                  </div>
	              </div>

	            </div>
             </div>
          </div>
        </div>

        <div className="container-fluid tech-features">
        	<div className="row">
        		<div className="col-md-10 col-md-offset-1">
        			<div className="row">
        				<div className="col-sm-6">
        					<img src={WorldMapImg} className="animated fadeInLeft"/>
        				</div>
        				<div className="col-sm-6">
        					<div class="feature-content animated fadeInRight">
                      <h3 className="small-title">Startup Investing. Now Smart and Flexible</h3>
                      <p>
                          With the crowdfunding being offered being hosted on the <a href="https://www.ethereum.org/">Ethereum blockchain</a>,
                          you can now readily partake in new investment opportunities from anywhere around the globe.
                      </p>
                      <p>
                          Additionally, you can now use Ethereum smart contracts to facilitate trades.
                          No more hassle with custodians, trusteeships or middlemen agents when buying and selling startup equities.
                          All the equity that you hold in your Ethereum wallet can only be accessed by you.
                      </p>
                      <p>
                          That also means that you jump right into equity crowdfunding even with small investment amounts.
                          Less market friction, more liquidity. No more getting locked out of opportunities as a retail investor.
                      </p>
                  </div>
        				</div>
        			</div>
        		</div>
        	</div>

        	<div className="row">
        		<div className="col-md-10 col-md-offset-1">
        			<div className="row">
        				<div className="col-sm-6">
        					<div class="feature-content animated fadeInRight">
        						<h3 className="small-title">Startup Investing. Now Smart and Flexible</h3>
        						<p>
                        No more having to walk into the world of startup investment alone.
                        At Catapult, only the best startups from the portfolio of the partnering venture capital funds are selected for you to acquire equity in.
                    </p>
                    <p>
                        Also, with the equity being offered on the <a href="https://www.ethereum.org/">Ethereum smart contracts</a>,
                        you can co-invest in the startups with not only just the venture funds, but together with your peers and friends.
                    </p>
                    <p>
                        With Ethereum, you can even create your own contracts to engineer derivatives on top of your startup equity. Options, futures, etc., you are only limited by your creativity.
                    </p>
        					</div>
        				</div>
        				<div className="col-sm-6">
        					<img src={PeopleConnectImg} className="animated fadeInLeft"/>
        				</div>
        			</div>
        		</div>
        	</div>
        </div>

        <div className="container-fluid summary">
        	<div className="row">
        		<div className="col-md-8 col-md-offset-2 animated zoomIn">
              <h2 className="call-to-action">Don't Miss the Growth Journeys of Asia's Most Exciting Startups!</h2>
              <h2>Catapult: Equity Crowdfunding on Blockchain</h2>
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
