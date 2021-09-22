import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function SubHero() {
    return (
        <div className='homepage-hero'>
            <div className='homepage-hero-links'>
                <div className='homepage-hero-link pink-link'>
                    <img
                        src={`${window.location.origin + '/img/logo/do_white.svg'}`}
                        alt='logo'
                    />
                    <h1>
                        Join Now
                    </h1>
                </div>
                <div className='homepage-hero-link'>
                    <img
                        src={`${window.location.origin + '/img/logo/do.svg'}`}
                        alt='logo'
                    />
                    <h1>
                        Sign In
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default SubHero
