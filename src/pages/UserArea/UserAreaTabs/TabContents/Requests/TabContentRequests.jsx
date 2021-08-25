import React, { useEffect, useState, useContext } from 'react'
import API from '../../../../../DAL/api'
import RequestLine from './RequestLine'
import NewRequest from './NewRequest'
import Loader from '../../../../../components/General/Loader'
import AuthApi from '../../../../../services/contexts/AuthApi'


const TabContentRequests = () => {
    const Auth = useContext(AuthApi)
    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    const getRequestsOfArtist = async () => {
        // for arriving from the direct url
        setErrorMsg('')
        const localData = sessionStorage.getItem('myRequests')
        if (localData) return setRequests(JSON.parse(localData))
        const results = await API.getArtistRequests(Auth.auth.id)
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
