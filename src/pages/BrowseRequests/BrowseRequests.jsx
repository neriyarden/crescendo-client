import React, { useContext, useEffect, useState } from 'react'
import SectionHeading from '../../components/General/Headings/SectionHeading/SectionHeading'
import API from '../../DAL/api'
import msg from '../../constants/messages'
import TextBtn from '../../components/General/Inputs/TextBtn/TextBtn'
import RequestsSearchBar from './RequestsSearchBar/RequestsSearchBar'
import RequestsPanel from './RequestsPanel/RequestsPanel'


const searchDelay = 300

const RequestsPage = () => {
    const [loading, setLoading] = useState(true)
    const [requestsData, setRequestsData] = useState([])
    const [resultsMsg, setResultsMsg] = useState('')
    const [pageNum, setPageNum] = useState(1)
    const [setTimeoutId, setSetTimeoutId] = useState(-1)
    const [searchFilters, setSearchFilters] = useState({
        artist: '',
        city: '',
        pageNum: 1,
        size: 7,
    })
    const cleanUpResults = () => {
        setResultsMsg('')
        setPageNum(1)
        setRequestsData([])
    }

    const getRequests = async () => {
        const requests = await API.getRequestsData(searchFilters)
        if (requests.length === 0) setResultsMsg(msg.NO_RESULTS_MSG)
        const userVotedRequests = JSON.parse(
            sessionStorage.getItem('user_voted_requests')
        )

        const userVotedRequestsIds = userVotedRequests ?
            userVotedRequests.map(request => (
                request.request_id
            ))
            : []
        const requestsWithUserVotes = requests.map(request => (
                {
                    ...request, userVote: userVotedRequestsIds.includes(request.id)
                        ? true : false
                }
            ))
        setRequestsData(requestsWithUserVotes)
    }

    const getMoreRequests = async (pageNum) => {
        const moreResults = await API.getRequestsData(
            { ...searchFilters, pageNum: pageNum }
        )
        if (moreResults.length === 0) setResultsMsg(msg.END_OF_RESULTS_MSG)
        setRequestsData([...requestsData, ...moreResults])
    }

    const loadMoreResults = () => {
        setLoading(true)
        getMoreRequests(pageNum + 1)
        setPageNum((prev) => prev + 1)
    }

    useEffect(() => {
        const sTId = setTimeout(() => {
            cleanUpResults()
            getRequests(searchFilters)
        }, searchDelay)

        setSetTimeoutId(sTId)
        return () => clearTimeout(setTimeoutId)
    }, [searchFilters])


    return (
        <section className='section'>
            <SectionHeading title='Requests' />
            <RequestsSearchBar
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
            />
            <RequestsPanel
                requestsData={requestsData}
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
    )
}

export default RequestsPage
