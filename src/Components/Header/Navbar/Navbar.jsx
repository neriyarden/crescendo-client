import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import useClickOutside from '../../../hooks/useClickOutside'
import NavbarLinks from './NavbarLinks/NavbarLinks'
import Logo from './Logo/Logo'
import MenuToggleBtn from './MenuToggleBtn/MenuToggleBtn'

const Navbar = () => {
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
                <Logo />
            </NavLink>

            <MenuToggleBtn showToggleBtnMenu={showToggleBtnMenu}/>
            
            <div className={`navbar-links ${displayToggleBtnMenu}`}>
                <NavbarLinks />
            </div>
        </nav>
    )
}

export default Navbar


