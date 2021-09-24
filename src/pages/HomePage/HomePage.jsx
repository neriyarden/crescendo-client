import React, { useEffect, useState, useContext } from 'react'
import FeaturedEvent from './components/FeaturedEvent/FeaturedEvent'
import api from '../../DAL/api'
import Loader from '../../components/General/Loader'
import Carousel from './components/Carousel/Carousel'
import EventThumbnail from '../BrowseEvents/components/EventsPanel/Thumbnails/EventThumbnail'
import Hero from './components/Hero/Hero'
import ArtistThumbnail from '../BrowseArtists/components/ArtistThumbnail/ArtistThumbnail'
import HeroBtnMain from './components/Hero/HeroBtns/HeroBtnMain'
import HeroBtnLink from './components/Hero/HeroBtns/HeroBtnLink'
import { AuthApi } from '../../services/contexts/AuthApi'
import HomepageLogo from './components/Hero/HomepageLogo'
import { useHttp } from '../../hooks/useHttp'

const HomePage = () => {
    const Auth = useContext(AuthApi)
    const { isLoading, error, sendRequest } = useHttp()
    const [featuredEventData, setfeaturedEventData] = useState(null)
    const [upcomingEventsData, setUpcomingEventsData] = useState(null)
    const [artistsData, setArtistsData] = useState(null)



    useEffect(() => {
        const getUpcomingEventsData = async () => {
            const { featured, events } = await sendRequest(
                api.getFutureEventsData, { size: 9 }
            )
            setUpcomingEventsData(events)
            setfeaturedEventData(featured)
        }
        const getArtists = async () => {
            const artists = await sendRequest(api.getArtistsData, { size: 9 })
            setArtistsData(artists)
        }
        getUpcomingEventsData()
        getArtists()
    }, [sendRequest])

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <section
                        style={{ backgroundImage: `url(${window.location.origin + '/img/bghome30.png'})` }}
                        className='homepage'
                    >
                        <FeaturedEvent featuredEvent={featuredEventData} />
                        {
                            error ?
                                <p className='results-msg'>{error}</p>
                                : <></>
                        }
                        {
                            Auth.auth ?
                                <Hero>
                                    <HomepageLogo />
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
                        {
                            upcomingEventsData ?
                                <Carousel>
                                    {
                                        upcomingEventsData.map((data, i) => {
                                            return <EventThumbnail key={i} thumbData={data} />
                                        })
                                    }
                                </Carousel>
                                : <></>
                        }
                        <Hero>
                            <HeroBtnLink to='/events' text='Events' />
                            <HeroBtnLink to='/artists' text='Artists' />
                            <HeroBtnLink to='/requests' text='Requests' />
                        </Hero>
                        {
                            artistsData ?
                                <Carousel
                                    dir="rtl"
                                >
                                    {
                                        artistsData.map((data, i) => {
                                            return <ArtistThumbnail key={i} thumbData={data} />
                                        })
                                    }
                                </Carousel>
                                : <></>
                        }
                        <Hero></Hero>
                    </section>
            }
        </>
    )
}

export default HomePage
