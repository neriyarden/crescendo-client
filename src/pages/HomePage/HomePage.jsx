import React, { useEffect, useState } from 'react'
import SectionHeading from '../../components/General/Headings/SectionHeading/SectionHeading'
import FeaturedEvent from './components/FeaturedEvent/FeaturedEvent'
import EventsPanel from '../BrowseEvents/components/EventsPanel/EventsPanel'
import API from '../../DAL/api'
import Loader from '../../components/General/Loader'

const UpcomingEvent = () => {
    const [loading, setLoading] = useState(true)
    const [upcomingEventsData, setUpcomingEventsData] = useState([])
    const [featuredEventData, setfeaturedEventData] = useState({})
    const [pastEventsData, setPastEventsData] = useState([])

    const getUpcomingEventsData = async () => {
        const { featured, events } = await API.getUpcomingEventsData()
        setUpcomingEventsData(events)
        setfeaturedEventData(featured)
    }

    const getPastEvents = async () => {
        const results = await API.getPastEventsData()
        setPastEventsData(results.events)
    }

    useEffect(() => {
        getUpcomingEventsData()
        getPastEvents()
        setLoading(false)
    }, [])

    return (
        <>
        {
            loading ? <Loader/> :
            <>
            <FeaturedEvent featuredEvent={featuredEventData} />
            <section className='section'>
            <SectionHeading title='Upcoming Events' />
            <EventsPanel
                    eventsData={upcomingEventsData}
                    setLoading={setLoading}
                    loading={loading}
                    />
            </section>
            <section className='section'>
                <SectionHeading title='Past Events' />
                <EventsPanel
                eventsData={pastEventsData}
                    setLoading={setLoading}
                    loading={loading}
                    />
            </section>
            </>
        }
            </>
    )
}

export default UpcomingEvent
