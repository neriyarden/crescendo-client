import React, { useState } from 'react'
import FormHeading from '../../Headings/FormHeading/FormHeading'
import TextInput from '../../InputComponents/TextInput/TextInput'
import TextBtn from '../../InputComponents/TextBtn/TextBtn'
import FormFooterText from '../../InputComponents/FormFooterText/FormFooterText'
import { Formik, Form } from 'formik';
import validations from '../../../validations'
import API from '../../../DAL/api'
import { Redirect } from 'react-router-dom'
import Toggles from '../../InputComponents/Toggles/Toggles'

function RegisterForm() {
    const [serverErrorMsg, setServerErrorMsg] = useState('')
    const [redirectToLogin, setRedirectToLogin] = useState(false)

    const displayNameSubtexts = [
        'You can change this later in your personal settings'
    ]

    const onSubmitHanlder = async (values) => {
        const response = await API.registerNewUser(values)
        if (response.data?.error) return setServerErrorMsg(response.data?.error)
        // setRedirectToLogin(true)
    }
    if (redirectToLogin) return <Redirect to={{
        pathname: '/SignIn',
        state: { referrer: '/User/Welcome' }
    }} />
    return (
        <div className='signup-form-container'>
            <FormHeading title='Sign Up' />
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    repeat_password: '',
                    is_artist: 0
                }}

                validationSchema={validations.signUp}

                onSubmit={(values, { setSubmitting }) => {
                    onSubmitHanlder(values)
                    setSubmitting(false);
                }}
            >
                <Form className='signup-form'>
                    <TextInput
                        name='name'
                        label='display name'
                        subtexts={displayNameSubtexts}
                    />
                    <TextInput
                        name='email'
                        label='email address'
                    />
                    <TextInput
                        name='password'
                        label='password'
                        type='password'
                    />
                    <TextInput
                        name='repeat_password'
                        label='confirm password'
                        placeholder='Re-enter your password'
                        type='password'
                    />
                    <Toggles
                        name='is_artist'
                        labels={['fan', 'artist']}
                    />
                    <span className='server-error-msg'>{serverErrorMsg}</span>
                    <TextBtn
                        text='sign up'
                        type='submit'
                    />
                </Form>
            </Formik>
            <FormFooterText
                text='Already signed up?'
                linkText='Login Here'
                linkHref={{
                    pathname: '/SignIn',
                    state: { referrer: '/User/Welcome' }
                }}
            />

        </div>
    )
}

export default RegisterForm