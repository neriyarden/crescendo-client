import React from 'react'
import { currentServer } from '../../../DAL/axios'

const ArtistAvatarImg = ({ imgPath, styleClass }) => {
    return (
        <div className={styleClass || 'artist-avatar-image'}>
        <img src={currentServer + imgPath} alt={`artist avatar`}/>
    </div>
    )
}

export default ArtistAvatarImg

