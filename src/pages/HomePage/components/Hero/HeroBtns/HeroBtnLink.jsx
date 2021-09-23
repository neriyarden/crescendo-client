import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

function HeroBtnLink(props) {
    return (
        <Link to={props.to} className='homepage-hero-link'>
            <FontAwesomeIcon icon={faSearch} />
            <span>
                {props.text}
            </span>
        </Link>
    )
}

export default HeroBtnLink
