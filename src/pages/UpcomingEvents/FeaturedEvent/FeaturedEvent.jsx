import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { currentServer } from '../../../DAL/axios'


function FeaturedEvent({ featuredEvent }) {

    return (
        <section className="featured-events">
            <div
                className="featured-events-bg"
                style={{ backgroundImage: `url(${currentServer + featuredEvent.img_url})` }}
            >
            </div>
            <Link 
                to={`/Events/${featuredEvent.id}`}
                className="featured-event"
                style={{ backgroundImage: `url(${currentServer + featuredEvent.img_url})` }}
            >
                <div className='featured-event-details'>
                    <h3>{featuredEvent.tour}</h3>
                    <div className="triangle l-triangle"></div>
                    <div className="triangle r-triangle"></div>
                    <div className='dets'>
                        <h5 className='date'>{featuredEvent.date}</h5>
                        <h4 className='venue'>{featuredEvent.venue}</h4>
                    </div>
                </div>
            </Link>
            <div className="featured-event-extra-details">
                <h6 className='featured'>FEATURED</h6>
                <h4 className='description'>”{featuredEvent.description}„</h4>
                <h5 className='time'>{featuredEvent.time}</h5>
                <h5 className='duration'>{featuredEvent.duration}m</h5>
                <h5 className='city'>{featuredEvent.city}</h5>

            </div>

        </section>
    )
}

export default FeaturedEvent

// "artist": "Allóu Neder",
// "id": 4,
// "tour": "Allóu Neder Israel Tour",
// "date": "16/9/2021",
// "time": "22:00:00",
// "duration": 120,
// "venue_id": 1,
// "description": "lorem ipsum bla bla",
// "img_url": "/img/events/live2.jpg",
// "artist_id": 3,
// "came_from_request_id": null,
// "ticketseller_url": "",
// "sold_out": 0,
// "featured": 1,
// "venue": "Zappa Haifa",
// "city": "Haifa"
