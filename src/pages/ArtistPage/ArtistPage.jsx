import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../DAL/api'
import ArtistHero from './components/ArtistHero/ArtistHero'
import ArtistBio from './components/ArtistBio/ArtistBio'
import ArtistShows from './components/ArtistShows/ArtistShows'
import ArtistRequests from './components/ArtistRequests/ArtistRequests'


const ArtistPage = () => {
    const { id } = useParams()
    const [artistData, setArtistData] = useState({})


    const getArtistDataOnLoad = async (artistId) => {
        const data = await API.getArtistData(artistId)
        if (data.error) return setArtistData(data.error)

        setArtistData(data)
    }

    useEffect(() => {
        getArtistDataOnLoad(id)
    }, [])

    return (
        <section className='artist-page'>
            <ArtistHero artistData={artistData} />
            <ArtistBio artistData={artistData} />
            <ArtistShows artistId={id} />
            <ArtistRequests artistId={id} />
        </section>
    )
}

export default ArtistPage
