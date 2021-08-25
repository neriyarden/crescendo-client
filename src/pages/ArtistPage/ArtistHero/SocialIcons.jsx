import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SocialIcons({ iconsData }) {
    const icons = iconsData.map((iconData, i) => (
        <a key={i} href={iconData.link} target='_blank' rel='noreferrer'>
            <FontAwesomeIcon
                icon={iconData.icon}
                size='lg'
            />
        </a>
    ))

    return (
        <div className="artist-hero-icons">
            {icons}
        </div>
    )
}

export default SocialIcons
