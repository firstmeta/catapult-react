import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import Spinner from './spinner';

const InputModal = ({
	title, msg, inputLabel, value, inputCapture, show, showSpinner, close, btnFun, styleName
}) => {
	return (
		<div>
			<Modal 
				dialogClassName={styleName ? styleName : "input-modal"} 
				show={show} 
				onHide={close}>
				<Modal.Header closeButton>{title}</Modal.Header>
				<Modal.Body>
					{showSpinner && <center><Spinner /></center>}
					{!showSpinner && 
						<div>
							<div className="msg">
								{msg}							
							</div>
							<br />
							<div className="form-group">
									<label>{inputLabel}</label>
									<input
										type="password"
										value={value}
										className="form-control"
										placeholder="Password*"
										onChange={event => inputCapture(event.target.value)}
									/>
							</div>

							<Button 
								className="btn btn-primary btn-light-green btn-light-green-primary full-width"
								onClick={() => {
									close();
									btnFun();
								}}>
								PROCEED	
							</Button>
						</div>
					}
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default InputModal;
