import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import API from '../../../../../DAL/api';
import AuthApi from '../../../../../Contexts/AuthApi';
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'


function VoteLine({ vote, i, reloadVotes }) {
    const Auth = useContext(AuthApi)
    const [unvoteMsg, setUnvoteMsg] = useState('')
    const onUnVoteClick = () => {
        setUnvoteMsg('confirm')
    }

    const onConfirmClick = async (requestId) => {
        setUnvoteMsg('Your Vote Was Removed Successfully.')
        setTimeout(async () => {
            // sessionStorage cleared so user who votes for his own req will get updated req dashboard
            sessionStorage.removeItem('myRequests')
            const userId = Auth.auth.id
            const removedVote = await API.removeVote(requestId, userId)
            if (removedVote.error)
                return setUnvoteMsg(removedVote.error)
            sessionStorage.removeItem('user_voted_requests')
            reloadVotes(Cookies.getJSON('session_id'))
            setUnvoteMsg('')
        }, 1500);
    }
    return (
        <li key={i} >
            {
                unvoteMsg === '' &&
                <>
                    <span className='user-votes-spans'
                        onClick={onUnVoteClick}>
                        Un-Vote
                    </span>
                    <Link to={`/Artists/${vote.artist_id}`}>
                    <span className='user-votes-spans artist'>
                        {vote.artist}
                    </span>
                    </Link>
                    <span className='user-votes-spans city'>
                        {vote.city}
                    </span>
                    {
                        (vote.votes / vote.cap >= 1) ?
                            <span className='user-votes-spans votes'>
                                Completed!
                            </span>
                            :
                            <span className='user-votes-spans votes'>
                                {vote.votes || 0}/{vote.cap}
                            </span>
                    }
                </>
            } {
                unvoteMsg === 'confirm' &&
                <div
                    className='confirm-remove'
                >
                    <span>Remove Vote?</span>
                    <FontAwesomeIcon
                        icon={faCheck}
                        onClick={() => onConfirmClick(vote.request_id, vote.user_id)}
                        color='#28A745'
                    />
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => setUnvoteMsg('')}
                        color='#DC3545'
                    />
                </div>
            } {
                (unvoteMsg && unvoteMsg !== 'confirm') &&
                <span className='user-votes-spans'>
                    {unvoteMsg}
                </span>
            }
        </li>

    )
}

export default VoteLine
