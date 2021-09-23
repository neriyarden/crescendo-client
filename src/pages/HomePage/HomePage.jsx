import React, { useEffect, useState, useContext } from 'react'
import FeaturedEvent from './components/FeaturedEvent/FeaturedEvent'
import API from '../../DAL/api'
import Loader from '../../components/General/Loader'
import Carousel from './components/Carousel/Carousel'
import EventThumbnail from '../BrowseEvents/components/EventsPanel/Thumbnails/EventThumbnail'
import Hero from './components/Hero/Hero'
import ArtistThumbnail from '../BrowseArtists/components/ArtistThumbnail/ArtistThumbnail'
import HeroBtnMain from './components/Hero/HeroBtns/HeroBtnMain'
import HeroBtnLink from './components/Hero/HeroBtns/HeroBtnLink'
import { AuthApi } from '../../services/contexts/AuthApi'
import HomepageLogo from './components/Hero/HomepageLogo'

const HomePage = () => {
    const Auth = useContext(AuthApi)
    const [loading, setLoading] = useState(true)
    const [upcomingEventsData, setUpcomingEventsData] = useState([])
    const [artistsData, setArtistsData] = useState([])
    const [featuredEventData, setfeaturedEventData] = useState({})
    console.log('Auth.auth:', Auth.auth);
    const getUpcomingEventsData = async () => {
        const { featured, events } = await API.getFutureEventsData({ size: 9 })
        setUpcomingEventsData(events)
        setfeaturedEventData(featured)
    }
    const getArtists = async () => {
        const artists = await API.getArtistsData({ size: 9 })
        setArtistsData(artists)
    }


    useEffect(() => {
        (async () => {
            await getUpcomingEventsData()
            await getArtists()
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
                        {
                            Auth.auth ?
                                <Hero>
                                    <HomepageLogo/>
                                </Hero>
                                :
                                <Hero>
                                    <HeroBtnMain to='/SignUp' text='Join Us' pink />
                                    <HeroBtnMain
                                        to={{
                                            pathname: '/SignIn',
                                            state: { referrer: '/User/Welcome' }
                                        }}
                                        text='Sign In' />
                                </Hero>
                        }
                        <Carousel>
                            {
                                upcomingEventsData.map((data, i) => {
                                    return <EventThumbnail key={i} thumbData={data} />
                                })
                            }
                        </Carousel>
                        <Hero>
                            <HeroBtnLink to='/events' text='Events' />
                            <HeroBtnLink to='/artists' text='Artists' />
                            <HeroBtnLink to='/requests' text='Requests' />
                        </Hero>
                        <Carousel
                            dir="rtl"
                        >
                            {
                                artistsData.map((data, i) => {
                                    return <ArtistThumbnail key={i} thumbData={data} />
                                })
                            }
                        </Carousel>
                        <Hero></Hero>
                    </section>
            }
        </>
    )
}

export default HomePage
