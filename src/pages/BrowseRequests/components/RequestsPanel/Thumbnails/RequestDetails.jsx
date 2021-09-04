import React, { useState } from 'react'
import TextBtn from '../../../../../components/General/Inputs/TextBtn/TextBtn'

const RequestDetails = ({ thumbData, voteBtnHandler, votesCount, voted, capReached }) => {

    return (
        <div className={`request-top-layer ${capReached || 'clickable'}`}>
            <h4 className='request-artist'>{thumbData.artist}</h4>
            <div className="request-details">
                <div className="request-details-sub">
                    <h6 className='request-location'>{thumbData.city}</h6>
                    <span className='request-votes'>
                        <span className='request-votes-count'>
                            {votesCount}
                            <span className='pink-slash'>/</span>
                            {thumbData.cap}
                        </span>
                        <span className='request-votes-sub'>
                        {
                            capReached ? 'Completed!' : 'Votes'
                        }
                        </span>
                    </span>
                </div>
                    <>{
                        voted ?
                        <TextBtn 
                            text="Not Interested" 
                            clickHandler={() => voteBtnHandler(voted)}
                        />
                        :
                        <TextBtn 
                            text="Interested" 
                            clickHandler={() => voteBtnHandler(voted)}
                        />
                    }</>
            </div>
        </div>
    )
}

export default RequestDetails
