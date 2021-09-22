import React, { useEffect, useState } from 'react'
import SectionHeading from '../../components/General/Headings/SectionHeading/SectionHeading'
import FeaturedEvent from './components/FeaturedEvent/FeaturedEvent'
import EventsPanel from '../BrowseEvents/components/EventsPanel/EventsPanel'
import API from '../../DAL/api'
import Loader from '../../components/General/Loader'
import Carousel from './components/Carousel/Carousel'
import EventThumbnail from '../BrowseEvents/components/EventsPanel/Thumbnails/EventThumbnail'
import WordsBg from './components/WordBg/WordsBg'
import Hero from './components/Hero/Hero'
import SubHero from './components/SubHero/SubHero'


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
        (async () => {
            await getUpcomingEventsData()
            await getPastEvents()
            setLoading(false)
        })()
    }, [])

    return (
        <>
            {
                loading ? <Loader /> :
                    <section
                        style={{ backgroundImage: `url(${window.location.origin + '/img/bghome30.png'})` }}
                        className='homepage'
                    >
                        <FeaturedEvent featuredEvent={featuredEventData} />
                        <Hero />
                        <Carousel>
                            {
                                upcomingEventsData.map((data, i) => {
                                    return <EventThumbnail key={i} thumbData={data} />
                                })
                            }
                        </Carousel>
                        <SubHero/>
                        {/* <section className='section'>
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
                        </section> */}
                    </section>
            }
        </>
    )
}

export default UpcomingEvent
