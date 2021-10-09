import React, { useEffect, useContext, useState } from 'react'
import RequestsPanel from '../../../BrowseRequests/components/RequestsPanel/RequestsPanel'
import SectionHeading from '../../../../components/General/Headings/SectionHeading/SectionHeading'
import api from '../../../../DAL/api'
import { AuthApi } from '../../../../services/contexts/AuthApi'
import { Link } from 'react-router-dom'
import Loader from '../../../../components/General/Loader'
import { useHttp } from '../../../../hooks/useHttp'

const ArtistRequests = ({ artistId }) => {
	const isLoggedIn = useContext(AuthApi).auth
	const { isLoading, error, sendRequest } = useHttp()
	const [requests, setRequests] = useState([])

	useEffect(() => {
		const getRequestsOfArtist = async () => {
			const results = await sendRequest(api.getArtistRequests, artistId)
			if (error) return
			setRequests(results)
		}
		getRequestsOfArtist()
	}, [artistId, error, sendRequest])

	return (
		<section className='artist-page-section section'>
			<SectionHeading title='Requests' />
			{isLoggedIn ? (
				<>
					{error ? <p className='center-text'>{error}</p> : <></>}
					{isLoading ? <Loader /> : <></>}
					{requests.length > 0 && !isLoading ? (
						<RequestsPanel requestsData={requests} />
					) : (
						<p className='no-events'>
							No Requests for this Artist.
						</p>
					)}
				</>
			) : (
				<p className='form-end-text p-block'>
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
