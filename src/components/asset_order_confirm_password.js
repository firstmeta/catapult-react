import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const InputModal = ({
	title, msg, inputLabel, value, inputCapture, show, close, btnFun
}) => {
	return (
		<div >
			<Modal dialogClassName="input-modal" show={show} onHide={close}>
				<Modal.Header closeButton>{title}</Modal.Header>
				<Modal.Body>
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

				</Modal.Body>
			</Modal>
		</div>
	);
};

export default InputModal;
