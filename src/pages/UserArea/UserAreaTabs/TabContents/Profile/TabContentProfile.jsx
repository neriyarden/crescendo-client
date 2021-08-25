import React, { useContext, useEffect, useState } from 'react'
import TextInputGray from '../../../../../components/General/Inputs/TextInputGray/TextInputGray'
import UploadBtn from '../../../../../components/General/Inputs/UploadBtn/UploadBtn'
import { Formik, Form } from 'formik';
import validations from '../../../../../services/validations/validations'
import TextBtn from '../../../../../components/General/Inputs/TextBtn/TextBtn'
import API from '../../../../../DAL/api';
import AuthApi from '../../../../../services/contexts/AuthApi'
import ReloadApi from '../../../../../services/contexts/Reload'
import Loader from '../../../../../components/General/Loader'

const TabContentProfile = () => {
    const [loading, setLoading] = useState(true)
    const [showSubmittedMsg, setShowSubmittedMsg] = useState(false)
    const Auth = useContext(AuthApi)
    const Reload = useContext(ReloadApi)

    const onSubmitHandler = async (values) => {
        //  TODO generalize this
        const formData = new FormData()
        Object.keys(values).forEach(key => {
            formData.set(key, values[key])
        })
        await API.editArtistDetails(formData)
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
                                user_id: Auth.auth.id,
                                bio: Auth.auth.bio || '',
                                link_to_spotify: Auth.auth.link_to_spotify || '',
                                link_to_instagram: Auth.auth.link_to_instagram || '',
                                link_to_facebook: Auth.auth.link_to_facebook || '',
                                link_to_youtube: Auth.auth.link_to_youtube || '',
                            }}

                            validationSchema={validations.profile}

                            onSubmit={(values, { setSubmitting }) => {
                                onSubmitHandler(values)
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, dirty, setFieldValue }) => (
                                <Form className="tab-content account">
                                    <UploadBtn
                                        label='Upload a New Image'
                                        name='newImg'
                                        setFieldValue={setFieldValue}
                                    />
                                    <TextInputGray
                                        label='Bio'
                                        name='bio'
                                    />
                                    <TextInputGray
                                        label='spotify Url'
                                        name='link_to_spotify'
                                    />
                                    <TextInputGray
                                        label='instagram Url'
                                        name='link_to_instagram'
                                    />
                                    <TextInputGray
                                        label='facebook Url'
                                        name='link_to_facebook'
                                    />
                                    <TextInputGray
                                        label='youtube Url'
                                        name='link_to_youtube'
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


export default TabContentProfile

