import React, { useEffect, useContext, useState } from 'react'
import RequestsPanel from '../../../BrowseRequests/components/RequestsPanel/RequestsPanel'
import SectionHeading from '../../../../components/General/Headings/SectionHeading/SectionHeading'
import api from '../../../../DAL/api'
import { AuthApi } from '../../../../services/contexts/AuthApi'
import { Link } from 'react-router-dom'

const ArtistRequests = ({ artistId }) => {
	const isLoggedIn = useContext(AuthApi).auth
	const [loading, setLoading] = useState(true)
	const [requests, setRequests] = useState([])

	useEffect(() => {
		const getRequestsOfArtist = async () => {
			const results = await api.getArtistRequests(artistId)
			setRequests(results)
		}

		setLoading(true)
		getRequestsOfArtist()
	}, [artistId])

	return (
		<section className='artist-page-section section'>
			<SectionHeading title='Requests' />
			{isLoggedIn ? (
				<>
					{requests.length > 0 ? (
						<RequestsPanel
							requestsData={requests}
							loading={loading}
							setLoading={setLoading}
						/>
					) : (
						<p className='no-events'>
							No Requests for this Artist.
						</p>
					)}
				</>
			) : (
				<p className='form-end-text'>
					<Link
						to={{
							pathname: '/SignIn',
							state: { referrer: `/Artists/${artistId}` },
						}}
					>
						Sign in
					</Link>{' '}
					to see the artist's requests
				</p>
			)}
		</section>
	)
}

export default ArtistRequests
