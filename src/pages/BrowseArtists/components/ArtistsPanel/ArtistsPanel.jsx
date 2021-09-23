import React, { useEffect, useState } from 'react'
import ArtistThumbnail from '../ArtistThumbnail/ArtistThumbnail'

const ArtistsPanel = ({ artistsData }) => {
    const [artistsThumbnails, setArtistsThumbnails] = useState([])


    useEffect(() => {
        const renderThumbnails = () => {
            const thumbnails = artistsData.map((data, i) =>
                <ArtistThumbnail key={`${i}${data.user_id}`} thumbData={data} />
            )
            setArtistsThumbnails(thumbnails)
        }
        renderThumbnails()
    }, [artistsData,])

    return (
        <>
            <ul className='artists-grid'>
                {artistsThumbnails}
            </ul>
        </>
    )
}

export default ArtistsPanel
