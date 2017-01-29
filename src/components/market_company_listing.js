import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import numeral from 'numeral';
import { ROOT_IMAGE_URL } from '../config'
import Spinner from './spinner';
import { FetchAllListingCompanies } from '../actions/company_action';

class MarketCompanyListing extends Component {
	constructor(props) {
		super(props);
		
		this.formatCompanies = this.formatCompanies.bind(this);
	}

	componentWillMount() {
		this.props.FetchAllListingCompanies();
	}

	formatCompanies(companies) {
		return companies.map(function(company) {
			var c = {};
			c.Name = (
				<div className="company-name">
					<img src={ROOT_IMAGE_URL + '/' + company.ListingImage} className="img-circle" /> {company.Name} 
				</div>
			);
			c.AssetCode = company.AssetCode;
			c.LastPrice = company.LastTradeMoneyCode + ' ' + numeral(company.LastPrice).format('0,0.00');
			c.NumberOfSells = (company.NumberOfSells ? company.NumberOfSells : 0);
			c.NumberOfBuys = (company.NumberOfBuys ? company.NumberOfBuys : 0);
			c.Btn = (
				<Link to={'/market/openorders/' + company.AssetCode}>
					<button
						className="btn btn-primary btn-light-green btn-light-green-primary">
         		TRADE	
					</button>
				</Link>
			)
			return c;
		});
	}

	render() {
		const { ListingCompanies } = this.props;

		if(!ListingCompanies) {
			return (
				<div className="market-company-listing">
					<div className="container-fluid">
        	  <div className="row row-centered">
        	    <div className="col-lg-1 col-centered">
        	   		<h1>Companies Currently Trading</h1>
							</div>
							<Spinner />
        	  </div>
        	</div>
				</div>	
			)
		}
		return (
			<div className="market-company-listing">
				<div className="container-fluid">
					<div className="row row-centered">
            <div className="col-lg-1 col-centered">
           		<h1>Companies Currently Trading</h1>
						</div>
          </div>
					
					<div className="row">
       	    <div className="col-md-10 col-md-offset-1">
       	      <div>
			 					<BootstrapTable 
			 						data={this.formatCompanies(ListingCompanies)} 
			 						striped={true} hover={true} 
			 						className="table" 
			 						pagination={true} 
			 						options={{sizePerPage: 10}}
			 						tableStyle={{border: 'none'}}>
       	          <TableHeaderColumn dataField="Name" dataAlign="center" dataSort={true} width="100px">Company</TableHeaderColumn>
       	          <TableHeaderColumn dataField="AssetCode" isKey={true} width="70px">Asset Code</TableHeaderColumn>
       	          <TableHeaderColumn dataField="NumberOfSells" width="85px"># Sell orders</TableHeaderColumn>
       	          <TableHeaderColumn dataField="NumberOfBuys" width="85px"># Buy orders</TableHeaderColumn>
       	          <TableHeaderColumn dataField="LastPrice" width="90px">Last trade price</TableHeaderColumn>
			 						<TableHeaderColumn 
			 							dataField="Btn"
			 							width="100"></TableHeaderColumn>
       	        </BootstrapTable>
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
		ListingCompanies: state.CompanyState.allListingCompanies
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		FetchAllListingCompanies: FetchAllListingCompanies
	}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MarketCompanyListing);
