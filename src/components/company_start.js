import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { StartCompany } from '../actions/company_action';

class CompanyStart extends Component {

  constructor(props) {
    super(props);

    this.startCompany = this.startCompany.bind(this);
  }

  startCompany() {
    this.props.StartCompany({companyName: this.refs.companyName.value});
  }

  render() {
    return (
      <div className="company-start">
        <div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
            <h1>Let's set up your company!</h1>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
              <input
                type="text"
                placeholder="Enter your company name to get start..."
                ref="companyName"
                id="companyName"/>
            </div>
          </div>

        </div>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6 col-md-offset-3">
            <button
              className="btn btn-primary btn-green btn-green-primary full-width"
              onClick={this.startCompany}>
              Start
            </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({StartCompany: StartCompany}, dispatch);
}

export default connect(null, mapDispatchToProps)(CompanyStart);
