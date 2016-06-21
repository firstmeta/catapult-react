import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import DataGrid from 'react-datagrid';
import { AdminFetchAllAccounts } from '../actions/admin_action';

class Admin extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.AdminFetchAllAccounts();
  }

  render() {
    const { allAccounts } = this.props;
    console.log(allAccounts);

    if(!allAccounts) {
      return <div></div>
    }
    return (
      <div className="admin">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">

            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    allAccounts: state.AdminState.allAccounts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ AdminFetchAllAccounts: AdminFetchAllAccounts }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
