import React, { Component } from 'react';
import { Link } from 'react-router';
import CompanyCreateBasics from './company_create_basics';
import CompanyCreateOverview from './company_create_overview';

class CompanyCreate extends Component {


  render() {
    return (
      <div className="company-create">

        <div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
            <h1>Let's raise fund for your company!</h1>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="row row-centered">
            <div className="col-lg-1 col-centered">
              <div className="btn-toolbar" role="toolbar">
                <div className="btn-group" role="group">
                  <button type="button" className="btn btn-default"><Link to="/companycreate/basic">Basics</Link></button>
                  <button type="button" className="btn btn-default"><Link to="/companycreate/overview">Overview</Link></button>
                  <button type="button" className="btn btn-default"><Link to="/companycreate/summary">Summary</Link></button>
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

        <CompanyCreateOverview />


      </div>
    )
  }
}

export default CompanyCreate;
