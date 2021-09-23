import React from 'react'

function SubHero() {
    return (
        <div className='homepage-hero'>
            <div className='homepage-hero-links'>

                <div className='homepage-hero-link'>
                    <img
                        src={`${window.location.origin + '/img/logo/do.svg'}`}
                        alt='logo'
                    />
                    <span>
                        Sign In
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SubHero
