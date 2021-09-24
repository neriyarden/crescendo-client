import React, { useEffect, useState, useContext } from 'react'
import SectionHeading from '../../components/General/Headings/SectionHeading/SectionHeading'
import api from '../../DAL/api'
import { msg } from '../../constants/messages'
import TextBtn from '../../components/General/Inputs/TextBtn/TextBtn'
import RequestsSearchBar from './components/RequestsSearchBar/RequestsSearchBar'
import RequestsPanel from './components/RequestsPanel/RequestsPanel'
import { AuthApi } from '../../services/contexts/AuthApi'
import Loader from '../../components/General/Loader'
import { useHttp } from '../../hooks/useHttp'

const searchDelay = 300

const BrowseRequests = () => {
    const Auth = useContext(AuthApi)
    const { isLoading, error, sendRequest, clearError } = useHttp()
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
        setRequestsData([])
        clearError()
        setPageNum(1)
    }

    const loadMoreRequests = async () => {
        const moreResults = await sendRequest(
            api.getRequestsData,
            { ...searchFilters, pageNum: pageNum + 1 },
        )
        if (moreResults.error) return
        setRequestsData([...requestsData, ...moreResults])
        setPageNum((prev) => prev + 1)
    }


    useEffect(() => {
        const getRequests = async () => {
            const requests = await sendRequest(api.getRequestsData, searchFilters)
            if (requests.error) return

            const userVotedRequests = JSON.parse(
                sessionStorage.getItem('user_voted_requests')
            )
            const userVotedRequestsIds = userVotedRequests
                ? userVotedRequests.map(request => (request.request_id))
                : []
            const requestsWithUserVotes = requests.map(request => (
                { ...request, userVote: userVotedRequestsIds.includes(request.id) }
            ))
            setRequestsData(requestsWithUserVotes)
        }

        const setTid = setTimeout(() => {
            cleanUpResults()
            getRequests(searchFilters)
        }, searchDelay)

        return () => clearTimeout(setTid)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchFilters, Auth])


    return (
        <section className='section'>
            <SectionHeading title='Requests' />
            <RequestsSearchBar
                searchFilters={searchFilters}
                setSearchFilters={setSearchFilters}
            />
            <RequestsPanel requestsData={requestsData} />
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
                            clickHandler={loadMoreRequests}
                        />
                    </div>
            }
        </section>
    )
}

export default BrowseRequests
