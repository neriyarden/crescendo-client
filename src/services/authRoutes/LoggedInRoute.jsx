import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router'
import { AuthApi } from '../../services/contexts/AuthApi'
import { useLocation } from 'react-router'

const LoggedInRoute = ({ component: Component, ...params }) => {
	const Auth = useContext(AuthApi)
	const {
		state: { referrer },
	} = useLocation()
	return (
		<Route
			{...params}
			render={() =>
				!Auth.auth ? <Component /> : <Redirect to={referrer} />
			}
		/>
	)
}

export default LoggedInRoute
