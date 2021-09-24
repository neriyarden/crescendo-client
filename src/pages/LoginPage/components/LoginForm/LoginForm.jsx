import React, { useContext } from 'react'
import FormHeading from '../../../../components/General/Headings/FormHeading/FormHeading'
import TextInputPink from '../../../../components/General/Inputs/TextInputPink/TextInputPink'
import TextBtn from '../../../../components/General/Inputs/TextBtn/TextBtn'
// import FormCheckbox from '../../../../components/General/Inputs/FormCheckbox/FormCheckbox'
import FormFooterText from '../../../../components/General/Inputs/FormFooterText/FormFooterText'
import { Formik, Form } from 'formik'
import validations from '../../../../services/validations/validations'
import api from '../../../../DAL/api'
import { AuthApi } from '../../../../services/contexts/AuthApi'
import { useHttp } from '../../../../hooks/useHttp'

const LoginForm = () => {
	const Auth = useContext(AuthApi)
	const { error, sendRequest } = useHttp()

	const authLogin = async loginData => {
		const response = await sendRequest(api.signIn, loginData)
		if (error) return
		Auth.reloadAuth(response.user_id, response.token)
	}

	return (
		<div className='form-container'>
			<FormHeading title='Sign In' />
			<Formik
				initialValues={{
					email: '',
					password: '',
					remember_me: false,
				}}
				validationSchema={validations.signIn}
				onSubmit={(values, { setSubmitting }) => {
					authLogin(values)
					setSubmitting(false)
				}}
			>
				<Form className='form'>
					<TextInputPink label='email address' name='email' />
					<TextInputPink
						name='password'
						label='password'
						type='password'
					/>
					{/* <FormCheckbox
                            label='Remember Me'
                            name='remember-me'
                        /> */}
					<span className='server-error-msg'>{error}</span>
					<TextBtn text='Sign in' type='submit' />
				</Form>
			</Formik>
			<FormFooterText
				text='Not A Member Yet?'
				linkText='Join Us!'
				linkHref='/SignUp'
			/>
		</div>
	)
}

export default LoginForm
