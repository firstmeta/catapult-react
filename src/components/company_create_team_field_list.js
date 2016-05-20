import React, { Component } from 'react';
import randomstring from 'randomstring';

import Field from './company_create_team_field';

class CompanyCreateTeamFieldList extends Component {

  constructor(props) {
    super(props);

    this.addField = this.addField.bind(this);
    this.updateFieldContent = this.updateFieldContent.bind(this);
  }

  componentWillMount() {
    if(this.props.fieldContents.length < 1) {
      this.addField();
    }
  }

  addField() {
    var fieldContents = this.props.fieldContents.slice();
    var key = randomstring.generate(8);
    fieldContents.push({
      key: key,
      teamMemberName: '',
      teamMemberRole: '',
      teamMemberIntro: '',
      teamMemberPhoto: ''
    });
    this.props.update(fieldContents);
  }

  updateFieldContent(index, content) {
    var fieldContents = this.props.fieldContents.slice();
    fieldContents[index].teamMemberName = content.teamMemberName;
    fieldContents[index].teamMemberRole = content.teamMemberRole;
    fieldContents[index].teamMemberIntro = content.teamMemberIntro;
    fieldContents[index].teamMemberPhoto = content.teamMemberPhoto;

    this.props.update(fieldContents);
  }

  render() {
    var fieldContents = this.props.fieldContents;
    var renderedFields = [];

    for (var i = 0; i < fieldContents.length; i++) {
      renderedFields.push(
        <Field
          key={fieldContents[i].key}
          index={i}
          teamMemberName={fieldContents[i].teamMemberName}
          teamMemberRole={fieldContents[i].teamMemberRole}
          teamMemberIntro={fieldContents[i].teamMemberIntro}
          teamMemberPhoto={fieldContents[i].teamMemberPhoto}
          update={this.updateFieldContent}/>
      );
    }

    return (
      <div className="team-field-list">
        {renderedFields}
        <button onClick={this.addField}>
          <i className="fa fa-plus" />
        </button>
      </div>
    )
  }

}
export default CompanyCreateTeamFieldList;
