import React, { useEffect, useState } from 'react'
import EventThumbnail from './Thumbnails/EventThumbnail'
import Loader from '../../../components/General/Loader'

const EventsPanel = ({ eventsData, loading, setLoading }) => {
    const [eventsThumbnails, setEventsThumbnails] = useState([])

    const renderThumbnails = () => {
        const thumbnails = eventsData.map((data, i) => {
            return <EventThumbnail key={i} thumbData={data} />
        })
        setEventsThumbnails(thumbnails)
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
            renderThumbnails()
        }, 700)
    }, [eventsData])

    return (
        <>
            <ul className='grid-panel upcoming-events-grid'>
                {eventsThumbnails}
            </ul>
            {(loading || eventsData.length === 0) ? <Loader /> : <></>}
        </>
    )
}

export default EventsPanel