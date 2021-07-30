import React from 'react'
import EventDetails from './EventDetails'
import { Link } from 'react-router-dom'

function EventThumbnail({ thumbData }) {
    return (
        <Link to={`../Events/${thumbData.id}`}>
            <li
                className='upcoming-event-thumb'
                style={{ backgroundImage: `url('${window.location.origin + (thumbData.img_url || '/img/tmplt_dark.svg')}')` }}
            >
                <EventDetails thumbData={thumbData} />
            </li>
        </Link>
    )
}

export default EventThumbnail
