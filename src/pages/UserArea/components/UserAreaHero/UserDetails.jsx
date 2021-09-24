import React, { useContext } from 'react'
import { AuthApi } from '../../../../services/contexts/AuthApi'

const UserDetails = () => {
	const Auth = useContext(AuthApi)
	return (
		<div className='user-details'>
			<h3 className='user-name'>{Auth.auth.name}</h3>
			<p>Joined At: {Auth.auth.joined_at}</p>
			<p className='is-artist'>{Auth.auth.is_artist ? 'Artist' : ''}</p>
		</div>
	)
}

export default UserDetails
