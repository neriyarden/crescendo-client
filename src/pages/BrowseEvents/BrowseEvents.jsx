import React, { useEffect, useState } from 'react'
import SectionHeading from '../../components/General/Headings/SectionHeading/SectionHeading'
import EventsSearchBar from './EventsSearchBar/EventsSearchBar'
import EventsPanel from './EventsPanel/EventsPanel'
import API from '../../DAL/api'
import msg from '../../constants/messages'
import TextBtn from '../../components/General/Inputs/TextBtn/TextBtn'


const searchDelay = 300

function BrowseEvents() {
    const [loading, setLoading] = useState(true)
    const [futureEventsData, setFutureEventsData] = useState([])
    const [resultsMsg, setResultsMsg] = useState('')
    const [pageNum, setPageNum] = useState(1)
    const [setTimeoutId, setSetTimeoutId] = useState(-1)
    const [searchFilters, setSearchFilters] = useState({
        artist: '',
        city: '',
        pageNum: 1,
        size: 7,
        when: '',
        tags: []
    })

    const cleanUpResults = () => {
        setFutureEventsData([])
        setResultsMsg('')
        setPageNum(1)
    }

    const getFutureEvents = async () => {
        const results = await API.getFutureEventsData(searchFilters)
        if (results.events.length === 0) setResultsMsg(msg.NO_RESULTS_MSG)
        setFutureEventsData(results.events)
    }

    const getMoreEvents = async (pageNum) => {
        const moreResults = await API.getFutureEventsData(
            { ...searchFilters, pageNum: pageNum }
        )
        if (moreResults.events.length === 0) setResultsMsg(msg.END_OF_RESULTS_MSG)
        setFutureEventsData([...futureEventsData, ...moreResults.events])
    }

    const loadMoreResults = () => {
        setLoading(true)
        getMoreEvents(pageNum + 1)
        setPageNum((prev) => prev + 1)
    }

    useEffect(() => {
        const sTId = setTimeout(() => {
            cleanUpResults()
            getFutureEvents(searchFilters)
        }, searchDelay)

        setSetTimeoutId(sTId)
        return () => clearTimeout(setTimeoutId)
    }, [searchFilters])

    return (
        <>
            <section className='section'>
                <SectionHeading title='Events' />
                <EventsSearchBar
                    searchFilters={searchFilters}
                    setSearchFilters={setSearchFilters}
                />
                <EventsPanel
                    eventsData={futureEventsData}
                    setLoading={setLoading}
                    loading={loading}
                />
                {resultsMsg && <p className='results-msg'>{resultsMsg}</p>}
                <div className='load-more-results'>
                    {resultsMsg
                        ?
                        <TextBtn text='More Results' />
                        :
                        <TextBtn text='More Results' clickHandler={loadMoreResults} />
                    }
                </div>
            </section>
        </>
    )
}

export default BrowseEvents
