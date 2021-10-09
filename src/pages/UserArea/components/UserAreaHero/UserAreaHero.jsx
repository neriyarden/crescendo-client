import React, { useContext } from 'react'
import ArtistAvatarImg from '../../../ArtistPage/components/ArtistHero/ArtistAvatarImg'
import UserDetails from './UserDetails'
import { AuthApi } from '../../../../services/contexts/AuthApi'

const UserAreaHero = () => {
	const Auth = useContext(AuthApi)
	return (
		<section className='user-data-hero'>
			<ArtistAvatarImg
				imgPath={Auth.auth.img_url || '/img/user.png'}
				styleClass='user-avatar'
			/>
			<UserDetails />
		</section>
	)
}

export default UserAreaHero
