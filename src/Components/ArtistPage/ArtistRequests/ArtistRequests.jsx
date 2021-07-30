import React, { useEffect, useContext, useState } from 'react'
import RequestsPanel from '../../RequestsPage/RequestsPanel/RequestsPanel'
import SectionHeading from '../../Headings/SectionHeading/SectionHeading'
import API from '../../../DAL/api'
import AuthApi from '../../../Contexts/AuthApi'
import { Link } from 'react-router-dom'

function ArtistRequests({ artistId }) {
    const isLoggedIn = useContext(AuthApi).auth
    const [loading, setLoading] = useState(true)
    const [requests, setRequests] = useState([])

    const getRequestsOfArtist = async (artistId) => {
        const results = await API.getArtistRequests(artistId)
        setRequests(results)
    }

    useEffect(() => {
        setLoading(true)
        getRequestsOfArtist(artistId)
    }, [])

    return (
        <section className='artist-page-section section'>
            <SectionHeading title='Requests' />
            {
                isLoggedIn ?
                    <>{
                        requests.length ?
                            <RequestsPanel
                                requestsData={requests}
                                loading={loading}
                                setLoading={setLoading}
                            />
                            : <p className='no-events'>No Requests for this Artist.</p>
                    }</>
                    : <p className='form-end-text'>
                        <Link to={{
                            pathname: '/SignIn',
                            state: { referrer: `/Artists/${artistId}` }
                        }}
                        >
                            Sign in</Link> to see the artist's requests</p>
            }
        </section>
    )
}

export default ArtistRequests
