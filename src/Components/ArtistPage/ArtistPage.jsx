import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../DAL/api'
import ArtistHero from './ArtistHero/ArtistHero'
import ArtistBio from './ArtistBio/ArtistBio'
import ArtistShows from './ArtistShows/ArtistShows'
import ArtistRequests from './ArtistRequests/ArtistRequests'


function ArtistPage() {
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
