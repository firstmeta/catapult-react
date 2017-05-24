import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Spinner from './spinner';
import { FetchAccountProfile, SaveAccountProfile } from '../actions/account_action';
import { CountryList, CountryMap } from './countries';

class ProfileSettings extends Component {
	constructor(props){
		super(props);

    this.state = {country: ''};
		this.renderCountryList = this.renderCountryList.bind(this);
		this.saveProfile = this.saveProfile.bind(this);
	}

	componentWillMount() {
		this.props.FetchAccountProfile();
	}

	saveProfile() {
		this.props.SaveAccountProfile({
			firstname: this.refs.firstname.value,
			lastname: this.refs.lastname.value,
			handphone: this.refs.handphone.value,
			address: this.refs.address.value,
			city: this.refs.city.value,
			country: this.state.country ? this.state.country.code : 'SG'
		})
	}

	renderCountryList() {
    return CountryList.map(c => {
      return (
        <li
          key={c.code}
          onClick={() => this.setState({country: {code: c.code, name: c.name}})}>
          <a>{c.name}</a>
        </li>
      )
    })
  }

	render() {
		const { profile } = this.props;

		if (!profile) {
			return(
				<div className="settings-profile">
					<center><Spinner /></center>
				</div>
			) 
		}

		return (
			<div className="settings-profile">
				<div className="container-fluid">
      	  <div className="row">
						<div className="col-md-6 col-md-offset-3 segment add-padding">
							<br />
							<div className="row">
								<div className="col-sm-6">
									<div className="form-group">
                 		<label>First Name</label>
										<input
											type="text"
                   		className="form-control"
                  		placeholder="First name"
                   		defaultValue={profile.firstname}
                   		ref="firstname"
                   		id="firstname" />
									</div>
								</div>
								<div className="col-sm-6">
									<div className="form-group">
                 		<label>Last Name</label>
										<input
											type="text"
                   		className="form-control"
                  		placeholder="Last name"
                   		defaultValue={profile.lastname}
                   		ref="lastname"
                   		id="lastname" />
									</div>
								</div>

							</div>

							<div className="row">
								<div className="col-sm-12">
									<div className="form-group">
                 		<label>Handphone</label>
										<input
											type="text"
											className="form-control" 
											placeholder="+(country code)(phone number). E.g.: +6512345678"
											defaultValue={profile.handphone}
											ref="handphone"/>
									</div>
								</div>
							</div>
							
							<div className="row">
								<div className="col-sm-12">
									<div className="form-group">
                 		<label>Address</label>
										<input
											type="text"
											className="form-control" 
											defaultValue={profile.address}
											ref="address"/>
									</div>
								</div>
							</div>
							
							<div className="row">
								<div className="col-sm-12">
									<div className="form-group">
                 		<label>City</label>
										<input
											type="text"
											className="form-control" 
											defaultValue={profile.city}
											ref="city"/>
									</div>
								</div>
							</div>
							
							<div className="row">
								<div className="col-sm-12">
									<div className="form-group">
                    <label for="country">Country</label>
                    <div className="dropdown">
                      <button
                        className="btn btn-default dropdown-toggle"
                        type="button"
                        id="country"
                        ref="country"
                        value={profile.country}
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="true">
                 	      { this.state.country ? this.state.country.name : CountryMap[profile.country]} &nbsp;
                          <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                          {this.renderCountryList()}
                        </ul>
                      </div>
                    </div>

								</div>
							</div>
							
							<div className="row">
								<div className="col-sm-12">
									<button
                    className="btn btn-primary btn-green btn-green-primary full-width"
                    onClick={this.saveProfile}>
                    	Save 
                  </button>
								</div>
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
		profile: state.AccountState.accountProfile
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		FetchAccountProfile: FetchAccountProfile,
		SaveAccountProfile: SaveAccountProfile
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
