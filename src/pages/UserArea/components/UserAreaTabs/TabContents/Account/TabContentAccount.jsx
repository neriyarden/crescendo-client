import React, { useContext, useEffect, useState } from 'react'
import TextInputGray from '../../../../../../components/General/Inputs/TextInputGray/TextInputGray'
import { Formik, Form } from 'formik';
import validations from '../../../../../../services/validations/validations'
import TextBtn from '../../../../../../components/General/Inputs/TextBtn/TextBtn'
import Loader from '../../../../../../components/General/Loader'
import API from '../../../../../../DAL/api';
import { AuthApi } from '../../../../../../services/contexts/AuthApi';

const TabContentAccount = () => {
    const Auth = useContext(AuthApi)
    const [loading, setLoading] = useState(true)
    const [showSubmittedMsg, setShowSubmittedMsg] = useState(false)

    const onSubmitHandler = async (values) => {
        //  TODO generalize this
        values.id = Auth.auth.id
        await API.editUserData(values)
        Auth.reloadAuth()
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
                                    <TextInputGray
                                        label='display name'
                                        name='name'
                                    />
                                    <TextInputGray
                                        label='Password'
                                        name='password'
                                        type='password'
                                    />
                                    <TextInputGray
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

