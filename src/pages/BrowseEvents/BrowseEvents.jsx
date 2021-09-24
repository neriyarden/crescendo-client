import React, { useEffect, useState } from 'react'
import SectionHeading from '../../components/General/Headings/SectionHeading/SectionHeading'
import EventsSearchBar from './components/EventsSearchBar/EventsSearchBar'
import EventsPanel from './components/EventsPanel/EventsPanel'
import API from '../../DAL/api'
import TextBtn from '../../components/General/Inputs/TextBtn/TextBtn'
import Loader from '../../components/General/Loader'
import { useHttp } from '../../hooks/useHttp'

const searchDelay = 500

const BrowseEvents = () => {
    const { isLoading, error, sendRequest, clearError } = useHttp()
    const [eventsData, setEventsData] = useState([])
    const [pageNum, setPageNum] = useState(1)
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
        clearError()
        setPageNum(1)
    }

    const loadMoreEvents = async () => {
        const moreResults = await sendRequest(
            API.getFutureEventsData,
            { ...searchFilters, pageNum: pageNum + 1 }
        )
        if (moreResults.error) return
        setEventsData([...eventsData, ...moreResults.events])
        setPageNum((prev) => prev + 1)
    }


    useEffect(() => {
        const getEvents = async () => {
            const results = await sendRequest(API.getFutureEventsData, searchFilters)
            if (results.error) return
            setEventsData(results.events)
        }

        const setTid = setTimeout(() => {
            cleanUpResults()
            getEvents()
        }, searchDelay)

        return () => clearTimeout(setTid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchFilters])

    return (
        <section className='section'>
            <SectionHeading title='Events' />
            <EventsSearchBar
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
            />
            <EventsPanel eventsData={eventsData} />
            {
                isLoading ? <Loader /> : <></>
            }
            {
                error ?
                    <p className='results-msg'>{error}</p>
                    :
                    <div className='load-more-results'>
                        <TextBtn
                            text='More Results'
                            clickHandler={loadMoreEvents}
                        />
                    </div>
            }
        </section>
    )
}

export default BrowseEvents
