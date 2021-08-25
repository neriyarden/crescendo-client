import React, { useState, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'

import useClickOutside from '../../../hooks/useClickOutside'
import { currentServer } from '../../../DAL/axios'
import NavbarLinks from './NavbarLinks'

function Navbar() {
    const ref = useRef()
    useClickOutside(ref, () => setDisplayToggleBtnMenu(''))
    const [displayToggleBtnMenu, setDisplayToggleBtnMenu] = useState('')

    const showToggleBtnMenu = () => {
        const active = displayToggleBtnMenu ? '' : 'display-menu'
        setDisplayToggleBtnMenu(active)
    }

    return (
        <nav className='navbar' onClick={showToggleBtnMenu} ref={ref}>
            <NavLink to='/Upcoming'>
                <img
                    src={currentServer + `/img/logo/logo1_b_bold.svg`}
                    className="navbar-logo"
                    alt='logo'
                />
            </NavLink>
            <div href="" className='navbar-toggle-button' onClick={showToggleBtnMenu}>
                <span className="navbar-toggle-button-bar"></span>
                <span className="navbar-toggle-button-bar"></span>
                <span className="navbar-toggle-button-bar"></span>
            </div>
            <div className={`navbar-links ${displayToggleBtnMenu}`}>
                <NavbarLinks />
            </div>
        </nav>
    )
}

export default Navbar


