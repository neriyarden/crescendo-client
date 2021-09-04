import React from 'react'
import UserAreaHero from './components/UserAreaHero/UserAreaHero'
import UserAreaTabs from './components/UserAreaTabs/UserAreaTabs'

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
