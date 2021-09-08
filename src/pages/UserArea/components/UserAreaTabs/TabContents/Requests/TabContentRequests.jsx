import React, { useEffect, useState, useContext, useCallback } from 'react'
import API from '../../../../../../DAL/api'
import RequestLine from './RequestLine'
import NewRequest from './NewRequest'
import Loader from '../../../../../../components/General/Loader'
import { AuthApi } from '../../../../../../services/contexts/AuthApi'


const TabContentRequests = () => {
    const Auth = useContext(AuthApi)
    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    const getRequestsOfArtist = useCallback(async () => {
        // for arriving from the direct url
        setErrorMsg('')
        const localData = JSON.parse(sessionStorage.getItem('myRequests'))
        if (localData?.error) sessionStorage.removeItem('myRequests')
        if (localData) return setRequests(localData)
        const results = await API.getArtistRequests(Auth.auth.user_id)
        if (results?.error) {
            setRequests([])
            return setErrorMsg((results?.error))
        }
        sessionStorage.setItem('myRequests', JSON.stringify(results))
        setRequests(results)
    }, [Auth])


    const requestsItems = requests.map((request, i) => (
        <RequestLine key={i} request={request} i={i} reloadRequests={getRequestsOfArtist} />
    ))

    useEffect(() => {
        getRequestsOfArtist()
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [getRequestsOfArtist])

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
