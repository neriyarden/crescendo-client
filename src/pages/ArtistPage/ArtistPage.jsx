import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../DAL/api'
import ArtistHero from './components/ArtistHero/ArtistHero'
import ArtistBio from './components/ArtistBio/ArtistBio'
import ArtistShows from './components/ArtistShows/ArtistShows'
import ArtistRequests from './components/ArtistRequests/ArtistRequests'
import Loader from '../../components/General/Loader'
import { useHttp } from '../../hooks/useHttp'

const ArtistPage = () => {
    const { id } = useParams()
    const { isLoading, error, sendRequest } = useHttp()
    const [artistData, setArtistData] = useState({})

    useEffect(() => {
        const getArtistDataOnLoad = async () => {
            const data = await sendRequest(api.getArtistData, id)
            if (error) return
            setArtistData(data)
        }
        getArtistDataOnLoad()
    }, [sendRequest, id, error])

    return (
        <section className='artist-page'>
            {
                isLoading ? <Loader /> : <></>
            } {
                error ? <p className="center-text">{error}</p>
                    :
                    <>
                        <ArtistHero artistData={artistData} />
                        <ArtistBio artistData={artistData} />
                        <ArtistShows artistId={id} />
                        <ArtistRequests artistId={id} />
                    </>
            }
        </section>
    )
}

export default ArtistPage
