import React from 'react';

const AssetOrderConfirm = ({
	type,
	assetCode,
	assetName,
	assetDesc,
	logoUrl,
	amount,
	price,
	total,
	moneyCode,
}) => {
	return (
		<div className="asset-order-confirm">
			<div className="container-fluid">
				
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<div className="confirm-msg">
							You are submitting a <strong>{type.toUpperCase()}</strong> order for <strong>{amount } tokens </strong> at a price of <strong>{price + ' ' + moneyCode} per token</strong>. This means you are legally committing to {type === 'buy' ? 'making the payment' : 'transferring of your assets'} for this transaction.		
						</div>

					</div>	
				</div>
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
						
						<div className="row order-content">
							<div className="col-sm-1">
							 {type === 'sell' ? 'SELL' : 'BUY'} 
							</div>
							<div className="col-sm-4">
								<img src={logoUrl} className="img-circle"/>{assetName}		
							</div>
							<div className="col-sm-2">
								{amount}	
							</div>
							<div className="col-sm-2">
								{price}	
							</div>
							<div className="col-sm-1">
								{moneyCode}	
							</div>

							<div className="col-sm-2">
								{total}			
							</div>

						</div>

					</div>
				</div>

			</div>	
		</div>	
	);
};
export default AssetOrderConfirm;
