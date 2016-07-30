import React, { Component } from 'react';

export default class FooterNav extends Component {
	render() {
		return (
			<footer className="footer">
      	<div className="container">
          	<p>
							Catapult by <a href="http://firstmeta.com" title="Catapult - Equity Crowdfunding on Blockchain">First Meta Pte. Ltd. </a>© 2016
							&nbsp; | &nbsp; <a href="/aboutus" target="_blank">About Us</a>
						</p>
						<hr />
						<div className="disclaimer">This is a technology demonstration website. All of the data and functionalities displayed are for demonstration purposes only.
							 The information contained in this website is for general information purposes only.
							 For the avoidance of doubt, the information provided is not to be construed as offers or solicitations of any kind.
							 Any reliance you place on such information is therefore strictly at your own risk.
						</div>

						<div className="disclaimer">Through this website you are able to link to other websites which are not under the control of First Meta Pte. Ltd.
							 First Meta Pte. Ltd. has no control over the nature, content and availability of these sites.
							 The inclusion of any links does not imply a recommendation or endorsement of the views expressed within them.
						</div>
						<br />
      	</div>
  		</footer>
		);
	}
}
