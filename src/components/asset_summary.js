import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import dateformat from 'dateformat';
import numeral from 'numeral';

import Spinner from './spinner';
import { FetchAssetTxs } from '../actions/asset_action';
import { COLOREDCOINS_EXPLORER_URL } from '../config';

class AssetSummary extends Component {

  constructor(props) {
    super(props);

    this.renderBalances = this.renderBalances.bind(this);
  }

  componentWillMount() {
    if(this.props.wallet.ID) {
      this.props.FetchAssetTxs(this.props.wallet.ID);
    }
    else {
      var attempt = 0;
      var self = this;

      var f = function() {
        if(self.props.wallet.ID) {
          self.props.FetchAssetTxs(self.props.wallet.ID);
        }
        else if (attempt < 4) {
          attempt += 1;
          setTimeout(f, 1000 * attempt);
        }
      }

      f();
    }

  }


  renderBalances() {
    return this.props.Balances.map(b => {
      return (
        <div className="row">
          <div className="col-md-8">{b.AssetName}</div>
          <div className="col-md-4">{numeral(b.Amount).format('0,0')}</div>
        </div>
      )
    });
  }

  render() {

    const { TXs, wallet } = this.props;

    if (!TXs || !TXs.length > 0) {
      return (
        <div className="main-panel-spinner">
          <Spinner />
        </div>
      );
    }

    var formattedTXs = TXs.map(function(tx) {
      var ftx = {};
      ftx.TxID = tx.TxID;
      ftx.TxType = (tx.TxType === 'TRANSFER' ? 'TFR' : 'ISU');
      ftx.Ref = (
        wallet.Address === tx.ToAddress ?
          <div>
            <label>Received from: </label>
            <p><a target="_blank" href={COLOREDCOINS_EXPLORER_URL + '/address/' + tx.FromAddress}>{tx.FromAddress}</a></p>

            <label>Blockchain TxID: </label>
            <p><a target="_blank" href={COLOREDCOINS_EXPLORER_URL + '/tx/' + tx.BlockchainTxHash}>{tx.BlockchainTxHash}</a></p>
          </div>
          :
          <div>
            <label>Sent to:</label>
            <p><a target="_blank" href={COLOREDCOINS_EXPLORER_URL + '/address/' + tx.ToAddress}>{tx.ToAddress}</a></p>

            <label>Blockchain TxID:</label>
            <p><a target="_blank" href={COLOREDCOINS_EXPLORER_URL + '/tx/' + tx.BlockchainTxHash}>{tx.BlockchainTxHash}</a></p>
          </div>

      );
      if (wallet.Address === tx.ToAddress) {
        ftx.Credit = numeral(tx.Amount).format('0,0');
      }
      else {
        ftx.Debit =numeral(tx.Amount).format('0,0');
      }

      ftx.TxStatus = tx.TxStatus;

      var initiatedDate = new Date(tx.InitiatedOn);
      var endedDate = (tx.EndedOn ? new Date(tx.EndedOn) : '')

      var initiatedOn = dateformat(initiatedDate, 'mmm d, yyyy HH:MM:ss');
      var endedOn = endedDate ? dateformat(endedDate, 'mmm d, yyyy HH:MM:ss') : 'processing...';

      ftx.Date = (
        <div>
          <label>Initiated on:</label>
          <p>{initiatedOn}</p>

          <label>Ended on:</label>
          <p>{endedOn}</p>
        </div>
      )

      return ftx;
    });


    return (
      <div className="wide-panel">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-10 col-md-offset-1">
              <div className="asset-summary">

                {
                  this.props.Balances &&
                  <div className="balances">
                    <div className="panel panel-default">
                      <div className="panel-heading">
                        Asset Balances
                      </div>
                      <div className="panel-body">
                        {this.renderBalances()}
                      </div>
                    </div>
                  </div>
                }


                <BootstrapTable data={formattedTXs} striped={true} hover={true} className="table" pagination={true}>
                  <TableHeaderColumn dataField="TxID" isKey={true} dataAlign="center" dataSort={true} width="145px">TxID</TableHeaderColumn>
                  <TableHeaderColumn dataField="TxType" width="55px">Type</TableHeaderColumn>
                  <TableHeaderColumn dataField="Ref" dataFormat={this.format}>Reference</TableHeaderColumn>
                  <TableHeaderColumn dataField="Credit" width="75px">Credit</TableHeaderColumn>
                  <TableHeaderColumn dataField="Debit" width="75px">Debit</TableHeaderColumn>
                  <TableHeaderColumn dataField="TxStatus" width="80px">Status</TableHeaderColumn>
                  <TableHeaderColumn dataField="Date" width="150px">Date</TableHeaderColumn>
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
    wallet: state.WalletState.wallet,
    Balances: state.AssetState.AssetBalances,
    TXs: state.AssetState.AssetTXs
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchAssetTxs: FetchAssetTxs
  }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(AssetSummary);
