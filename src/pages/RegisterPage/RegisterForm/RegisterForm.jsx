import React, { useState } from 'react'
import FormHeading from '../../../components/General/Headings/FormHeading/FormHeading'
import TextInputPink from '../../../components/General/Inputs/TextInputPink/TextInputPink'
import TextBtn from '../../../components/General/Inputs/TextBtn/TextBtn'
import FormFooterText from '../../../components/General/Inputs/FormFooterText/FormFooterText'
import { Formik, Form } from 'formik';
import validations from '../../../services/validations/validations'
import API from '../../../DAL/api'
import { Redirect } from 'react-router-dom'
import Toggles from '../../../components/General/Inputs/Toggles/Toggles'

const RegisterForm = () => {
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
        <div className='form-container'>
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
                <Form className='form'>
                    <TextInputPink
                        name='name'
                        label='display name'
                        subtexts={displayNameSubtexts}
                    />
                    <TextInputPink
                        name='email'
                        label='email address'
                    />
                    <TextInputPink
                        name='password'
                        label='password'
                        type='password'
                    />
                    <TextInputPink
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
                text='Already A Member?'
                linkText='Sign In'
                linkHref={{
                    pathname: '/SignIn',
                    state: { referrer: '/User/Welcome' }
                }}
            />

        </div>
    )
}

export default RegisterForm
