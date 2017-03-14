import React from 'react';

const InputRow = ({
	index,
	remove,
	description,
	ext,
	value,
	handleInputChange
}) => {
	
	return (
		<div className="input-row">
			<div className="container-fluid">
				<div className="row">
					<div className="col-md-5">
						{description}
					</div>
					<div className="col-md-4">
						{ext}
					</div>

					<div className="col-md-2">
						<input
							type="text"
							style={{
								'border-top': '0px',
								'border-bottom': '1px solid #ccc',
								'border-left': '0px',
								'border-right': '0px',
								'border-radius': '0px',
								'height': '23px',
								'margin-bottom': '5px',
								'padding': '1px',
								'-webkit-box-shadow': 'none',
								'text-align': 'center'
							}}
             	className="form-control"
							onChange={event => {
								handleInputChange(index, event.target.value)
							}}
							defaultValue={value}/>

					</div>
					<div className="col-md-1">
						<span
        	    style={{cursor: 'pointer', 'font-size': '12px'}}
         			onClick={() => remove(index)}>
              x
        	  </span>
					</div>
				</div>
			</div>
		</div>	
	)
}

export default InputRow;
