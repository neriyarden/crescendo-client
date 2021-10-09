import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../DAL/api'
import { currentServer } from '../../DAL/axios'
import { useHttp } from '../../hooks/useHttp'
import Loader from '../../components/General/Loader'

const EventPage = () => {
	const { id } = useParams()
	const { isLoading, error, sendRequest } = useHttp()
	const [eventData, setEventData] = useState({})

	useEffect(() => {
		const getEventDataOnLoad = async () => {
			const data = await sendRequest(api.getEventData, id)
			if (error) return
			setEventData(data)
		}
		getEventDataOnLoad()
	}, [id, sendRequest, error])

	return (
		<section className='event-page'>
			{isLoading ? <Loader /> : <></>}{' '}
			{error ? (
				<p className='results-msg'>{error}</p>
			) : (
				<>
					<div
						className='event-page-bg'
						style={{
							backgroundImage: `url(${
								currentServer + eventData.img_url
							})`,
						}}
					></div>

					<div className='event-content'>
						<h3 className='event-name'>{eventData.tour}</h3>
						<h6 className='event-description'>
							{eventData.description}
						</h6>
						<div className='event-info'>
							<div className='event-info-details'>
								<h2 className='event-artist-name'>
									{eventData.artistName}
								</h2>
								<h6 className='event-detail'>
									{eventData.date}
								</h6>
								<h6 className='event-detail'>
									{eventData.time}
								</h6>
								<h6 className='event-detail'>
									{eventData.duration} minutes
								</h6>
								<h6 className='event-detail'>
									{eventData.venueName}
								</h6>
							</div>
							<a
								href={
									eventData.ticketseller_url ||
									'https://www.eventim.co.il/'
								}
								className='link-to-buy-tickets'
								target='_blank'
								rel='noreferrer'
							>
								Get Tickets
							</a>
						</div>
					</div>
				</>
			)}
		</section>
	)
}

export default EventPage
