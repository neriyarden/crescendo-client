import React, { useContext, useState } from 'react'
import RequestDetails from './RequestDetails'
import AuthApi from '../../../../Contexts/AuthApi'
import API from '../../../../DAL/api'
import ReloadAPI from '../../../../Contexts/Reload'

function RequestThumbnail({ thumbData }) {
    const Auth = useContext(AuthApi)
    const Reload = useContext(ReloadAPI)
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
        Reload.setReloadAuth(true)
        setVoted((prev => !prev))
    }

    return (
        <li
            className='request-thumb'
            style={{ backgroundImage: `url('${window.location.origin + (thumbData.img_url || '/img/tmplt_dark.svg')}')` }}
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
