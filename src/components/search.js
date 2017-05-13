import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import _ from 'lodash';

const Search = ({
	btnFunc,
	searchFunc,
	btnName,
	searchTerm,
	results,
	clearResults,
	updateSelectedFunc
}) => { 
	return (	
		<div className="search">
			<div className="container-fluid">
				<div className="row">
					<div 
						className={btnName ? "col-md-10" : "col-md-12"}
						onBlur={clearResults}>
						<input
							type="text" 
							placeholder="Enter user email to search"
							onChange={event => {
								searchFunc(event.target.value);
							}}/>
						{results}
					</div>
					{
						btnName &&
							<div className="col-md-2">
								<button 
									className="
										btn btn-primary btn-light-green 
										btn-light-green-primary full-width">
									{btnName}	
								</button>
							</div>
					}
				</div>
				
			</div>	
		</div>
	)		
}

export default Search;
