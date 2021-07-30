import React, { useEffect, useState } from 'react'
import ArtistThumbnail from '../ArtistThumbnail/ArtistThumbnail'
import Loader from '../../General/Loader'

function ArtistsPanel({ artistsData, loading, setLoading }) {
    const [artistsThumbnails, setArtistsThumbnails] = useState([])

    const renderThumbnails = () => {
        const thumbnails = artistsData.map((data, i) =>
            <ArtistThumbnail key={i, data.user_id} thumbData={data} />
        )
        setArtistsThumbnails(thumbnails)
        setLoading(false)
    }

    useEffect(() => {
            renderThumbnails()
    }, [artistsData])

    return (
        <>
            <ul className='artists-grid'>
                {artistsThumbnails}
            </ul>
            {(loading || artistsData.length === 0) ? <Loader /> : <></>}
        </>
    )
}

export default ArtistsPanel
