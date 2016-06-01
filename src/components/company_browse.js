import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FetchAllActiveCompanies } from '../actions/company_action';
import { ROOT_IMAGE_URL } from '../config';
import { CountryMap } from './countries';

class CompanyBrowse extends Component {

  constructor(props){
    super(props);

    this.renderCompanies = this.renderCompanies.bind(this);
  }

  componentWillMount() {
    this.props.FetchAllActiveCompanies();
  }

  renderCompanies() {
    const { allCompanies } = this.props;

    if(!allCompanies) {
      return <div>Loading...</div>;
    }

    console.log(allCompanies);

    var numberOfRows = Math.ceil(allCompanies.length / 3);
    var index = 0;
    var rows = [];
    var cols = [0, 1, 2];

    for (var i=0; i < numberOfRows; i++) {
      rows.push(i*3);
    }

    return (
      <div>
        {
          rows.map((r) => {
            return (
              <div className="row">
                {
                  cols.map((c) => {
                    if(!allCompanies[r+c]) {
                      return <div />
                    }
                    return (
                      <div className="col-md-4">
                        <div className="company-card">
                          <div className="panel panel-default">
                            <div className="panel-body">
                              <div className="listing-image">
                                <img src={ROOT_IMAGE_URL + '/' + allCompanies[r+c].ListingImage} />
                              </div>
                              <div className="content">
                                <h3>{allCompanies[r+c].CompanyName + ' - ' + allCompanies[r+c].Slogan}</h3>
                                <p>{allCompanies[r+c].DescriptionShort}</p>
                                <div className="card-footer">
                                  <span className="fa fa-tags">&nbsp; {allCompanies[r+c].Industry}</span>
                                  <span className="fa fa-map-marker">&nbsp; {CountryMap[allCompanies[r+c].Country]}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
    )


  }

  render() {
    return (
      <div className="company-browse">

      <div className="container-fluid">
        <div className="row row-centered">
          <div className="col-lg-1 col-centered">
          <h1>Browse potential companies</h1>
          </div>
        </div>
      </div>

        <div className="container-fluid company-list">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">

              {this.renderCompanies()}

            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    allCompanies: state.CompanyState.allCompanies
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({FetchAllActiveCompanies: FetchAllActiveCompanies}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyBrowse);
