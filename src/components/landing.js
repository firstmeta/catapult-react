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

		    <div className="container-fluid main-features" id="main-features">
		    	<div className="row title">
            <div className="col-md-12">
               <h2>Trading securities made easy, secure &amp; transparent</h2>
            </div>
          </div>

          <div className="row content">
          	<div className="col-md-8 col-md-offset-2">
              <p className="sub-desc">
                Investments into startups &amp; SMEs are highly illiquid, being locked-in for years.
                Catapult provides liquidity to these investments by facilitating the trade of debt, equity, invoices and other financial instruments.
              </p>
          		<div className="row">

	              <div className= "col-md-4">
                  <div className="row">
                  	 	<div className="col-sm-10 col-sm-offset-1 text-center">
                        <img src="https://catapult.asia/imgs/briefcase.png" />
	                    </div>

                  </div>
                  <div className= "row">
                    <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">

                        <h4 className="small-title text-center">SECURITY</h4>
                        <p className="text-justify">
                          <span className="feature-desc">Ownership & trading data stored immutably on blockchain.</span>
                        </p>
                    </div>
                  </div>
	              </div>

	              <div className= "col-md-4">
                  <div className="row">
                	 	<div className="col-sm-10 col-sm-offset-1 text-center">
                    	<img src="https://catapult.asia/imgs/lightning.png" />
                    </div>

                  </div>
                  <div className= "row">
                    <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">

                      <h4 className="small-title text-center">LIQUIDITY</h4>
                      <p className="text-justify">
                        <span className="feature-desc">Trade securities on the secondary market.</span>
                      </p>
                    </div>
                  </div>
	              </div>

	              <div className= "col-md-4">
                  <div className="row">
                  	 	<div className="col-sm-10 col-sm-offset-1 text-center">
	                    	<img src="https://catapult.asia/imgs/lightbulb.png" />
	                    </div>

                  </div>
                  <div className= "row">
                    <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">

                        <h4 className="small-title text-center">TRANSPARENCY</h4>
                        <p className="text-justify">
                          <span className="feature-desc">All trades recorded & visible on blockchain.</span>
                        </p>
                    </div>
                  </div>
	              </div>

	            </div>
             </div>
          </div>
        </div>

        <div className="container-fluid explain">
          <div className="overlay">
            <div className="row">
              <div className="col-md-8 col-md-offset-2">
                 <h2>A Secondary Market for Alternative Investments</h2>
                 <div className="subtitle">
                   <div className="row">
                     <div className="col-md-10 col-md-offset-1">
                       <h4 className="text-justify">
                         Catapult brings liquidity and access to investors. The marketplace offers a way to effectively manage investment portfolios.
                       </h4>
                       <h4 className="text-left">With Catapult, investors are able to:</h4>
                    </div>
                  </div>
                 </div>

                 <p>Earn early returns</p>
                 <p>Diversify investment portfolios</p>
                 <p>Invest in smaller amounts</p>
                 <p>Adjust investment strategies</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid marketplace">
          <div className="row content">
          	<div className="col-md-8 col-md-offset-2">
              <div className="toggle">
                <a
                  className="btn btn-common animated wow bounceIn"
                  onClick={() => {
                    var hs = this.state.hiddens.slice();
                    var bs = this.state.hiddenBtnTxts.slice();
                    if(hs[0] === 'hidden') {
                      hs[0] = '';
                      bs[0] = 'Show less';
                    }
                    else {
                      hs[0] = 'hidden';
                      bs[0] = 'Show more';
                    }
                    this.setState({hiddens: hs, hiddenBtnTxts: bs});
                  }}>{this.state.hiddenBtnTxts[0]}</a>
              </div>
              <br />
              <p className={"text-left sub-desc animated wow slideInRight " + this.state.hiddens[0]}>
                Alternative finance is growing rapidly in Southeast Asia. Despite the growing numbers, there is little liquidity.
                Depending on the type of security, alternative finance investors are often forced to lock-in their investments for a longer period of time,
                ranging from a few months to tens of years without any chance to opt out.
              </p>

              <div className="row title">
                <div className="col-md-12">
                   <h2>Startup Marketplace</h2>
                </div>
              </div>

          		<div className="row">
	              <div className= "col-md-4">
                  <div className="row">
                	 	<div className="col-sm-10 col-sm-offset-1 text-center">
                      <img src="https://catapult.asia/imgs/debt.svg" />
                    </div>
                  </div>
                  <div className= "row">
                    <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">
                      <h4 className="small-title text-center">DEBT</h4>
                    </div>
                  </div>
	              </div>

	              <div className= "col-md-4">
                  <div className="row">
                	 	<div className="col-sm-10 col-sm-offset-1 text-center">
                    	<img src="https://catapult.asia/imgs/equity.svg" />
                    </div>
                  </div>
                  <div className= "row">
                    <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">
                      <h4 className="small-title text-center">EQUITY</h4>
                    </div>
                  </div>
	              </div>

	              <div className= "col-md-4">
                  <div className="row">
                  	 	<div className="col-sm-10 col-sm-offset-1 text-center">
	                    	<img src="https://catapult.asia/imgs/invoice.svg" />
	                    </div>

                  </div>
                  <div className= "row">
                    <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">
                      <h4 className="small-title text-center">TRADE INVOICES</h4>
                    </div>
                  </div>
	              </div>
	            </div>

            </div>
          </div>
        </div>


        <div className="container-fluid crowdfunding">
          <div className="overlay">
            <div className="row content">
            	<div className="col-md-8 col-md-offset-2">

                <div className="row title">
                  <div className="col-md-12">
                     <h2>Crowdfunding on blockchain technology</h2>
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    <img className="decentralise" src="https://catapult.asia/imgs/decentralise.png" alt="Bitcoin is a decentralised blockchain" />
                  </div>
                  <div className="col-sm-6">
                    <p className="text-justify">Blockchain technology is taking the financial world by storm.</p>
                    <p className="text-justify">It enables a way for an internet user to transfer a unique piece of digital property to another internet user, such that the transfer is guaranteed to be safe and secure, with everyone knowing that the transfer has taken place and that nobody can challenge the legitimacy of the transfer.</p>
                    <p className="text-justify">Blockchain technology enables Catapult to tokenize securities. With both companies and investors recognizing such tokens as proofs of ownership, trading securities becomes easy &amp; efficient.</p>
                  </div>
                </div>

                <div className="toggle">
                  <a
                    className="btn btn-common animated wow bounceIn"
                    onClick={() => {
                      var hs = this.state.hiddens.slice();
                      var bs = this.state.hiddenBtnTxts.slice();
                      if(hs[1] === 'hidden') {
                        hs[1] = '';
                        bs[1] = 'Show less';
                      }
                      else {
                        hs[1] = 'hidden';
                        bs[1] = 'Show more';
                      }
                      this.setState({hiddens: hs, hiddenBtnTxts: bs});
                    }}>{this.state.hiddenBtnTxts[1]}</a>
                </div>


                <div className={"sub-desc animated wow slideInRight " + this.state.hiddens[1]}>
                  <br />
                  <p className="text-justify">
                    When it comes to securities trading, blockchain technology is a perfect fit.
                    Blockchain technology enables efficient transferring of ownership with unprecedented levels of transparency and trust.
                  </p>

                  <h3 className="text-justify">Asset Tokenisation</h3>

                  <p className="text-justify">
                    Investments are tokenized and issued to investors.
                    Investors will be able to trade these tokens with other investors.
                    Tokens can represent a variety of financial instruments like shares, convertibles, loans, etc.
                    Tokenization of securities enables us to create an on-demand secondary market for investments.
                  </p>

                  <h3 className="text-justify">Transparency</h3>

                  <p className="text-justify">
                    Securities ownership and secondary market transactions are recorded on an immutable public ledger,
                    which can be easily viewed at all times.
                    This way investors are always in the loop and can be assured of the status of their investments.
                  </p>

                  <h3 className="text-justify">Minimising Friction</h3>

                  <p className="text-justify">
                    Facilitating investments of a large crowd still requires a lot of paperwork to be signed.
                    With blockchain technology, investors can sign transactions digitally using their token wallet&#39;s private key.
                    This makes the whole trading process a lot faster.
                  </p>

                  <hr />
                </div>

                <br />
                <div className="row">
                  <div className="col-sm-12">
                      <h4 className="text-center">
                          The Catapult platform will be built on the Bitcoin blockchain and will use colored coins technology to tokenize investments.
                      </h4>

                      <h4 className="text-center">
                          The Bitcoin blockchain presents overwhelming advantages over other technology options:
                      </h4>

                  </div>
                </div>


                <div className="row bitcoin-pro">
  	              <div className= "col-md-4">
                    <div className="row">
                  	 	<div className="col-sm-10 col-sm-offset-1 text-center">
                        <img src="https://catapult.asia/imgs/merkle-tree.png" />
                      </div>
                    </div>
                    <div className= "row">
                      <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">
                        <h4 className="small-title text-center">THE OLDEST & MOST WIDELY ADOPTED BLOCKCHAIN</h4>
                      </div>
                    </div>
  	              </div>

  	              <div className= "col-md-4">
                    <div className="row">
                  	 	<div className="col-sm-10 col-sm-offset-1 text-center">
                      	<img src="https://catapult.asia/imgs/safe-btc.png" />
                      </div>
                    </div>
                    <div className= "row">
                      <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">
                        <h4 className="small-title text-center">THE SAFEST BLOCKCHAIN TO DATE</h4>
                      </div>
                    </div>
  	              </div>

  	              <div className= "col-md-4">
                    <div className="row">
                    	 	<div className="col-sm-10 col-sm-offset-1 text-center">
  	                    	<img src="https://catapult.asia/imgs/uptick.png" />
  	                    </div>

                    </div>
                    <div className="row">
                      <div className="col-sm-10 col-sm-offset-1 animated fadeInRight">
                        <h4 className="small-title text-center">SATISFIES ALL OF THE MARKETPLACE NEEDS</h4>
                      </div>
                    </div>
  	              </div>
  	            </div>
								
                <div className="row partnering">
                  <hr />
                  <h3>Partnering with</h3>
                  <div className="col-xs-4">
                    <img src="https://catapult.asia/imgs/smartlylogo.png" />
                  </div>
                  <div className="col-xs-4 paddingtop">
                    <img src="https://catapult.asia/imgs/changelogo.png" />
                  </div>
                  <div className="col-xs-4">
                    <img src="https://catapult.asia/imgs/lendwiselogo.png" />
                  </div>
								</div>
								
              </div>
           </div>
         </div>
       </div>


        <div className="container-fluid call-to-action">
        	<div className="row">
						<div className="col-md-12">
							<div className="col-md-6 col-md-offset-3">

              	<h2>Don't Miss the Growth Journeys of Asia's Most Exciting Startups!</h2>
							</div>	
						</div>
        	</div>
          {
            !isLogined &&
            <a
              className="btn btn-common animated wow bounceIn"
              onClick={() => this.props.OpenSignup()}>Get Started</a>
          }
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
