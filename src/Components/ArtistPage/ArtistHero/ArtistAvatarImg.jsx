import React from 'react'

function ArtistAvatarImg({ imgPath, styleClass }) {
    return (
        <div className={styleClass || 'artist-avatar-image'}>
        <img src={imgPath} alt={`artist avatar`}/>
    </div>
    )
}

export default ArtistAvatarImg

