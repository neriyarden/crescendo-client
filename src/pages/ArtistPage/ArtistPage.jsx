import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../DAL/api'
import ArtistHero from './components/ArtistHero/ArtistHero'
import ArtistBio from './components/ArtistBio/ArtistBio'
import ArtistShows from './components/ArtistShows/ArtistShows'
import ArtistRequests from './components/ArtistRequests/ArtistRequests'


const ArtistPage = () => {
    const { id } = useParams()
    const [artistData, setArtistData] = useState({})
console.log('id:', id);
console.log('artistData:', artistData);
    
    useEffect(() => {
        const getArtistDataOnLoad = async () => {
            const data = await API.getArtistData(id)
            if (data.error) return setArtistData(data.error)
    
            setArtistData(data)
        }

        getArtistDataOnLoad()
    }, [id])

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
