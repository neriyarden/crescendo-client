import React, { useEffect, useState, useContext } from 'react'
import UserAreaHero from './UserAreaHero/UserAreaHero'
import UserAreaTabs from './UserAreaTabs/UserAreaTabs'
import AuthApi from '../../Contexts/AuthApi'
import Loader from '../General/Loader'
import Reload from '../../Contexts/Reload'

function UserArea() {
    const Auth = useContext(AuthApi)
    const [userData, setUserData] = useState({})
    const [artistData, setArtistData] = useState({})

    const getUserData = async () => {
        const userData = Auth.auth
        setUserData(userData)
        if (userData.is_artist)
            setArtistData(userData)
    }

    useEffect(() => {
        getUserData()
    }, [userData])

    return (
        <section className="user-area" >
                    <>
                        <UserAreaHero
                            userData={userData}
                            artistData={artistData}
                        />
                        <UserAreaTabs
                            userData={userData}
                            artistData={artistData}
                        />
                    </>
        </section >
    )
}

export default UserArea
