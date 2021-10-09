import React, { useState, useEffect, useContext } from 'react'
import TextInputGray from '../../../../../../components/General/Inputs/TextInputGray/TextInputGray'
import UploadBtn from '../../../../../../components/General/Inputs/UploadBtn/UploadBtn'
import { Formik, Form, Field } from 'formik'
import validations from '../../../../../../services/validations/validations'
import TextBtn from '../../../../../../components/General/Inputs/TextBtn/TextBtn'
import { getTags, formatDDMMYYYToYYYYMMDD } from '../../../../../../utils/utils'
import { AuthApi } from '../../../../../../services/contexts/AuthApi'

const EditEvent = ({ event, onEditHandler, setEditShowForm, errMsg }) => {
	const Auth = useContext(AuthApi)
	const [categories, setCategories] = useState([])

	const categoryTags = categories.map((tag, i) => (
		<label className='tag-label' key={i}>
			<Field
				className='tag-checkbox'
				type='checkbox'
				name='tags'
				value={'' + tag.id}
			/>
			{tag.name}
		</label>
	))

	useEffect(() => {
		const getCategories = async () => {
			const tags = await getTags()
			setCategories(
				tags.map(tag => ({
					...tag,
					checked: event.tags.find(
						eventTag => tag.id === eventTag.tag_id
					),
				}))
			)
		}
		getCategories()
	}, [event])

	return (
		<div className='new-event'>
			<div className='new-event-form'>
				<Formik
					initialValues={{
						user_id: Auth.auth.user_id,
						tour: event.tour,
						date: formatDDMMYYYToYYYYMMDD(event.date),
						time: event.time,
						duration: event.duration,
						venueName: event.venue,
						cityName: event.city,
						description: event.description,
						ticketseller_url: event.ticketseller_url,
						tags: categories
							.filter(category => category.checked)
							.map(category => '' + category.id),
					}}
					validationSchema={validations.event}
					onSubmit={(values, { setSubmitting }) => {
						onEditHandler(values)
						setSubmitting(false)
					}}
				>
					{({ isSubmitting, dirty, setFieldValue }) => (
						<Form className='tab-content account'>
							<TextInputGray label='Tour Name' name='tour' />
							<TextInputGray
								label='Date'
								name='date'
								type='date'
							/>
							<TextInputGray
								label='time'
								name='time'
								type='time'
							/>
							<TextInputGray
								label='duration (min)'
								name='duration'
								type='number'
							/>
							<TextInputGray label='Venue' name='venueName' />
							<TextInputGray label='City' name='cityName' />
							<TextInputGray
								label='Description'
								name='description'
								type='textarea'
							/>
							<TextInputGray
								label='Ticket Seller URL'
								name='ticketseller_url'
							/>
							<UploadBtn
								label='Event Image'
								name='newImg'
								setFieldValue={setFieldValue}
							/>
							<div role='group' className='form-checkboxes'>
								{categoryTags}
							</div>
							<span>{errMsg}</span>
							<div className='form-buttons'>
								<TextBtn
									text='Edit'
									type='submit'
									disabled={isSubmitting || !dirty}
								/>
								<TextBtn
									text='Cancel'
									clickHandler={() => setEditShowForm(false)}
								/>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default EditEvent
