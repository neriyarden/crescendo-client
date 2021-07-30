import React, { useEffect, useState } from 'react'
import API from '../../../../../DAL/api'
import RequestLine from './RequestLine'
import NewRequest from './NewRequest'
import Loader from '../../../../General/Loader'
import Cookies from 'js-cookie'

function TabContentRequests({ userData }) {
    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    const getRequestsOfArtist = async () => {
        // for arriving from the  direct url
        const artistId = Cookies.getJSON('session_id')
        setErrorMsg('')
        const localData = sessionStorage.getItem('myRequests')
        if (localData) return setRequests(JSON.parse(localData))
        const results = await API.getArtistRequests(artistId)
        if (results.data?.error) {
            setRequests([])
            return setErrorMsg((results?.data.error))
        }
        sessionStorage.setItem('myRequests', JSON.stringify(results))
        setRequests(results)
    }


    const requestsItems = requests.map((request, i) => (
        <RequestLine key={i} request={request} i={i} reloadRequests={getRequestsOfArtist} />
    ))

    useEffect(() => {
        getRequestsOfArtist()
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    return (
        <div className='user-area-requests'>
            <h2 className="my-requests">My Requests</h2>
            {
                loading ? <Loader /> :
                    <ul>
                        {requestsItems}
                        <p className='error'>{errorMsg}</p>
                        <NewRequest reloadRequests={getRequestsOfArtist} />
                    </ul>
            }
        </div>
    )
}

export default TabContentRequests
