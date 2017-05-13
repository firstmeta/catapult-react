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
								'borderTop': '0px',
								'borderBottom': '1px solid #ccc',
								'borderLeft': '0px',
								'borderRight': '0px',
								'borderRadius': '0px',
								'height': '23px',
								'marginBottom': '5px',
								'padding': '1px',
								'WebkitBoxShadow': 'none',
								'textAlign': 'center'
							}}
             	className="form-control"
							onChange={event => {
								handleInputChange(index, event.target.value)
							}}
							defaultValue={value}/>

					</div>
					<div className="col-md-1">
						<span
        	    style={{cursor: 'pointer', 'fontSize': '12px'}}
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
