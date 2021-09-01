import React, { useEffect, useState, useCallback } from 'react'
import SectionHeading from '../../components/General/Headings/SectionHeading/SectionHeading'
import EventsSearchBar from './EventsSearchBar/EventsSearchBar'
import EventsPanel from './EventsPanel/EventsPanel'
import API from '../../DAL/api'
import TextBtn from '../../components/General/Inputs/TextBtn/TextBtn'
import Loader from '../../components/General/Loader'


const searchDelay = 300

const BrowseEvents = () => {
    const [loading, setLoading] = useState(true)
    const [eventsData, setEventsData] = useState([])
    const [errorMsg, setErrorMsg] = useState('')
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
        setEventsData([])
        setErrorMsg('')
        setPageNum(1)
    }

    const getFutureEvents = useCallback(async () => {
        const results = await API.getFutureEventsData(searchFilters)
        if (results?.error) return setErrorMsg(results.error)
        setEventsData(results.events)
    }, [searchFilters])

    const getMoreEvents = async (pageNum) => {
        const moreResults = await API.getFutureEventsData(
            { ...searchFilters, pageNum }
        )
        if (moreResults?.error) return setErrorMsg(moreResults.error)
        setEventsData([...eventsData, ...moreResults.events])
    }

    const moreResultsClickHandler = () => {
        setLoading(true)
        getMoreEvents(pageNum + 1)
        setPageNum((prev) => prev + 1)
        setLoading(false)

    }

    useEffect(() => {
        const sTId = setTimeout(() => {
            cleanUpResults()
            getFutureEvents()
            setLoading(false)
        }, searchDelay)

        setSetTimeoutId(sTId)
        return () => clearTimeout(setTimeoutId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getFutureEvents])

    return (
        <>
            <section className='section'>
                <SectionHeading title='Events' />
                <EventsSearchBar
                    searchFilters={searchFilters}
                    setSearchFilters={setSearchFilters}
                />
                {
                    loading ? <Loader />
                    :
                        eventsData.length > 0 ?
                            <EventsPanel eventsData={eventsData} />
                            :
                            <></>
                }
                {
                    errorMsg ?
                        <p className='results-msg'>{errorMsg}</p>
                        :
                        <div className='load-more-results'>
                            <TextBtn
                                text='More Results'
                                clickHandler={moreResultsClickHandler}
                            />
                        </div>
                }
            </section>
        </>
    )
}

export default BrowseEvents
