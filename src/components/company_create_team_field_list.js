import React, { Component } from 'react';
import randomstring from 'randomstring';

import Field from './company_create_team_field';

class CompanyCreateTeamFieldList extends Component {

  constructor(props) {
    super(props);

    this.addField = this.addField.bind(this);
    this.removeField = this.removeField.bind(this);
    this.updateFieldContent = this.updateFieldContent.bind(this);
    this.updateFieldContentTexts = this.updateFieldContentTexts.bind(this);
  }

  componentWillMount() {
    if(this.props.savedTeam) {
      var fieldContents = [];

      this.props.savedTeam.map((member) => {
        fieldContents.push({
          name: member.name,
          role: member.role,
          intro: member.intro,
          photo: '',
          savedPhoto: member.photoName
        });
      });

      this.props.update(fieldContents);
    }
    else if(this.props.fieldContents.length < 1) {
      this.addField();
    }
  }

  addField() {
    var fieldContents = this.props.fieldContents.slice();
    var key = randomstring.generate(8);
    fieldContents.push({
      name: '',
      role: '',
      intro: '',
      photo: '',
      savedPhoto: ''
    });
    this.props.update(fieldContents);
  }

  removeField(index) {
    var fieldContents = this.props.fieldContents.slice();
    fieldContents.splice(index, 1);
    this.props.update(fieldContents);
  }

  updateFieldContent(index, content) {
    var fieldContents = this.props.fieldContents.slice();
    fieldContents[index].name = content.name;
    fieldContents[index].role = content.role;
    fieldContents[index].intro = content.intro;
    fieldContents[index].photo = content.photo;

    this.props.update(fieldContents);
  }
  updateFieldContentTexts(index, content) {
    var fieldContents = this.props.fieldContents.slice();
    fieldContents[index].name = content.name;
    fieldContents[index].role = content.role;
    fieldContents[index].intro = content.intro;
    fieldContents[index].photo = content.photo;

    this.props.updateTexts(fieldContents);
  }

  render() {
    var fieldContents = this.props.fieldContents;
    var renderedFields = [];

    for (var i = 0; i < fieldContents.length; i++) {
      var key = randomstring.generate(8);
      renderedFields.push(
        <Field
          key={key}
          index={i}
          name={fieldContents[i].name}
          role={fieldContents[i].role}
          intro={fieldContents[i].intro}
          photo={fieldContents[i].photo}
          savedPhoto={fieldContents[i].savedPhoto}
          update={this.updateFieldContent}
          remove={this.removeField}
          updateTexts={this.updateFieldContentTexts}/>
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
