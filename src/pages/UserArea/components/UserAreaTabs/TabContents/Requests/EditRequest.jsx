import React, { useContext } from 'react'
import TextInputGray from '../../../../../../components/General/Inputs/TextInputGray/TextInputGray'
import { Formik, Form } from 'formik'
import validations from '../../../../../../services/validations/validations'
import TextBtn from '../../../../../../components/General/Inputs/TextBtn/TextBtn'
import { AuthApi } from '../../../../../../services/contexts/AuthApi'

const EditRequest = ({ request, onEditHandler, setShowEditForm, errMsg }) => {
	const Auth = useContext(AuthApi)

	return (
		<div className='new-request'>
			<div className='new-request-form'>
				<Formik
					initialValues={{
						user_id: Auth.auth.user_id,
						tour: request.tour,
						city: request.city,
						cap: request.cap,
					}}
					validationSchema={validations.request}
					onSubmit={(values, { setSubmitting }) => {
						onEditHandler(values)
						setSubmitting(false)
					}}
				>
					{({ isSubmitting, dirty }) => (
						<Form className='tab-content account'>
							<TextInputGray label='Tour Name' name='tour' />
							<TextInputGray label='City' name='city' />
							<TextInputGray
								label='Cap'
								name='cap'
								type='number'
								min={1 > request.votes ? 1 : request.votes} // 10
							/>
							<span>{errMsg}</span>
							<div className='form-buttons'>
								<TextBtn
									text='Edit'
									type='submit'
									disabled={isSubmitting || !dirty}
								/>
								<TextBtn
									text='Cancel'
									clickHandler={() => setShowEditForm(false)}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default EditRequest
