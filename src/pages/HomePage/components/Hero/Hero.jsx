import React from 'react'



function Hero(props) {
    return (
        <div className='homepage-hero'>
            <div className='homepage-hero-links'>
                {props.children}
                {/* <div className='homepage-hero-link'>
                    <FontAwesomeIcon icon={faSearch} />
                    <span>
                        Artists
                    </span>
                </div>
                <div className='homepage-hero-link'>
                    <FontAwesomeIcon icon={faSearch} />
                    <span>
                        Events
                    </span>
                </div>
                <div className='homepage-hero-link'>
                    <FontAwesomeIcon icon={faSearch} />
                    <span>
                        Requests
                    </span>
                </div> */}
            </div>
        </div>
    )
}

export default Hero
