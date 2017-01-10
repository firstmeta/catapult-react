import React from 'react';

const Timeline = ({milestones}) => {
	var milestoneLis = milestones.map((ms, index) =>
		<li className={"li " + ms.status}>
    	<div className="task-upper">
				<h4><center>{index % 2 === 0 ? '' : ms.task}</center></h4>
    	</div>
    	<div className="task-below">
				<h4><center>{index % 2 === 0 ? ms.task : ''}</center></h4>
    	</div>
		</li>
	);
	return (
		<ul className="timeline" id="timeline">
			{milestoneLis}
		</ul>
	)	
};

export default Timeline;
