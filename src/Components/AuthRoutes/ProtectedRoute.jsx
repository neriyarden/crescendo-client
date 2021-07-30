import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import AuthApi from '../../Contexts/AuthApi'
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
                    state: { referrer: pathname}
                }} 
                    />
            )}
        />
    )
}

export default ProtectedRoute