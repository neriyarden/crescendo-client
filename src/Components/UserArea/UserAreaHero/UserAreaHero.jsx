import React, { useContext } from 'react'
import ArtistAvatarImg from '../../ArtistPage/ArtistHero/ArtistAvatarImg'
import UserDetails from './UserDetails'
import AuthApi from '../../../Contexts/AuthApi'

function UserAreaHero({ userData, artistData }) {
    const Auth = useContext(AuthApi)
    return (
        <section className="user-data-hero">
            <ArtistAvatarImg 
                imgPath={Auth.auth.img_url || '/img/user.png'} 
                styleClass='user-avatar'
            />
            <UserDetails userData={userData}/>

    </section>
    )
}

export default UserAreaHero
