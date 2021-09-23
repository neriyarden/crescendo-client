import React from 'react'
import { Link } from 'react-router-dom'

function HeroBtnMain(props) {
    return (
        <Link to={props.to} className={`homepage-hero-link ${props.pink ? 'pink-link' : ''}`}>
            <img
                src={`${window.location.origin}/img/logo/${props.pink ? 'do_white.svg' : 'do.svg'}`
                }
                alt='logo'
            />
            <span>
                {props.text}
            </span>
        </Link>
    )
}

export default HeroBtnMain
