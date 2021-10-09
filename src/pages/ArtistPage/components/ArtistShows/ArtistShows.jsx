import React, { useEffect, useState } from 'react'
import EventsPanel from '../../../BrowseEvents/components/EventsPanel/EventsPanel'
import SectionHeading from '../../../../components/General/Headings/SectionHeading/SectionHeading'
import api from '../../../../DAL/api'
import Loader from '../../../../components/General/Loader'
import { useHttp } from '../../../../hooks/useHttp'

const ArtistShows = ({ artistId }) => {
	const { isLoading, error, sendRequest } = useHttp()
	const [events, setEvents] = useState([])

	useEffect(() => {
		const getEventsOfArtist = async () => {
			const results = await sendRequest(api.getArtistEvents, artistId)
			if (results.error) return
			setEvents(results)
		}
		getEventsOfArtist()
	}, [artistId, sendRequest])

	return (
		<section className='artist-page-section section'>
			<SectionHeading title='Upcoming Shows' />
			{error ? <p className='center-text'>{error}</p> : <></>}
			{isLoading ? <Loader /> : <></>}
			{events.length > 0 && !isLoading ? (
				<EventsPanel eventsData={events} />
			) : (
				<p className='no-events'>No Upcoming Shows.</p>
			)}
		</section>
	)
}

export default ArtistShows
