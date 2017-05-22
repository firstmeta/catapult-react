import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';

import { AUTH_TOKEN } from '../actions/auth_action';
import { ROOT_URL } from '../config';
import Alert from './global_alert';

class FundDeposit extends Component {
	constructor(props){
		super(props);

		this.state =  {
			moneyCode: 'MYR',
			amount: '' 
		}
	}

	render() {
		return (
			<div className="fund-deposit">
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-4 col-md-offset-4 segment">
							<div className="row title">
								
							</div>
							<div className="row">
								<div className="col-sm-2">
									<div className="dropdown">
										<button
              	   	 className="btn btn-default dropdown-toggle"
              	   	 type="button"
              	   	 data-toggle="dropdown"
              	   	 aria-haspopup="true"
              	   	 aria-expanded="true">
										 {this.state.moneyCode} 
										 <span className="caret"></span>
              	  	</button>

										<ul className="dropdown-menu">
											<li onClick={() => this.setState({moneyCode: 'MYR'})}><a>MYR</a></li>	
										</ul>
									</div>

								</div>

								<div className="col-sm-6">
									<input
              		  type="text"
										value={this.state.amount}
										onChange={event => {
											var amount = event.target.value;
											this.setState({amount: amount})
										}}
              	  />
								</div>

								<div className="col-sm-4">
									{
										this.state.moneyCode === 'MYR' &&
										<form 
											method="POST" 
											action={ROOT_URL + "/api/secure/funding/prepare_molpay_tx"} 
											role="molpayseamless">
											
											<input 
												type="radio" 
												name="payment_options" 
												id="paymentfpx" 
												value="fpx" 
												checked="checked"
												style={{"display": "none"}}/>	
											<input 
												type="hidden" 
												name="currency" 
												id="currency" 
												value={this.state.moneyCode} />
											<input type="hidden" name="total_amount" value={this.state.amount} />
											<input 
												type="hidden" 
												name="Authorization" 
												id="Authorization" 
												value={localStorage.getItem(AUTH_TOKEN)} />

											<button 
												type="submit"  
												value="Submit"
												className="
													btn btn-primary btn-light-green 
													btn-light-green-primary full-width">
												Submit
											</button>
										</form>
									}	
								</div>

							</div>

						</div>
					</div>

				</div>
			</div>
		)
	}
}

export default FundDeposit;
