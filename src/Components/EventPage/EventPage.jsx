import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../DAL/api'
import ArtistAvatarImg from '../ArtistPage/ArtistHero/ArtistAvatarImg'



function EventPage() {
    const { id } = useParams()
    const [eventData, setEventData] = useState({})

    const getEventDataOnLoad = async (id) => {
        const data = await API.getEventData(id)
        setEventData(data)
    }

    useEffect(() => {
        getEventDataOnLoad(id)
    }, [])

    return (
        <section className='event-page'>
            <div
                className="event-page-bg"
                style={{ backgroundImage: `url(${eventData.img_url})` }}
            ></div>

            <div className="event-content">
                <h3 className='event-name'>{eventData.tour}</h3>
                <h6 className='event-description'>{eventData.description}</h6>
                <div className="event-info">
                    <div className='event-info-details'>
                        <h2 className='event-artist-name' >{eventData.artistName}</h2>
                        <h6 className='event-detail'>{eventData.date}</h6>
                        <h6 className='event-detail'>{eventData.time}</h6>
                        <h6 className='event-detail'>{eventData.duration} minutes</h6>
                        <h6 className='event-detail'>{eventData.venueName}</h6>
                    </div>
                    <a
                        href={eventData.ticketseller_url || 'https://www.eventim.co.il/'}
                        className="link-to-buy-tickets"
                        target='_blank'
                    >
                        Get Tickets
                    </a>
                </div>
            </div>
        </section>
    )
}

export default EventPage
