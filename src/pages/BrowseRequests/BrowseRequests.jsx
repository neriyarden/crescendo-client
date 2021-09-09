import React, { useEffect, useState, useContext } from 'react'
import SectionHeading from '../../components/General/Headings/SectionHeading/SectionHeading'
import API from '../../DAL/api'
import { msg } from '../../constants/messages'
import TextBtn from '../../components/General/Inputs/TextBtn/TextBtn'
import RequestsSearchBar from './components/RequestsSearchBar/RequestsSearchBar'
import RequestsPanel from './components/RequestsPanel/RequestsPanel'
import { AuthApi } from '../../services/contexts/AuthApi'

const searchDelay = 300

const BrowseRequests = () => {
    const Auth = useContext(AuthApi)
    const [loading, setLoading] = useState(true)
    const [requestsData, setRequestsData] = useState([])
    const [resultsMsg, setResultsMsg] = useState('')
    const [pageNum, setPageNum] = useState(1)
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

    
    const getMoreRequests = async (pageNum) => {
        const moreResults = await API.getRequestsData(
            { ...searchFilters, pageNum: pageNum },
            { user_id: Auth.auth.user_id }
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
        const getRequests = async () => {
            const requests = await API.getRequestsData(
                searchFilters,
                { user_id: Auth.auth.user_id }
                )
            if (requests.length === 0) return setResultsMsg(msg.NO_RESULTS_MSG)
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
        
        const setTid = setTimeout(() => {
            cleanUpResults()
            getRequests(searchFilters)
        }, searchDelay)

        return () => clearTimeout(setTid)
    }, [searchFilters, Auth.auth.user_id])


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

export default BrowseRequests
