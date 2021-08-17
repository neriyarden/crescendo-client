import React, { useState, useContext, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import AuthApi from '../../../Contexts/AuthApi'
import Cookies from 'js-cookie'
import useClickOutside from '../../../CustomHooks/useClickOutside'
import { currentServer } from '../../../DAL/axios'

// TODO break into small components
function Navbar() {
    const ref = useRef()
    useClickOutside(ref, () => setDisplayToggleBtnMenu(''))
    const Auth = useContext(AuthApi)
    const [displayToggleBtnMenu, setDisplayToggleBtnMenu] = useState('')

    const showToggleBtnMenu = () => {
        const active = displayToggleBtnMenu ? '' : 'display-menu'
        setDisplayToggleBtnMenu(active)
    }

    const signOut = () => {
        Cookies.remove('session_id')
        sessionStorage.removeItem('user_voted_requests')
        sessionStorage.removeItem('myEvents')
        sessionStorage.removeItem('myRequests')
        Auth.setAuth(null)
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
                <ul>
                    <li className='navbar-link'>
                        <NavLink activeClassName='active-link' to='/Upcoming'>
                            Upcoming Events
                        </NavLink>
                    </li>
                    <li className='navbar-link'>
                        <NavLink activeClassName='active-link' to='/Events'>
                            Browse Events
                        </NavLink>
                    </li>
                    <li className='navbar-link'>
                        <NavLink activeClassName='active-link' to='/Artists'>
                            Browse Artists
                        </NavLink>
                    </li>
                    <li className='navbar-link'>
                        <NavLink activeClassName='active-link' to='/Requests'>
                            Requests
                        </NavLink>
                    </li>
                    {
                        Auth.auth ? <></> :
                            <>
                                <li className='navbar-link'>
                                    <NavLink to={{
                                        pathname: '/SignIn',
                                        state: { referrer: '/User/Welcome' }
                                    }}
                                    >
                                        <FontAwesomeIcon icon={faUser} size='lg' />
                                    </NavLink>
                                </li>
                            </>
                    }
                </ul>
            </div>
                    {
                        Auth.auth ?
                            <>
                                <div className='navbar-link navbar-user-img'>
                                    <NavLink to='/User/Welcome'>
                                        <img
                                            src={currentServer + (Auth.auth.img_url ?? '/img/user.png')}
                                            alt=""
                                        />
                                    </NavLink>
                                    <NavLink to='/' >
                                        <span
                                            className='navbar-link sign-out-link'
                                            onClick={signOut}
                                        >
                                            Sign Out
                                        </span>
                                    </NavLink>
                                </div>
                            </> : <></>
                    }

        </nav>
    )
}

export default Navbar


