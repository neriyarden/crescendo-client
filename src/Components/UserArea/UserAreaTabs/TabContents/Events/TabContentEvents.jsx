import React, { useEffect, useState } from 'react'
import API from '../../../../../DAL/api'
import EventLine from './EventLine'
import NewEvent from './NewEvent'
import Loader from '../../../../General/Loader'

function TabContentEvents({ userData }) {
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [events, setEvents] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    const getEventsOfArtist = async (artistId) => {
        setErrorMsg('')
        const localData = sessionStorage.getItem('myEvents')
        if (localData) return setEvents(JSON.parse(localData))
        const results = await API.getArtistEvents(artistId)
        if (results.data?.error) {
            setEvents([])
            return setErrorMsg((results.data?.error))
        }
        sessionStorage.setItem('myEvents', JSON.stringify(results))
        setEvents(results)
    }


    const eventsItems = events.map((event, i) => (
        <EventLine key={i} event={event} i={i} reloadEvents={getEventsOfArtist} />
    ))

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
        getEventsOfArtist(userData.id)
    }, [])

    return (
        <div className='user-area-events'>
            <h2 className="my-events">My Events</h2>
            {loading ? <Loader /> :
                <ul>
                    {eventsItems}
                    <p className='error'>{errorMsg}</p>
                    {showForm ||
                        <span
                            className='add-new-event'
                            onClick={() => setShowForm(true)}
                        >
                            + Add New Event
                        </span>
                    }
                    {showForm &&
                        <NewEvent 
                            reloadEvents={getEventsOfArtist}
                            setShowForm={setShowForm}/>
                    }
                </ul>
            }
        </div>
    )
}

export default TabContentEvents