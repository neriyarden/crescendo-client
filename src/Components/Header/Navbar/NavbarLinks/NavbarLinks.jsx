import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthApi } from '../../../../services/contexts/AuthApi'
import { currentServer } from '../../../../DAL/axios'


const NavbarLinks = () => {
    const Auth = useContext(AuthApi)

    return (
        <ul>
            <li className='navbar-link'>
                <NavLink activeClassName='active-link' to='/Home'>
                    Home
                </NavLink>
            </li>
            <li className='navbar-link'>
                <NavLink activeClassName='active-link' to='/Artists'>
                    Artists
                </NavLink>
            </li>
            <li className='navbar-link'>
                <NavLink activeClassName='active-link' to='/Events'>
                    Events
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
                                onClick={Auth.logout}
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
                            className='sign-in-link'
                        >
                            <span
                            >
                                Sign In
                            </span>
                        </NavLink>
                    </li>
            }
        </ul>
    )
}

export default NavbarLinks
