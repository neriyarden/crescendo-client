import React, { useContext, useState } from 'react'
import FormHeading from '../../../components/General/Headings/FormHeading/FormHeading'
import TextInputPink from '../../../components/General/Inputs/TextInputPink/TextInputPink'
import TextBtn from '../../../components/General/Inputs/TextBtn/TextBtn'
import FormCheckbox from '../../../components/General/Inputs/FormCheckbox/FormCheckbox'
import FormFooterText from '../../../components/General/Inputs/FormFooterText/FormFooterText'
import { Formik, Form } from 'formik';
import validations from '../../../validations'
import API from '../../../DAL/api'
import ReloadApi from '../../../services/contexts/Reload'


const LoginForm = () => {
    const Reload = useContext(ReloadApi)
    const [serverErrorMsg, setServerErrorMsg] = useState('')
    
    const authLogin = async (loginData) => {
        const response = await API.signIn(loginData)
        if(response.error) setServerErrorMsg(response.error)
        Reload.setReloadAuth(true)
    }

    return (
        <div className="form-container">
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
                    <Form className="form">
                        <TextInputPink
                            label='email address'
                            name='email'
                        />
                        <TextInputPink
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
