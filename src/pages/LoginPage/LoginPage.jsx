import React from 'react'
import LoginForm from './components/LoginForm/LoginForm'
import { useLocation } from 'react-router'

const LoginPage = () => {
    const { state: { redirected } } = useLocation()

    return (
        <>
            <section className='form-body'>
                {
                    redirected && <p className='sign-in-req'>Sign-In Required</p>
                }
                <LoginForm />
            </section>
        </>
    )
}

export default LoginPage
