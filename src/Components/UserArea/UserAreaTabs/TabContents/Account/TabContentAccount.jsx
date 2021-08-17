import React, { useContext, useEffect, useState } from 'react'
import TextInput2 from '../../../../InputComponents/TextInput2/TextInput2'
import { Formik, Form } from 'formik';
import validations from '../../../../../validations'
import TextBtn from '../../../../InputComponents/TextBtn/TextBtn'
import Loader from '../../../../General/Loader'
import API from '../../../../../DAL/api';
import AuthApi from '../../../../../Contexts/AuthApi';
import ReloadApi from '../../../../../Contexts/Reload';

function TabContentAccount() {
    const [loading, setLoading] = useState(true)
    const [showSubmittedMsg, setShowSubmittedMsg] = useState(false)
    const Auth = useContext(AuthApi)
    const Reload = useContext(ReloadApi)

    const onSubmitHandler = async (values) => {
        //  TODO generalize this
        values.id = Auth.auth.id // ?
        await API.editUserData(values)
        Reload.setReloadAuth(true)
        setShowSubmittedMsg(true)
        setTimeout(() => {
            setShowSubmittedMsg(false)
        }, 2000);
    }

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 500)
    }, [])

    return (
        <>
            {loading ? <Loader /> :
                (
                    showSubmittedMsg ?
                        <h4 className='center-text'>Your Details Were Submitted Successfully.</h4>
                        :
                        <Formik
                            initialValues={{
                                name: Auth.auth.name,
                                password: '',
                                repeat_password: ''
                            }}

                            validationSchema={validations.account}

                            onSubmit={(values, { setSubmitting }) => {
                                onSubmitHandler(values)
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, dirty }) => (
                                <Form className="tab-content account">
                                    <TextInput2
                                        label='display name'
                                        name='name'
                                    />
                                    <TextInput2
                                        label='Password'
                                        name='password'
                                        type='password'
                                    />
                                    <TextInput2
                                        label='Re-Enter Password'
                                        name='repeat_password'
                                        type='password'
                                    />
                                    <TextBtn
                                        text='Save'
                                        type='submit'
                                        disabled={isSubmitting || !dirty}
                                    />
                                </Form>
                            )}
                        </Formik>
                )

            }
        </>
    );

}


export default TabContentAccount
