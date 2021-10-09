import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faReact,
	faNodeJs,
	faSass,
	faGit,
} from '@fortawesome/free-brands-svg-icons'
const Footer = () => {
	return (
		<div className='main-footer'>
			Made with
			<FontAwesomeIcon icon={faNodeJs} />
			<FontAwesomeIcon icon={faReact} />
			<FontAwesomeIcon icon={faSass} />
			<FontAwesomeIcon icon={faGit} />
			{/* & some <span>❤</span>  */}
			by
			<a
				href='https://github.com/neriyarden'
				target='_blank'
				rel='noreferrer'
			>
				Neri Yarden
			</a>
		</div>
	)
}

export default Footer
