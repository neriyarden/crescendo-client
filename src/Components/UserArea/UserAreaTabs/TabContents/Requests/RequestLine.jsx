import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons'
import API from '../../../../../DAL/api';
import AuthApi from '../../../../../Contexts/AuthApi';
import Cookies from 'js-cookie'
import EditRequest from './EditRequest';
import NewEvent from '../Events/NewEvent';


function RequestLine({ request, i, reloadRequests }) {
    const Auth = useContext(AuthApi)
    const [deletionMsg, setDeletionMsg] = useState('')
    const [completed, setCompleted] = useState(request.votes / request.cap >= 1)
    const [showEditForm, setShowEditForm] = useState(false)
    const [showAddForm, setShowAddForm] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const onEditHandler = async (values) => {
        //  TODO generalize this
        values.user_id = Auth.auth.user_id
        values.request_id = request.id
        const editedRequestData = await API.editRequest(values)
        if (editedRequestData.error) setErrMsg(editedRequestData.error)
        sessionStorage.removeItem('myRequests')
        reloadRequests(Auth.auth.id)
        setCompleted(request.votes / request.cap >= 1)
        setShowEditForm(false)
    }

    const onDeleteClick = () => {
        setDeletionMsg('confirm')
    }


    const onConfirmClick = async (requestId) => {
        setDeletionMsg('Request deleted successfully.')
        setTimeout(async () => {
            const deletedRequest = await API.deleteRequest(requestId)
            if (deletedRequest.error)
                return setDeletionMsg(deletedRequest.error)
            sessionStorage.removeItem('myRequests')
            reloadRequests(Auth.auth.id)
            setDeletionMsg('')
        }, 1500);
    }
    return (
        <li key={i} >
            {showEditForm ?
                <EditRequest
                    request={request}
                    onEditHandler={onEditHandler}
                    setShowEditForm={setShowEditForm}
                    errMsg={errMsg}
                />
                :
                deletionMsg === '' &&
                <>
                    {
                        completed ?
                            <span className='user-requests-spans'
                                onClick={() => setShowAddForm(true)}
                            >
                                Create Event
                            </span>
                            :
                            <>
                                <span className='user-requests-spans'
                                    onClick={onDeleteClick}>
                                    Delete
                                </span>

                                <span
                                    className='user-requests-spans'
                                    onClick={() => setShowEditForm(true)}
                                >
                                    Edit
                                </span>
                            </>
                    }
                    {
                        completed &&
                        <span className='user-requests-spans votes'>
                            Completed!
                        </span>
                    }
                    <span className='user-requests-spans city'>
                        {request.city}
                    </span>
                    <span className='user-requests-spans votes'>
                        {request.votes || 0}/{request.cap}
                    </span>
                </>
            } {
                deletionMsg === 'confirm' &&
                <div
                    className='confirm-delete'
                >
                    <span>Delete?</span>
                    <FontAwesomeIcon
                        icon={faCheck}
                        onClick={() => onConfirmClick(request.id)}
                        color='#28A745'
                    />
                    <FontAwesomeIcon
                        icon={faTimes}
                        onClick={() => setDeletionMsg('')}
                        color='#DC3545'
                    />
                </div>
            } {
                (deletionMsg && deletionMsg !== 'confirm') &&
                <span className='user-requests-spans'>
                    {deletionMsg}
                </span>
            }
            {showAddForm &&
                <NewEvent
                    reloadEvents={() => {
                        sessionStorage.removeItem('myRequests');
                        reloadRequests()
                    }}
                    setShowForm={setShowAddForm}
                    fromRequestValues={request}
                    />
            }
        </li>
    )
}

export default RequestLine
