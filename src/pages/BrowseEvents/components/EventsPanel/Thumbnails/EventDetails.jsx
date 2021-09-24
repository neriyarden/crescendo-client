import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faMapMarkerAlt,
	faCalendarDay,
	faClock,
} from '@fortawesome/free-solid-svg-icons'

const EventDetails = ({ thumbData }) => {
	return (
		<>
			<h4 className='upcoming-event-artist-tour'>{thumbData.tour}</h4>
			<div className='upcoming-event-details'>
				<h4 className='upcoming-event-artist-name'>
					{thumbData.artist}
				</h4>
				<div className='upcoming-event-details-sub'>
					<span className='upcoming-event-location'>
						{thumbData.city}
						<FontAwesomeIcon icon={faMapMarkerAlt} />
					</span>
					<span className='upcoming-event-time'>
						{thumbData.time.slice(0, 5)}
						<FontAwesomeIcon icon={faCalendarDay} />
					</span>
					<span className='upcoming-event-date'>
						{thumbData.date}
						<FontAwesomeIcon icon={faClock} />
					</span>
				</div>
			</div>
		</>
	)
}

export default EventDetails
