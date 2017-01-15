import React from 'react';
import numeral from 'numeral';

const AssetOrderNew = ({
	type,
	assetCode,
	assetName,
	assetDesc,
	logoUrl,
	amount,
	price,
	total,
	moneyCode,
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
					assetName: a.AssetName,
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
	
	var buyingAssetLis =	buyingAssets.map(a => 
		<li
			key={a.AssetID}
			onClick={
				() => onInputChange({
					assetCode: a.Code,
					assetName: a.Name,
					assetDesc: a.Name,
					logoUrl: a.LogoUrl
				})
			}>
			<a>
				<img src={a.LogoUrl} className="img-circle"/> &nbsp;
				{a.Code}
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
								Token	
							</div>
							<div className="col-sm-2">
								Amount	
							</div>
							<div className="col-sm-2">
								Price	
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
                 	 data-toggle="dropdown"
                 	 aria-haspopup="true"
                 	 aria-expanded="true">
									 {type === 'sell' ? 'SELL' : 'BUY'} 
									 <span className="caret"></span>
                	</button>

									<ul className="dropdown-menu">
										<li onClick={() => onInputChange({type: 'sell'})}><a>SELL</a></li>	
										<li onClick={() => onInputChange({type: 'buy'})}><a>BUY</a></li>
									</ul>
								</div>

							</div>
							<div className="col-sm-4">
								<div className="dropdown">
									<button
                 	 className="btn btn-default dropdown-toggle asset-desc"
                 	 type="button"
                 	 data-toggle="dropdown"
                 	 aria-haspopup="true"
									 aria-expanded="true">
									 {assetDesc ? 
											 <span>
												 <img src={logoUrl} className="img-circle"/>
												 {assetDesc}
											 </span> 
											 : 'Select an Asset'} &nbsp;
									 <span className="caret"></span>
                	</button>

									<ul className="dropdown-menu">
										{type === 'sell' ? sellingAssetLis : buyingAssetLis}
									</ul>
								</div>
							</div>
							<div className="col-sm-2">
								<input
                type="text"
								value={amount}
								onChange={event => {
									var total = '';
									var amount = event.target.value;
									if (price) {
										total = numeral(amount * price).format('0,0.00');	
									}

									onInputChange({amount: amount, total: total})
								}}
                />

							</div>
							<div className="col-sm-2">
								<input
                type="text"
								value={price}
								onChange={event => {
									var total = '';
									var price = event.target.value;
									if (amount) {
										total = numeral(amount * price).format('0,0.00');	
									}
									onInputChange({price: price, total: total});
								}}
                />
							
							</div>
							<div className="col-sm-1">
								<div className="dropdown">
									<button
                 	 className="btn btn-default dropdown-toggle"
                 	 type="button"
                 	 data-toggle="dropdown"
                 	 aria-haspopup="true"
                 	 aria-expanded="true">
									 {moneyCode} 
									 <span className="caret"></span>
                	</button>

									<ul className="dropdown-menu">
										<li onClick={() => onInputChange({moneyCode: 'SGD'})}><a>SGD</a></li>	
									</ul>
								</div>

							</div>

							<div className="col-sm-2">
								<div className="total">
									<span>&asymp; {total}</span>
								</div>
							</div>
						</div>

	
					</div>
				</div>
			</div>	
		</div>
	);
}
export default AssetOrderNew;
