import React from 'react'
import { currentServer } from '../../../../DAL/axios'


const Logo = () => {
    return (
        <img
            src={currentServer + `/img/logo/logo1_b_bold.svg`}
            className="navbar-logo"
            alt='logo'
        />
    )
}

export default Logo
