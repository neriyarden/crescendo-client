import React, { useEffect, useState } from 'react'
import EventsPanel from '../../../BrowseEvents/components/EventsPanel/EventsPanel'
import SectionHeading from '../../../../components/General/Headings/SectionHeading/SectionHeading'
import API from '../../../../DAL/api'

const ArtistShows = ({ artistId }) => {
    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])

    
    useEffect(() => {
        const getEventsOfArtist = async () => {
            const results = await API.getArtistEvents(artistId)
            if(results.error) return
            setEvents(results)
        }

        setLoading(true)
        getEventsOfArtist()
    }, [artistId])

    return (
        <section className='artist-page-section section'>
            <SectionHeading title='Upcoming Shows'/>
            {
            events.length > 0 ? 
            <EventsPanel 
                eventsData={events}
                loading={loading}
                setLoading={setLoading}
            />
                : <p className='no-events'>No Upcoming Shows.</p>}
        </section>
    )
}

export default ArtistShows
