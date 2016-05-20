import React, { Component } from 'react';
import { connect } from 'react-redux';

class CompanyCreateOverview extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    <div>

    </div>
  }

}

function mapStateToProps(state) {
  return {
    randID: state.router.params.randID
  }
}

export default connect(mapStateToProps)(CompanyCreateOverview);
