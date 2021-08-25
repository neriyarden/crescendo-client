import React from 'react'
import SectionHeading from '../../../components/General/Headings/SectionHeading/SectionHeading'

function ArtistBio({ artistData }) {
    return (
        <section className='artist-page-section section'>
        <div className='artist-page-bio-header'>
            <SectionHeading title='Bio' />
            <p>Joined at: {artistData.joined_at}</p>
        </div>
        <p className='artist-page-bio-text'>{artistData.bio}</p>
    </section>
    )
}

export default ArtistBio
