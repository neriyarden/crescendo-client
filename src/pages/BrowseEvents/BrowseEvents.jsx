import React, { useEffect, useState, useReducer } from 'react'
import SectionHeading from '../../components/General/Headings/SectionHeading/SectionHeading'
import EventsSearchBar from './components/EventsSearchBar/EventsSearchBar'
import EventsPanel from './components/EventsPanel/EventsPanel'
import api from '../../DAL/api'
import TextBtn from '../../components/General/Inputs/TextBtn/TextBtn'
import Loader from '../../components/General/Loader'
import { useHttp } from '../../hooks/useHttp'

let searchDelay = 500

const filtersReducer = (state, action) => {
	if (action.type === 'FILTERS_CHANGE') {
		return { filters: { ...state.filters, ...action.val }, pageNum: 1 }
	}
	if (action.type === 'LOAD_MORE_RESULTS') {
		return { filters: state.filters, pageNum: state.pageNum + 1 }
	}
	return {
		filters: {
			artist: '',
			city: '',
			size: 4,
			when: '',
			tags: [],
		},
		pageNum: 1,
	}
}

const BrowseEvents = () => {
	const { isLoading, error, sendRequest, clearError } = useHttp()
	const [eventsData, setEventsData] = useState([])
	const [searchFilters, dispatchSearchFilters] = useReducer(filtersReducer, {
		filters: {
			artist: '',
			city: '',
			size: 7,
			when: '',
			tags: [],
		},
		pageNum: 1,
	})

	const updateFilters = filterObj => {
		cleanUpResults()
		dispatchSearchFilters({ type: 'FILTERS_CHANGE', val: filterObj })
		searchDelay = 500
	}

	const cleanUpResults = () => {
		setEventsData([])
		clearError()
	}

	const loadMoreEvents = async () => {
		dispatchSearchFilters({ type: 'LOAD_MORE_RESULTS' })
		searchDelay = 0
	}

	useEffect(() => {
		const getEvents = async () => {
			const results = await sendRequest(api.getFutureEventsData, {
				...searchFilters.filters,
				pageNum: searchFilters.pageNum,
			})
			if (results.error) return
			setEventsData(events => [...events, ...results.events])
		}

		const setTid = setTimeout(() => {
			getEvents()
		}, searchDelay)

		return () => clearTimeout(setTid)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchFilters])

	return (
		<section className='section'>
			<SectionHeading title='Events' />
			<EventsSearchBar onFilterChange={updateFilters} />
			<EventsPanel eventsData={eventsData} />
			{isLoading ? <Loader /> : <></>}
			{error ? (
				<p className='results-msg'>{error}</p>
			) : (
				<div className='load-more-results'>
					<TextBtn
						text='More Results'
						clickHandler={loadMoreEvents}
					/>
				</div>
			)}
		</section>
	)
}

export default BrowseEvents
