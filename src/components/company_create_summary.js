import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  AlloyEditor from 'alloyeditor';
import {  FetchCompanyByRandID, SaveCompanySummary, UploadCompanySummaryImage } from '../actions/company_action';

class CompanyCreateSummary extends Component {

  constructor(props) {
    super(props);

    this.state = {
      imgs: {}
    }
    this.initializeContent = this.initializeContent.bind(this);
    this.saveCompanySummary = this.saveCompanySummary.bind(this);
    this.uploadImage = this.uploadImage.bind(this);

  }

  componentWillMount() {
    this.props.FetchCompanyByRandID(this.props.randID);
  }

  componentDidMount() {
    if(this.refs.editable && !this._editor) {
      this._editor = AlloyEditor.editable("editable");
      this._editor.get('nativeEditor')
                 .on('imageAdd', this.uploadImage);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    this._editor = AlloyEditor.editable("editable");
    this._editor.get('nativeEditor')
               .on('imageAdd', this.uploadImage);
  }

  initializeContent() {
    if(this.props.company.Summary) {
      return this.props.company.Summary;
    }
    else {
      return '<h2>Introduction</h2><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla dignissim magna quis augue condimentum imperdiet. Praesent tempor turpis justo, nec condimentum risus euismod quis. Maecenas quam neque, scelerisque nec ex a, tristique auctor sapien. Quisque id semper lectus, efficitur consequat enim. Sed ac convallis leo. Vivamus rutrum vestibulum erat, et volutpat diam pellentesque maximus. Ut blandit metus nec tortor commodo, ultricies venenatis metus sollicitudin. Mauris feugiat felis non ex ullamcorper sodales. Pellentesque ac sodales felis. Sed at mollis augue. Pellentesque vulputate elit lacinia venenatis maximus. Nam efficitur aliquam ipsum et lobortis. Aenean laoreet neque sed elementum consectetur. Ut imperdiet urna et ultricies aliquam. Aliquam justo lorem, tempor ut pulvinar in, pharetra eu tellus.&nbsp;</p><h2> </h2><h2>Idea</h2><p>Etiam id egestas lorem. Duis non augue aliquet, vehicula elit eget, interdum nisl. In et mauris odio. Curabitur in diam id odio aliquet iaculis quis ut ante. Aliquam vulputate in ante id auctor. Integer aliquam ex vitae molestie congue. Nunc dapibus, augue ac hendrerit facilisis, orci nulla dignissim risus, sit amet efficitur enim sapien quis felis. Quisque efficitur, odio nec iaculis sagittis, ex sem bibendum sapien, nec tempor nisi velit vitae neque. Vestibulum imperdiet elementum tortor in aliquam. Fusce suscipit vel libero nec ornare.</p><h2>Product</h2><h2><img src="http://localhost:8008/imgs/3751655783320719880-star-wars-episode-vii---the-force-awakens-[dayt.se].png" /></h2><p> </p><h2>Market</h2><p>Maecenas nec pharetra urna, eu lacinia nisi. Quisque fringilla mattis egestas. Duis finibus eget libero at faucibus. Maecenas dignissim consectetur risus, a lacinia arcu eleifend id. Integer blandit placerat tempor. Ut sodales, est dignissim placerat convallis, sem augue sollicitudin nibh, eget malesuada dolor quam eget dolor. Suspendisse et tellus metus. Aenean tristique et eros at finibus. Vestibulum non nisl faucibus, viverra libero eget, dictum massa. Morbi mattis velit finibus lacus ultrices bibendum. Mauris non imperdiet erat, sit amet feugiat massa. Pellentesque sagittis mauris id purus scelerisque, sodales lobortis sapien suscipit.</p><h2>Business Model</h2><p>Integer cursus commodo odio, non suscipit eros feugiat pretium. Curabitur lacinia erat nec ipsum interdum cursus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin massa dolor, egestas at metus sit amet, lobortis fringilla felis. Nam non rhoncus nunc. Cras vitae varius purus. Sed nec mi commodo, feugiat elit id, commodo sapien. Duis nec diam ipsum. Integer egestas sem orci, a euismod odio faucibus tempus. Pellentesque maximus tellus in est vulputate egestas. In ullamcorper, felis et blandit vestibulum, enim turpis aliquam leo, sed convallis lectus arcu eu massa. Fusce et efficitur nibh. Donec eget cursus ex. Mauris nec urna libero.</p><h2>Industry Recognition</h2><p>Nullam ut faucibus ligula. Integer magna nulla, rutrum ac vestibulum eget, rutrum vitae nibh. Vivamus non volutpat libero. Sed mi ligula, venenatis sed dui vel, ultricies molestie lectus. Mauris sagittis, nisl et ullamcorper congue, turpis nisi finibus urna, in dignissim nulla quam feugiat velit. Maecenas non turpis non arcu scelerisque viverra eget nec dolor. Quisque sit amet dapibus lectus. Donec at risus id libero laoreet rhoncus eu quis urna. Vestibulum varius ullamcorper consectetur. Ut hendrerit imperdiet posuere. Morbi quis felis dolor. Vestibulum hendrerit, velit eget faucibus pharetra, nisi tortor faucibus est, id aliquet ante tellus non ipsum. Donec ut auctor diam, nec tempus nisl. Ut at arcu interdum, ultrices lectus ac, gravida tellus.</p>';
    }
  }

  uploadImage(event) {
    this.props.UploadCompanySummaryImage(event, this.props.randID);
  }

  saveCompanySummary() {
    var ckEditor = this._editor.get('nativeEditor');
    this.props.SaveCompanySummary({randID: this.props.randID, summary: ckEditor.getData()});
  }

  render() {
    const { company } = this.props;

    if (!company || company.RandID !== this.props.randID) {
      return <div>Loading...</div>;
    }

    return (
      <div className="company-create-summary">
        <div className="container-fluid">

          <div className="row">
            <div className="col-md-10 col-md-offset-1 segment add-padding">
              <h3>Company summary</h3>
              <div className="row">
                <div className="col-sm-10 col-sm-offset-1">
                  <div>
                    <i>
                      Tell us more about your company and your company's products.
                      You can use the following template or delete everything and add your own.
                      Just <u><strong>click inside the text area</strong></u> to start typing.
                      If you want <strong>to add image, just drag and drop </strong>it into the text area :).
                    </i>
                  </div>
                  <div
                    className="editable"
                    ref="editable"
                    id="editable"
                    dangerouslySetInnerHTML={{__html: this.initializeContent()}}>
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
                  onClick={this.saveCompanySummary}>
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

function mapStateToProps(state) {
  return {
    randID: state.router.params.randID,
    company: state.CompanyState.companyDetails
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    FetchCompanyByRandID: FetchCompanyByRandID,
    SaveCompanySummary: SaveCompanySummary,
    UploadCompanySummaryImage: UploadCompanySummaryImage
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyCreateSummary);
