import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { AuthApi } from '../contexts/AuthApi'
import { useLocation } from 'react-router'

const ProtectedRoute = ({ component: Component, ...params }) => {
    const Auth = useContext(AuthApi)
    const {pathname} = useLocation()
    return (
        <Route
            {...params}
            render={() => Auth.auth ? (
                <Component />
            ) : (
                <Redirect to={{
                    pathname: '/signIn',
                    state: { referrer: pathname, redirected: true }
                }} 
                    />
            )}
        />
    )
}

export default ProtectedRoute