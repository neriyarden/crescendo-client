import React, { useState } from 'react'
import FormHeading from '../../../../components/General/Headings/FormHeading/FormHeading'
import TextInputPink from '../../../../components/General/Inputs/TextInputPink/TextInputPink'
import TextBtn from '../../../../components/General/Inputs/TextBtn/TextBtn'
import FormFooterText from '../../../../components/General/Inputs/FormFooterText/FormFooterText'
import { Formik, Form } from 'formik'
import validations from '../../../../services/validations/validations'
import api from '../../../../DAL/api'
import { Redirect } from 'react-router-dom'
import Toggles from '../../../../components/General/Inputs/Toggles/Toggles'
import { useHttp } from '../../../../hooks/useHttp'

const displayNameSubtexts = [
	'You can change this later in your personal settings',
]

const RegisterForm = () => {
	const { error, sendRequest, clearError } = useHttp()
	const [registeredSuccessfully, setRegisteredSuccessfully] = useState(false)

	const onSubmitHanlder = async values => {
		await sendRequest(api.registerNewUser, values)
		if (error) return
		setRegisteredSuccessfully(true)
	}

	if (registeredSuccessfully) {
		return (
			<Redirect
				to={{
					pathname: '/SignIn',
					state: { referrer: '/User/Welcome' },
				}}
			/>
		)
	}

	return (
		<div className='form-container'>
			<FormHeading title='Sign Up' />
			<Formik
				initialValues={{
					name: '',
					email: '',
					password: '',
					repeat_password: '',
					is_artist: 0,
				}}
				validationSchema={validations.signUp}
				onSubmit={(values, { setSubmitting }) => {
					clearError()
					onSubmitHanlder(values)
					setSubmitting(false)
				}}
			>
				{({ errors, dirty }) => (
					<Form className='form'>
						<TextInputPink
							name='name'
							label='display name'
							subtexts={displayNameSubtexts}
						/>
						<TextInputPink name='email' label='email address' />
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
						<Toggles name='is_artist' labels={['fan', 'artist']} />
						<span className='server-error-msg'>{error}</span>
						<TextBtn
							text='sign up'
							type='submit'
							disabled={
								Object.keys(errors).length !== 0 || !dirty
							}
						/>
					</Form>
				)}
			</Formik>
			<FormFooterText
				text='Already A Member?'
				linkText='Sign In'
				linkHref={{
					pathname: '/SignIn',
					state: { referrer: '/User/Welcome' },
				}}
			/>
		</div>
	)
}

export default RegisterForm
