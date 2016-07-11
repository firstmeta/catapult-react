import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { AdminFetchAllAccounts, AdminFetchAllCompanies } from '../actions/admin_action';
import { FetchCompanyByRandID } from '../actions/company_action';
import AdminCompanyDetails from './admin_company_details';
import Alert from './global_alert';

class Admin extends Component {

  constructor(props) {
    super(props);

    this.state = {selectedAccountId: ''};

    this.onCompanyRowSelected = this.onCompanyRowSelected.bind(this);
  }

  componentWillMount() {
    this.props.AdminFetchAllAccounts();
    this.props.AdminFetchAllCompanies();
  }

  onCompanyRowSelected(row, isSelected) {
    this.props.FetchCompanyByRandID(row.RandID);
  }

  render() {
    const { allAccounts, allCompanies } = this.props;

    if(!allAccounts || !allCompanies) {
      return <div></div>
    }

    var companyRowSelectProp = {
      mode: "radio",
      clickToSelect: true,
      bgColor: "rgb(238, 193, 213)",
      onSelect: this.onCompanyRowSelected
    }

    return (
      <div className="admin">
        <div className="container-fluid">

          <Alert />

          <div className="row">
            <div className="col-md-10 col-md-offset-1">

              <h3>Accounts</h3>

              <BootstrapTable data={allAccounts} striped={true} hover={true}>
                <TableHeaderColumn dataField="ID" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="FullName" dataSort={true}>Full Name</TableHeaderColumn>
                <TableHeaderColumn dataField="Email">Email</TableHeaderColumn>
                <TableHeaderColumn dataField="EmailVerified">Email Verified</TableHeaderColumn>
                <TableHeaderColumn dataField="AccountType">Account Type</TableHeaderColumn>
                <TableHeaderColumn dataField="CreatedOn">Create On</TableHeaderColumn>
              </BootstrapTable>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1">

              <h3>Companies</h3>
              <BootstrapTable data={allCompanies} striped={true} hover={true} selectRow={companyRowSelectProp}>
                <TableHeaderColumn dataField="ID" isKey={true} dataAlign="center" dataSort={true}>ID</TableHeaderColumn>
                <TableHeaderColumn dataField="CompanyName" dataSort={true}>Name</TableHeaderColumn>
                <TableHeaderColumn dataField="Status">Status</TableHeaderColumn>
                <TableHeaderColumn dataField="OwnerID">OwnerID</TableHeaderColumn>
              </BootstrapTable>


              <AdminCompanyDetails />
            </div>
          </div>

        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    allAccounts: state.AdminState.allAccounts,
    allCompanies: state.AdminState.allCompanies,
    companyDetails: state.CompanyState.companyDetails
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    AdminFetchAllAccounts: AdminFetchAllAccounts,
    AdminFetchAllCompanies: AdminFetchAllCompanies,
    FetchCompanyByRandID: FetchCompanyByRandID
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
