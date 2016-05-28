import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import CompanyCreateBasics from './company_create_basics';
import CompanyCreateOverview from './company_create_overview';
import CompanyCreateSummary from './company_create_summary';

class CompanyCreate extends Component {

  render() {
    const { randID, step } = this.props;

    return (
      <div className="company-create">

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
              <div className="btn-toolbar" role="toolbar">
                <div className="btn-group" role="group">
                  <Link to={"/company/" + randID + "/edit"}>
                    <button
                      type="button"
                      className={
                          "btn btn-default no-border-radius-right no-border-right " +
                          ((!step || step === 'basics') ? "btn-clicked" : "")
                        }>
                      Basics
                    </button>
                  </Link>
                  <Link to={"/company/" + randID + "/edit?step=overview"}>
                    <button
                      type="button"
                      className={
                        "btn btn-default no-border-radius no-border-right " +
                        ((step === 'overview') ? "btn-clicked" : "")
                      }>
                      Overview
                    </button>
                  </Link>
                  <Link to={"/company/" + randID + "/edit?step=summary"}>
                    <button
                      type="button"
                      className={
                        "btn btn-default no-border-radius-left " +
                        ((step === 'summary') ? "btn-clicked" : "")
                      }>
                      Summary
                      </button>
                  </Link>
                </div>
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default"><Link to="/companycreate/preview">Preview</Link></button>
                </div>

                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default"><Link to="/companycreate/submit">Submit</Link></button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {(!step || step === 'basics') &&  <CompanyCreateBasics />}
        {step === 'overview' && <CompanyCreateOverview />}
        {step === 'summary' && <CompanyCreateSummary />}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    randID: state.router.params.randID,
    step: state.router.location.query.step
  }
}

export default connect(mapStateToProps)(CompanyCreate);
