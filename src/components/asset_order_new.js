import React from 'react';
import numeral from 'numeral';

const AssetOrderNew = ({
	type,
	assetCode,
	assetDesc,
	logoUrl,
	amount,
	price,
	total,
	buyingAssets, 
	sellingAssets, 
	onInputChange
}) => {
	var sellingAssetLis =	sellingAssets.map(a => 
		<li
			key={a.AssetID}
			onClick={
				() => onInputChange({
					assetCode: a.AssetCode,
					assetDesc: a.AssetCode + ' - ' + numeral(a.Amount).format('0,0'),
					logoUrl: a.LogoUrl
				})
			}>
			<a>
				<img src={a.LogoUrl} className="img-circle"/> &nbsp;
				{a.AssetCode + ' - ' + numeral(a.Amount).format('0,0')}
			</a>	
		</li>	
	); 
	return (
		<div className="asset-order-new">
			<div className="container-fluid">
				
				<div className="row">
					<div className="col-md-6 col-md-offset-3 segment">
						<div className="row title">
							<div className="col-sm-1">
								Type	
							</div>
							<div className="col-sm-4">
								Company	
							</div>
							<div className="col-sm-2">
								Token Amount	
							</div>
							<div className="col-sm-2">
								Token Price	
							</div>
							<div className="col-sm-1">
								$	
							</div>

							<div className="col-sm-2">
								Total		
							</div>
						</div>
						
						<div className="row">
							<div className="col-sm-1">
								<div className="dropdown">
									<button
                 	 className="btn btn-default dropdown-toggle"
                 	 type="button"
                 	 id="regCountry"
                 	 data-toggle="dropdown"
                 	 aria-haspopup="true"
                 	 aria-expanded="true">
									 Sell 
									 <span className="caret"></span>
                	</button>

									<ul className="dropdown-menu">
										<li>Sell</li>	
										<li>Buy</li>
									</ul>
								</div>

							</div>
							<div className="col-sm-4">
								<div className="dropdown">
									<button
                 	 className="btn btn-default dropdown-toggle"
                 	 type="button"
                 	 id="regCountry"
                 	 data-toggle="dropdown"
                 	 aria-haspopup="true"
									 aria-expanded="true">
									 {assetDesc ? 
											 <span>
												 <img src={logoUrl} className="img-circle"/> &nbsp;
												 {assetDesc}
											 </span> 
											 : 'Select an Asset'} &nbsp;
									 <span className="caret"></span>
                	</button>

									<ul className="dropdown-menu">
										{sellingAssetLis}
									</ul>
								</div>
							</div>
							<div className="col-sm-2">
								<input
                type="text"
								value={amount}
								onChange={event => onInputChange({amount: event.target.value})}
                />

							</div>
							<div className="col-sm-2">
								<input
                type="text"
								value={price}
								onChange={event => onInputChange({price: event.target.value})}
                />
							
							</div>
							<div className="col-sm-1">
								SGD	
							</div>

							<div className="col-sm-2">

							</div>
						</div>

	
					</div>
				</div>
			</div>	
		</div>
	);
}
export default AssetOrderNew;
