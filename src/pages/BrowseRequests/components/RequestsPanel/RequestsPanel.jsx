import React, { useEffect, useState } from 'react'
import RequestThumbnail from './Thumbnails/RequestsThumbnail'

const RequestsPanel = ({ requestsData }) => {
    const [requestsThumbnails, setRequestsThumbnails] = useState([])

    useEffect(() => {
        const renderThumbnails = () => {
            const thumbnails = requestsData.map((data, i) => {
                return <RequestThumbnail key={i} thumbData={data} />
            })
            setRequestsThumbnails(thumbnails)
        }
        renderThumbnails()
    }, [requestsData])

    return (
        <div className='grid-panel requests-panel'>
            <h5 className='requests-top-msg'>
                want your favourite artist to perform in your area?
                let them know that you're interested!
            </h5>
            <ul className='requests-grid'>
                {requestsThumbnails}
            </ul>
        </div>
    )
}

export default RequestsPanel