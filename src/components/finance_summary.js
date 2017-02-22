import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateformat from 'dateformat';
import numeral from 'numeral';
import Spinner from './spinner';
import { FetchMyFinanceTXs } from '../actions/finance_action'; 
import Alert from './global_alert';

class FinanceSummary extends Component {
	constructor(props) {
		super(props);

	}
	componentWillMount() {
		this.props.FetchMyFinanceTXs();
	}

	formatTXs(txs) {
		return txs.map(function(tx) {
			var t = {};
			t.TxId = tx.TxId;
			t.MoneyCode = tx.AssetMoneyCode;
			if (tx.TxType === 'MAKEORDEROFFERIPG'){
				t.Action = (
					<div>
						<p>BUY OFFER</p>
						{
							tx.TxStatus === 'SUCCESSFUL' ? 
								<center><span className="fa fa-check status-success" ></span></center>
								:
								<center><span className="fa fa-close status-fail" ></span></center>
						}
					</div>
				);
				t.AmountHold = (tx.TxStatus === 'SUCCESSFUL' ? tx.AmountGross : '');
				t.Details = (
					<div>
						<p>
							<span>Make buy offer for order: </span> <br />
							<span><strong>{tx.OrderId}</strong></span> 
						</p>
						{
							tx.TxStatus === 'SUCCESSFUL' &&
								<div>
									<span>{tx.IpgName}:</span> <br />
									<span className="font-small"><strong>{tx.IpgTxid}</strong></span> <br />
								</div>	
						}
					</div>
				)
			}
			if (tx.TxType === 'MAKEORDER'){
				t.Action = (
					<div>
						<p>BUY ORDER</p>
						{
							tx.TxStatus === 'SUCCESSFUL' ? 
								<center><span className="fa fa-check status-success" ></span></center>
								:
								<center><span className="fa fa-close status-fail" ></span></center>
						}
					</div>
				);
				t.AmountHold = (tx.TxStatus === 'SUCCESSFUL' ? tx.AmountGross : '');
				t.Details = (
					<div>
						<p>
							<span>Create buy order: </span> <br />
							<span><strong>{tx.OrderId}</strong></span> 
						</p>
						{
							tx.TxStatus === 'SUCCESSFUL' &&
								<div>
									<span>{tx.IpgName}:</span> <br />
									<span className="font-small"><strong>{tx.IpgTxid}</strong></span> <br />
								</div>	
						}
					</div>
				)
			}

			else if(tx.TxType === 'FILLORDERBUYER') {
				t.Action = (
					<div>
						<p>BUY FILLED</p>
						<center><span className="fa fa-check status-success"></span></center>
					</div>
				);
				t.Debit = numeral(-(+tx.AmountGross)).format('0,0.00');
				t.Details = (
					<div>
						<p><span>Order filled: <br /> <strong>{tx.OrderId} </strong></span></p>
						<span>Fund released to seller.</span>
					</div>
				);	
			}
			else if(tx.TxType === 'FILLORDERSELLER') {
				t.Action = (
					<div>
						<p>SELL FILLED</p>
						<center><span className="fa fa-check status-success" ></span></center>
					</div>
				);
				t.Credit = numeral(+tx.AmountGross).format('0,0.00');
				t.Details = (
					<div>
						<p><span>Order filled: <br /> <strong>{tx.OrderId} </strong></span></p>
						<span>Fund credited to your account.</span>
					</div>
				);
			}
			else if(tx.TxType === 'DEPOSIT'){
				t.Action = 'DEPOSIT';
				t.Credit = numeral(+tx.AmountNet).format('0,0.00');
			}
			else if(tx.TxType === 'WITHDRAW') {
				t.Action = 'WITHDRAW';
				t.Debit = numeral(-(+tx.AmountGross)).format('0,0.00');
			}
			else if(tx.TxType === 'CANCELORDER') {
				t.Action = (
					<div>
						<p>CANCEL ORDER</p>
						<center><span className="fa fa-check status-success" ></span></center>
					</div>
				);
				t.Details = (
					<div>
						<p><span>Order cancelled: <br /> <strong>{tx.OrderId} </strong></span></p>
						<span>Fund creditted to your balance.</span>
					</div>
				);	
				t.Credit = numeral(tx.AmountGross).format('0,0.00');
			}

			t.Timestamp = (
				<div>
					<span>Started on:</span> <br />
					<span className="font-small">{dateformat(tx.CreatedOn, 'mmm d, yyyy HH:MM:ss')}</span> <br />
					<span>Ended on:</span> <br />
					<span className="font-small">
						{tx.TxEndedOn ? dateformat(tx.TxEndedOn, 'mmm d, yyyy HH:MM:ss') : ''}
					</span>
				</div>
			);
			t.Status = tx.TxStatus;
			return t;
		});
	}

	render() {
		const { MyFinanceTXs } = this.props;

		if (!MyFinanceTXs) {
			return (
				<div className="finance-summary">
					<center><Spinner /></center>
				</div>
			)
		}
		return (
			<div className="finance-summary">
				<div className="container-fluid">
					<Alert />
					<div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div>


								<BootstrapTable 
									data={this.formatTXs(MyFinanceTXs)} 
									striped={true} hover={true} 
									className="table" 
									pagination={true} 
									options={{sizePerPage: 5}}
									tableStyle={{border: 'none'}}>
                  <TableHeaderColumn dataField="TxId" isKey={true} dataAlign="center" dataSort={true} width="130px">TxId</TableHeaderColumn>
                  <TableHeaderColumn dataField="Details" width="200px">Details</TableHeaderColumn>
									<TableHeaderColumn dataField="Action" width="100px">Action/Status</TableHeaderColumn>
                  <TableHeaderColumn dataField="MoneyCode" width="42px">$</TableHeaderColumn>
                  <TableHeaderColumn dataField="Credit" width="70px">Credit</TableHeaderColumn>
                  <TableHeaderColumn dataField="Debit" width="70px">Debit</TableHeaderColumn>
                  <TableHeaderColumn dataField="AmountHold" width="70px">Hold</TableHeaderColumn>
                  <TableHeaderColumn dataField="Timestamp" width="120px">Timestamp</TableHeaderColumn>
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
		MyFinanceTXs: state.FinanceState.MyFinanceTXs
	}
}
function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		FetchMyFinanceTXs: FetchMyFinanceTXs
	}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(FinanceSummary);
