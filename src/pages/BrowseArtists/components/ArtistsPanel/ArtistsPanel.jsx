import React, { useEffect, useState } from 'react'
import ArtistThumbnail from '../ArtistThumbnail/ArtistThumbnail'
import Loader from '../../../../components/General/Loader'

const ArtistsPanel = ({ artistsData, loading, setLoading }) => {
    const [artistsThumbnails, setArtistsThumbnails] = useState([])

    
    useEffect(() => {
        const renderThumbnails = () => {
            const thumbnails = artistsData.map((data, i) =>
                <ArtistThumbnail key={`${i}${data.user_id}`} thumbData={data} />
            )
            setArtistsThumbnails(thumbnails)
            setLoading(false)
        }
            renderThumbnails()
    }, [artistsData, setLoading])

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