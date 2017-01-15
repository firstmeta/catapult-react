import React from 'react';
import { Link } from 'react-router';

const AssetOrderSuccess = ({
	type, assetName, amount, price, moneyCode, orderid	
}) => {
	assetName = assetName.replace(' equity', '').replace(' Equity', '');
	return (
		<div className="asset-order-confirm">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-6 col-md-offset-3">
						<div className="confirm-msg">
							Your  <strong>{type.toUpperCase()}</strong> order for <strong>{amount + ' ' + assetName} tokens </strong> at a price of <strong>{price + ' ' + moneyCode} per token</strong> was successfully submitted. Your order number is: <strong>{orderid}</strong>	
						</div>

					</div>	
				</div>
	
			</div>
		</div>
	);
};

export default AssetOrderSuccess;
