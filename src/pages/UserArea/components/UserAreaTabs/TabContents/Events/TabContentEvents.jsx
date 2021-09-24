import React, { useEffect, useState, useContext, useCallback } from 'react'
import API from '../../../../../../DAL/api'
import EventLine from './EventLine'
import NewEvent from './NewEvent'
import Loader from '../../../../../../components/General/Loader'
import { AuthApi } from '../../../../../../services/contexts/AuthApi'


const TabContentEvents = () => {
    const Auth = useContext(AuthApi)
    const [loading, setLoading] = useState(true)
    const [showForm, setShowForm] = useState(false)
    const [events, setEvents] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    const getEventsOfArtist = useCallback(async () => {
        setErrorMsg('')
        const localData = JSON.parse(sessionStorage.getItem('myEvents'))
        if (localData?.error) sessionStorage.removeItem('myEvents')
        if (localData) return setEvents(localData)
        const results = await API.getArtistEvents(Auth.auth.user_id)
        if (results.error) {
            setEvents([])
            return setErrorMsg((results.error))
        }
        sessionStorage.setItem('myEvents', JSON.stringify(results))
        setEvents(results)
    }, [Auth])


    const eventsItems = events.map((event, i) => (
        <EventLine key={i} event={event} i={i} reloadEvents={getEventsOfArtist} />
    ))

    useEffect(() => {
        getEventsOfArtist()
        setLoading(false)
    }, [getEventsOfArtist])

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
                            setShowForm={setShowForm} />
                    }
                </ul>
            }
        </div>
    )
}

export default TabContentEvents
