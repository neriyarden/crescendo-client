import React, { useEffect, useState } from 'react'
import EventThumbnail from './Thumbnails/EventThumbnail'

const EventsPanel = ({ eventsData }) => {
    const [eventsThumbnails, setEventsThumbnails] = useState([])


    useEffect(() => {
        const renderThumbnails = () => {
            const thumbnails = eventsData.map((data, i) => {
                return <EventThumbnail key={i} thumbData={data} />
            })
            setEventsThumbnails(thumbnails)
        }
        renderThumbnails()
    }, [eventsData])

    return (
        <ul className='grid-panel upcoming-events-grid'>
            {eventsThumbnails}
        </ul>
    )
}

export default EventsPanel