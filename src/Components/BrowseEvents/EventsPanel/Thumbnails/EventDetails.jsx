import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faCalendarDay, faClock } from '@fortawesome/free-solid-svg-icons'


function EventDetails({ thumbData }) {
    return (
        <>
        <h4 className='upcoming-event-artist-tour'>{thumbData.tour}</h4>
        <div className="upcoming-event-details">
        <h4 className='upcoming-event-artist-name'>{thumbData.artist}</h4>
        <div className="upcoming-event-details-sub">
            <span className='upcoming-event-location'>
            <FontAwesomeIcon icon={faMapMarkerAlt}/>
                {thumbData.city}
                </span>
            <span className='upcoming-event-time'>
            <FontAwesomeIcon icon={faCalendarDay}/>
                {thumbData.time.slice(0, 5)}
            </span>
            <span className='upcoming-event-date'>
            <FontAwesomeIcon icon={faClock}/>
                {thumbData.date}
            </span>
        </div>
    </div>
    </>
    )
}

export default EventDetails
