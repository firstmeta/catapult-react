import React from 'react';
import randomstring from 'randomstring';

import InputRow from './input_row';

const InputRowList = ({
	list,
	updateInput,
	updateComponent
}) => {
	
	var renderedList = [];

	var handleInputChange = function(index, value) {
		var l = list.slice();
		l[index].value = value;

		updateInput(l);
	}

	var removeInputRow = function(index) {
		var l = list.slice();
		l.splice(index, 1)

		updateComponent(l);
	}
	
	for ( var i = 0; i < list.length; i++) {
		var key = randomstring.generate(8);
		renderedList.push(
			<InputRow
				key={key}
				index={i}
				description={list[i].description}
				ext={list[i].ext}
				value={list[i].value}
				handleInputChange={handleInputChange}
				remove={removeInputRow}/>
		);
	}
	return (
		<div className="input-row-list">
			{renderedList}	
		</div>	
	)
}

export default InputRowList;
