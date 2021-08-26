import React, { useContext, useState } from 'react'
import RequestDetails from './RequestDetails'
import { AuthApi } from '../../../../services/contexts/AuthApi'
import API from '../../../../DAL/api'
import { currentServer } from '../../../../DAL/axios'


const RequestThumbnail = ({ thumbData }) => {
    const Auth = useContext(AuthApi)
    const [errMsg, setErrMsg] = useState('')
    const [votesCount, setVotesCount] = useState(parseInt(thumbData.votes) || 0)
    const [voted, setVoted] = useState(thumbData.userVote)
    const [capReached, setCapReached] = useState(thumbData.votes / thumbData.cap >= 1)
    
    const voteBtnHandler = (isVoted) => {
        const newVotesCount = votesCount + 1
        const user_id = Auth.auth.id
        sessionStorage.removeItem('myRequests')
        if (!isVoted) {
            const response = API.castVote(thumbData.id, user_id)
            if (response.error) return setErrMsg(response.error)
            setVotesCount((prev => prev + 1))
            setCapReached(newVotesCount / thumbData.cap >= 1)
        }
        if (isVoted) {
            const response = API.removeVote(thumbData.id, user_id)
            if (response.error) return setErrMsg(response.error)
            setVotesCount((prev => prev - 1))
        }
        Auth.reloadAuth()
        setVoted((prev => !prev))
    }

    return (
        <li
            className='request-thumb'
            style={{ backgroundImage: `url('${currentServer + (thumbData.img_url || '/img/tmplt_dark.svg')}')` }}
        >
            <RequestDetails
                thumbData={thumbData}
                voteBtnHandler={voteBtnHandler}
                votesCount={votesCount}
                voted={voted}
                capReached={capReached}
            />
            <span className='error'>{errMsg}</span>
        </li>
    )
}

export default RequestThumbnail
