import React from 'react'
import { faSpotify, faFacebook, faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons'
import ArtistAvatarImg from './ArtistAvatarImg'
import SocialIcons from './SocialIcons'


function ArtistHero({ artistData }) {
    return (
        <section className='artist-page-hero'>

            <div
                className="artist-page-hero-bg"
                style={{ backgroundImage: `url(${artistData.img_url})` }}
            ></div>

            <div className="artist-hero-content">
                <ArtistAvatarImg imgPath={artistData.img_url} name={artistData.name} />

                <div className="artist-hero-info">
                    <h3 className='artist-hero-name'>{artistData.name}</h3>
                    <SocialIcons iconsData={[
                        {icon: faSpotify, link:artistData.link_to_spotify},
                        {icon: faYoutube, link:artistData.link_to_youtube},
                        {icon: faFacebook, link:artistData.link_to_facebook},
                        {icon: faInstagram, link:artistData.link_to_instagram},
                        ]}/>

                </div>
            </div>
        </section>
    )
}

export default ArtistHero
