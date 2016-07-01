import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AdminSaveCompanyStatus } from '../actions/admin_action';

class AdminCompanyDetails extends Component {

  constructor(props) {
    super(props);

    this.state = {company: ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.updateCompanyStatus = this.updateCompanyStatus.bind(this);
  }

  onInputChange(event) {
    var updatedCompany = Object.assign({}, this.state.company);
    updatedCompany[event.target.id] = event.target.value;
    this.setState({company: updatedCompany});
  }

  renderStatusList() {
    var statusList = ['DRAFT', 'REVIEWING', 'ACTIVE', 'INACTIVE'];
    return statusList.map(s => {
      return (
        <li
          key={s}
          onClick={() => {
            var updatedCompany = Object.assign({}, this.state.company);
            updatedCompany.Status = s;
            this.setState({company: updatedCompany});
        }}>
          <a>{s}</a>
        </li>
      )
    })
  }

  updateCompanyStatus() {
    this.props.AdminSaveCompanyStatus(this.state.company.RandID, this.state.company.Status);
  }

  render() {
    const { company } = this.props;

    if(!company) {
      return <div></div>;
    }
    console.log(company);
    if(!this.state.company || this.state.company.ID !== company.ID) {
      this.state.company = company;
    }

    return (
      <div className="admin-company-details">
        <div className="row">
          <div className="col-sm-1">
            <label for="companyID">ID</label>
            <p>{this.state.company.ID}</p>
          </div>
          <div className="col-sm-2">
            <label for="companyRandID">Rand ID</label>
            <p><Link to={'company/' + this.state.company.RandID + '/edit'}>{this.state.company.RandID}</Link></p>
          </div>
          <div className="col-sm-3">
            <label for="companyName">COMPANY NAME</label>
            <input
              type="text"
              className="form-control"
              value={this.state.company.CompanyName}
              ref="CompanyName"
              id="CompanyName"
              onChange={event => this.onInputChange(event)}/>
          </div>
          <div className="col-sm-2">
            <label for="Status">Status</label>
            <div className="dropdown">
              <button
                className="btn btn-default dropdown-toggle"
                type="button"
                id="regCountry"
                ref="regCountry"
                value={company.RegCountry}
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="true">
                 { this.state.company.Status} &nbsp;
                <span className="caret"></span>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                {this.renderStatusList()}
              </ul>
            </div>
          </div>
          <div className="col-sm-2">
            <button
              className="btn btn-primary btn-green btn-green-primary full-width"
              onClick={this.updateCompanyStatus}>
              Save
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">

          </div>
          <div className="col-sm-6">

          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">

          </div>
          <div className="col-sm-6">

          </div>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    company: state.CompanyState.companyDetails
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    AdminSaveCompanyStatus: AdminSaveCompanyStatus
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminCompanyDetails);
