import React from 'react';

export default () => {
  return (
    <div className="aboutus">
      <div className="jumbotron">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-12 intro-section">
              <div className="text-bg">
                <h1>The Catapult team</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="team">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="row">
                <div className="col-sm-4">
                  <div><img src="https://catapult.asia/imgs/team_gustav.jpg"/></div>
                  <div className="designation">
                    <p>Gustav Liblik</p>
                    <p>CEO</p>
                    <div className="bio">
                      <p> - Founded 3 startups with 2 successful exits.</p>
                      <p> - Practised financial & commercial law with specialisation in computational law & smart contracts.</p>
                      <p> - Extensive sales experience &amp; award winner.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div><img src="https://catapult.asia/imgs/team_an.jpg"/></div>
                  <div className="designation">
                    <p>Phan Ngo Hoang An</p>
                    <p>CTO</p>
                    <div className="bio">
                      <p> - Designed &amp; developed one of the first peer-to-peer virtual currency exchanges.</p>
                      <p> - Designed &amp; developed a notary application on the Bitcoin blockchain.</p>
                      <p> - Extensive experience on the Bitcoin, Ethereum &amp; NXT blockchains.</p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div><img src="https://catapult.asia/imgs/team_melvin.jpg"/></div>
                  <div className="designation">
                    <p>Melvin Ong</p>
                    <p>COO</p>
                    <div className="bio">
                      <p> - Extensive operational experience in virtual currency exchange.</p>
                      <p> - AML/KYC compliance &amp; fraud risk management for integrated payment gateways.</p>
                      <p> - Majored in Operations Research &amp; real options analysis.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}
