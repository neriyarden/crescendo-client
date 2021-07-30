import React from 'react'

function UserDetails({ userData }) {
    return (
        <div className='user-details'>
            <h3 className='user-name'>{userData.name}</h3>
            <p>Joined At: {userData.joined_at}</p>
            <p className='is-artist'>{userData.is_artist ? 'Artist' : ''}</p>
        </div>
    )
}

export default UserDetails
