import React from 'react'
import WordsBg from '../WordBg/WordsBg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

function Hero() {
    return (
        <div className='homepage-hero'>
            <div className='homepage-hero-h1s'>
                <div className='homepage-hero-h1'>
                    <FontAwesomeIcon icon={faSearch} />
                    <h1>
                        Artists
                    </h1>
                </div>
                <div className='homepage-hero-h1'>
                    <FontAwesomeIcon icon={faSearch} />
                    <h1>
                        Events
                    </h1>
                </div>
                <div className='homepage-hero-h1'>
                    <FontAwesomeIcon icon={faSearch} />
                    <h1>
                        Requests
                    </h1>
                </div>

            </div>
            {/* <WordsBg height={2} /> */}
        </div>
    )
}

export default Hero
