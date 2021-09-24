import React from 'react'

function Hero(props) {
	return (
		<div className='homepage-hero'>
			<div className='homepage-hero-links'>{props.children}</div>
		</div>
	)
}

export default Hero
