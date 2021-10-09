import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import api from '../../../../../../DAL/api'
import { AuthApi } from '../../../../../../services/contexts/AuthApi'
import EditEvent from './EditEvent'

const EventLine = ({ event, i, reloadEvents }) => {
	const Auth = useContext(AuthApi)
	const [deletionMsg, setDeletionMsg] = useState('')
	const [showEditForm, setEditShowForm] = useState(false)
	const [errMsg, setErrMsg] = useState('')

	const onEditHandler = async values => {
		//  TODO generalize this
		const formData = new FormData()
		Object.keys(values).forEach(key => {
			formData.set(key, values[key])
		})
		formData.append('id', event.id)
		formData.set('user_id', Auth.auth.user_id)
		const editedEventData = await api.editEvent(formData)
		if (editedEventData.error) setErrMsg(editedEventData.error)
		sessionStorage.removeItem('myEvents')
		reloadEvents(Auth.auth.user_id)
		setEditShowForm(false)
	}

	const onDeleteClick = () => {
		setDeletionMsg('confirm')
	}

	const onConfirmClick = async eventId => {
		setDeletionMsg('Event deleted successfully.')
		setTimeout(async () => {
			const deletedEvent = await api.deleteEvent(eventId)
			if (deletedEvent.error) return setDeletionMsg(deletedEvent.error)
			sessionStorage.removeItem('myEvents')
			reloadEvents(Auth.auth.user_id)
			setDeletionMsg('')
		}, 1500)
	}

	return (
		// TODO add 'Sold Out'
		// TODO add 'tickets bought'
		<li key={i}>
			{showEditForm ? (
				<EditEvent
					event={event}
					onEditHandler={onEditHandler}
					setEditShowForm={setEditShowForm}
					errMsg={errMsg}
					setErrMsg={setErrMsg}
				/>
			) : (
				deletionMsg === '' && (
					<>
						<span
							className='user-events-spans'
							onClick={onDeleteClick}
						>
							Delete
						</span>
						<span
							className='user-events-spans'
							onClick={() => setEditShowForm(true)}
						>
							Edit
						</span>

						<span className='user-events-spans city'>
							<Link to={`../../Events/${event.id}`}>
								{event.city}
							</Link>
						</span>

						<span className='user-events-spans venue'>
							<Link to={`../../Events/${event.id}`}>
								{event.venue}
							</Link>
						</span>

						<span className='user-events-spans date'>
							<Link to={`../../Events/${event.id}`}>
								{event.date}
							</Link>
						</span>
					</>
				)
			)}{' '}
			{deletionMsg === 'confirm' && (
				<div className='confirm-delete'>
					<span>Delete?</span>
					<FontAwesomeIcon
						icon={faCheck}
						onClick={() => onConfirmClick(event.id)}
						color='#28A745'
					/>
					<FontAwesomeIcon
						icon={faTimes}
						onClick={() => setDeletionMsg('')}
						color='#DC3545'
					/>
				</div>
			)}{' '}
			{deletionMsg && deletionMsg !== 'confirm' && (
				<span className='user-events-spans'>{deletionMsg}</span>
			)}
		</li>
	)
}

export default EventLine
