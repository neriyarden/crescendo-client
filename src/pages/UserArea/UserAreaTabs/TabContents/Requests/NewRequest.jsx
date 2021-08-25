import React, { useState, useContext } from 'react'
import TextInput2 from '../../../../../components/General/Inputs/TextInput2/TextInput2'
import UploadBtn from '../../../../../components/General/Inputs/UploadBtn/UploadBtn'
import { Formik, Form } from 'formik';
import validations from '../../../../../validations'
import TextBtn from '../../../../../components/General/Inputs/TextBtn/TextBtn'
import API from '../../../../../DAL/api';
import AuthApi from '../../../../../services/contexts/AuthApi';
import Cookies from 'js-cookie'


function NewRequest({ reloadRequests }) {
    const Auth = useContext(AuthApi)
    const [showForm, setShowForm] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    const onSubmitHandler = async (values) => {
        //  TODO generalize this
        values.user_id = Auth.auth.user_id
        const newRequestData = await API.addNewRequest(values)
        if (newRequestData.error) setErrMsg(newRequestData.error)
        sessionStorage.removeItem('myRequests')
        reloadRequests(Auth.auth.id)
        setShowForm(false)
    }

    return (
        <li className='new-request'>
            {showForm ||
                <span
                    className='add-new-request'
                    onClick={() => setShowForm(true)}
                >
                    + Add New Request
                </span>
            }
            {showForm &&
                <div className="new-request-form">
                    <>
                        <Formik
                            initialValues={{
                                tour: '',
                                city: '',
                                cap: 10,
                            }}

                            validationSchema={validations.request}

                            onSubmit={(values, { setSubmitting }) => {
                                onSubmitHandler(values)
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, dirty, setFieldValue }) => (
                                <Form className="tab-content account">
                                    <TextInput2
                                        label='Tour Name'
                                        name='tour'
                                    />
                                    <TextInput2
                                        label='City'
                                        name='city'
                                    />
                                    <TextInput2
                                        label='Cap'
                                        name='cap'
                                        type='number'
                                        min='1' // 10
                                    />
                                    <span>{errMsg}</span>
                                    <div className='form-buttons'>
                                        <TextBtn
                                            text='Submit'
                                            type='submit'
                                            disabled={isSubmitting || !dirty}
                                        />
                                        <TextBtn
                                            text='Cancel'
                                            clickHandler={() => setShowForm(false)}
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </>
                </div>
            }
        </li>

    )
}

export default NewRequest
