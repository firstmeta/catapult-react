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
               <h2>Powering Startup Investment with Blockchain Smart Contracts</h2>
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
                            Missed out on prior startup opportunities? You can now get back into the action.
                        </p>
                        <p className="text-justify">
                            Start off by browsing through our featured list of startups.
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
                            No more opaque corporate structures from startups.
                        </p>
                        <p className="text-justify">
                            With the corporate structures being represented on blockchain smart contracts, the status and progress of startups can be tracked easily.
                        </p>
                    </div>
                  </div>
	              </div>

	            </div>
             </div>
          </div>
        </div>

        <div className="container-fluid summary">
        	<div className="row">
        		<div className="col-md-8 col-md-offset-2 animated zoomIn">
              <h2 className="call-to-action">Don't Miss the Growth Journeys of Asia's Most Exciting Startups!</h2>
              <h2>Catapult: Powering Startup Investment with Smart Contracts</h2>
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
