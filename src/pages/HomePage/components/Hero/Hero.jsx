import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Hero() {
    return (
        <div className='homepage-hero'>
            <div className='homepage-hero-links'>
                <div className='homepage-hero-link'>
                    <FontAwesomeIcon icon={faSearch} />
                    <h1>
                        Artists
                    </h1>
                </div>
                <div className='homepage-hero-link'>
                    <FontAwesomeIcon icon={faSearch} />
                    <h1>
                        Events
                    </h1>
                </div>
                <div className='homepage-hero-link'>
                    <FontAwesomeIcon icon={faSearch} />
                    <h1>
                        Requests
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default Hero
