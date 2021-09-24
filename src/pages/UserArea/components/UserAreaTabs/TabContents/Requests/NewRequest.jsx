import React, { useState, useContext } from 'react'
import TextInputGray from '../../../../../../components/General/Inputs/TextInputGray/TextInputGray'
import { Formik, Form } from 'formik'
import validations from '../../../../../../services/validations/validations'
import TextBtn from '../../../../../../components/General/Inputs/TextBtn/TextBtn'
import api from '../../../../../../DAL/api'
import { AuthApi } from '../../../../../../services/contexts/AuthApi'

const NewRequest = ({ reloadRequests }) => {
	const Auth = useContext(AuthApi)
	const [showForm, setShowForm] = useState(false)
	const [errMsg, setErrMsg] = useState('')

	const onSubmitHandler = async values => {
		//  TODO generalize this
		values.user_id = Auth.auth.user_id
		const newRequestData = await api.addNewRequest(values)
		if (newRequestData.error) setErrMsg(newRequestData.error)
		sessionStorage.removeItem('myRequests')
		reloadRequests(Auth.auth.user_id)
		setShowForm(false)
	}

	return (
		<li className='new-request'>
			{showForm || (
				<span
					className='add-new-request'
					onClick={() => setShowForm(true)}
				>
					+ Add New Request
				</span>
			)}
			{showForm && (
				<div className='new-request-form'>
					<>
						<Formik
							initialValues={{
								user_id: Auth.auth.user_id,
								tour: '',
								city: '',
								cap: 10,
							}}
							validationSchema={validations.request}
							onSubmit={(values, { setSubmitting }) => {
								onSubmitHandler(values)
								setSubmitting(false)
							}}
						>
							{({ isSubmitting, dirty }) => (
								<Form className='tab-content account'>
									<TextInputGray
										label='Tour Name'
										name='tour'
									/>
									<TextInputGray label='City' name='city' />
									<TextInputGray
										label='Cap'
										name='cap'
										type='number'
										min='1' // 10
									/>
									<span>{errMsg}</span>
									<div className='form-buttons'>
										<TextBtn
											text='Submit'
											type='submit'
											disabled={isSubmitting || !dirty}
										/>
										<TextBtn
											text='Cancel'
											clickHandler={() =>
												setShowForm(false)
											}
										/>
									</div>
								</Form>
							)}
						</Formik>
					</>
				</div>
			)}
		</li>
	)
}

export default NewRequest
