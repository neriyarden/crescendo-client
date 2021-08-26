import React from 'react'
import UserAreaHero from './UserAreaHero/UserAreaHero'
import UserAreaTabs from './UserAreaTabs/UserAreaTabs'

const UserArea = () => {

    return (
        <section className="user-area" >
                    <>
                        <UserAreaHero/>
                        <UserAreaTabs/>
                    </>
        </section >
    )
}

export default UserArea
