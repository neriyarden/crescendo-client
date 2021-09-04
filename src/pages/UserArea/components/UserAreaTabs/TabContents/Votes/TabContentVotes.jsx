import React, { useEffect, useState, useContext, useCallback } from 'react'
import API from '../../../../../../DAL/api'
import VoteLine from './VoteLine'
import Loader from '../../../../../../components/General/Loader'
import { AuthApi } from '../../../../../../services/contexts/AuthApi'

const  TabContentVotes = () => {
    const Auth = useContext(AuthApi)
    const [loading, setLoading] = useState(true)
    const [votes, setVotes] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    const getVotesOfUser = useCallback(async () => {
        const localData = JSON.parse(sessionStorage.getItem('user_voted_requests'))
        if (localData?.error) sessionStorage.removeItem('myRequests')
        if (localData?.length > 0) return setVotes(localData)
        const results = await API.getUserVotes(Auth.auth.id)
        if (results?.error) {
            setVotes([])
            return setErrorMsg((results?.error))
        }
        sessionStorage.setItem('user_voted_requests', JSON.stringify(results))
        setVotes(results)
    }, [Auth])

    const votesItems = votes.map((vote, i) => (
        <VoteLine key={i} vote={vote} i={i} reloadVotes={getVotesOfUser} />
    ))

    useEffect(() => {
        setTimeout(() => {
            getVotesOfUser()
            setLoading(false)
        }, 500)
    }, [getVotesOfUser])

    return (
        <div className='user-area-votes'>
            <h2 className="my-votes">My Votes</h2>
            {
                loading ? <Loader /> :
                    <ul>
                        {votesItems}
                        <p className='error'>{errorMsg}</p>
                    </ul>
            }
        </div>
    )
}

export default TabContentVotes
