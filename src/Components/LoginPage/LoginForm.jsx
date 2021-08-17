import React, { useContext, useState } from 'react'
import FormHeading from '../Headings/FormHeading/FormHeading'
import TextInput from '../InputComponents/TextInput/TextInput'
import TextBtn from '../InputComponents/TextBtn/TextBtn'
import FormCheckbox from '../InputComponents/FormCheckbox/FormCheckbox'
import FormFooterText from '../InputComponents/FormFooterText/FormFooterText'
import { Formik, Form } from 'formik';
import validations from '../../validations'
import API from '../../DAL/api'
import ReloadApi from '../../Contexts/Reload'


function LoginForm() {
    const Reload = useContext(ReloadApi)
    const [serverErrorMsg, setServerErrorMsg] = useState('')
    
    const authLogin = async (loginData) => {
        const response = await API.signIn(loginData)
        if(response.error) setServerErrorMsg(response.error)
        Reload.setReloadAuth(true)
    }

    return (
        <div className="login-form-container">
            <FormHeading title='Sign In' />
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    remember_me: false
                }}

                validationSchema={validations.signIn}

                onSubmit={(values, { setSubmitting }) => {
                        authLogin(values)
                        setSubmitting(false);
                }}
            >
                    <Form className="login-form">
                        <TextInput
                            label='email address'
                            name='email'
                        />
                        <TextInput
                            name='password'
                            label='password'
                            type='password'
                        />
                        {/* <FormCheckbox
                            label='Remember Me'
                            name='remember-me'
                        /> */}
                        <span className='server-error-msg'>{serverErrorMsg}</span>
                        <TextBtn
                            text='Sign in'
                            type='submit'
                        />
                    </Form>
            </Formik>
        <FormFooterText
            text='Not registered yet?'
            linkText='Register Here'
            linkHref='/SignUp'
        />
    </div>
    )
}

export default LoginForm;
