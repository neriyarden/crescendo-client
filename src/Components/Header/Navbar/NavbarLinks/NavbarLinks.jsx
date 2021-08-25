import React, { useContext } from 'react'
import Cookies from 'js-cookie'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import AuthApi from '../../../../services/contexts/AuthApi'
import { currentServer } from '../../../../DAL/axios'


const NavbarLinks = () => {
    const Auth = useContext(AuthApi)
    
    const signOut = () => {
        Cookies.remove('session_id')
        sessionStorage.removeItem('user_voted_requests')
        sessionStorage.removeItem('myEvents')
        sessionStorage.removeItem('myRequests')
        Auth.setAuth(null)
    }

    return (
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
            Auth.auth ?
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
                :
                <li className='navbar-link'>
                    <NavLink to={{
                        pathname: '/SignIn',
                        state: { referrer: '/User/Welcome' }
                    }}
                    >
                        <FontAwesomeIcon icon={faUser} size='lg' />
                    </NavLink>
                </li>
        }
    </ul>
    )
}

export default NavbarLinks
