import React from 'react'
import EventDetails from './EventDetails'
import { Link } from 'react-router-dom'
import { currentServer } from '../../../../../DAL/axios'

const EventThumbnail = ({ thumbData }) => {
	return (
		<Link to={`../Events/${thumbData.id}`}>
			<li
				className='upcoming-event-thumb'
				style={{
					backgroundImage: `url('${
						currentServer +
						(thumbData.img_url || '/img/tmplt_dark.svg')
					}')`,
				}}
			>
				<EventDetails thumbData={thumbData} />
			</li>
		</Link>
	)
}

export default EventThumbnail
