import React, { useContext } from 'react'
import AuthApi from '../../../../services/contexts/AuthApi'

function TabContentGrid() {
    const Auth = useContext(AuthApi)
    return (
        <div className="tab-content welcome">
        <h2>Welcome, {Auth.auth.name}!</h2>
    </div>
    )
}

export default TabContentGrid
