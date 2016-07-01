import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';

class CompanyCreateKYC extends Component {

  constructor(props){
    super(props);

    this.state = { uploadingFile: '' };

    this.upload = this.upload.bind(this);
  }

  upload() {

  }

  displayFileName() {
    if(this.state.uploadingFile) {
      return (
        <div className="uploading-filename">
          <p>{this.state.uploadingFile.name}</p>
        </div>
      )
    }
    else {
      return (
        <div>
          <span>Drop your zipped file here, or click to select file to upload.</span>
          <p className="plus">+</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="company-create-kyc">
        <div className="container-fluid">

          <div className="row">
            <div className="col-md-10 col-md-offset-1 segment add-padding">
              <h3>Company documents</h3>
              <div className="row">
                <div className="col-sm-10 col-sm-offset-1">
                  <div>
                    <i>
                      In order to show potential investors that your company is well established
                      and to comply with the government policy, we need the following documents from you
                      (documents 1, 2, 3 must be less than 6 months old):
                        <ol>
                          <li>National/State Government Register business profile document
                              (ACRA filing, Companies House filing, etc).</li>
                          <li>Memorandum and Articles of Association.</li>
                          <li>Certificate of Good Standing (for companies older than a year)</li>
                          <li>Company Structure Chart </li>
                          <li>Shareholder Information: for every director, signatory and shareholder
                              that owns more than 10% of the institution, please provide the below:
                              <ul>
                                <li>Name</li>
                                <li>Date of Birth</li>
                                <li>National ID / Passport (scanned COLOR PDF)</li>
                                <li>Proof of Residential Address (scanned PDF, not older than 6 months)
                                    Examples: utility bill, tax assessment, or bank statement</li>
                              </ul>
                          </li>
                        </ol>
                      <p>Please zip everything into one file before uploading.
                         We will <u><strong>encrypt</strong></u> your uploaded file and store it securely. </p>
                      <p><u>(You can skip this step now, and complete it later when you start a fund raising campaign with us.)</u></p>
                    </i>
                  </div>
                  <div className="row">
                    <div className="col-sm-4 col-md-offset-4">
                      <Dropzone
                        className="drop-file"
                        multiple={false}
                        onDrop={(files) => this.setState({uploadingFile: files[0]})}>
                        { this.displayFileName() }
                      </Dropzone>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-10 col-md-offset-1 segment row-last">
              <div className="row row-centered">
                <div className="col-lg-1 col-centered">
                  <button
                    className="btn btn-primary btn-green btn-green-primary full-width"
                    >
                    Save & Continue
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default CompanyCreateKYC;
