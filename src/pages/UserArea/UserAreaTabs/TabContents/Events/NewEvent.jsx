import React, { useState, useContext } from 'react'
import TextInputGray from '../../../../../components/General/Inputs/TextInputGray/TextInputGray'
import UploadBtn from '../../../../../components/General/Inputs/UploadBtn/UploadBtn'
import { Formik, Form, Field } from 'formik';
import validations from '../../../../../services/validations/validations'
import TextBtn from '../../../../../components/General/Inputs/TextBtn/TextBtn'
import API from '../../../../../DAL/api';
import { AuthApi } from '../../../../../services/contexts/AuthApi';
import utils from '../../../../../utils'


const NewEvent = ({ reloadEvents, setShowForm, fromRequestValues }) => {
    const Auth = useContext(AuthApi)
    const [errMsg, setErrMsg] = useState('')
    const [categories, setCategories] = useState([])

    const getTagsObj = async () => {
        let categoriesData = await utils.getTags()
        if (categoriesData.error) setErrMsg(categoriesData.error)
        setCategories(categoriesData)
    }

    const categoryTags = categories.map((tag, i) => (
        <label className='tag-label' key={i}>
            <Field className='tag-checkbox' type="checkbox" name="tags" value={'' + tag.id} />
            {tag.name}
        </label>
    ))


    const onSubmitHandler = async (values) => {
        //  TODO generalize this
        const formData = new FormData()
        Object.keys(values).forEach(key => {
            formData.set(key, values[key])
        })
        formData.set('user_id', Auth.auth.user_id)
        if(fromRequestValues) {
            formData.set('came_from_request_id', fromRequestValues.id)
        }
        const newEventData = await API.addNewEvent(formData)
        if (newEventData.error) setErrMsg(newEventData.error)
        sessionStorage.removeItem('myEvents')
        reloadEvents(Auth.auth.id)
        setShowForm(false)
    }

    useState(() => {
        getTagsObj()
    }, [])

    return (
        <li className='new-event'>
                <div className="new-event-form">
                    <>
                        <Formik
                            initialValues={{
                                tour: '',
                                date: null,
                                time: null,
                                duration: 60,
                                venueName: '',
                                cityName: fromRequestValues?.city || '',
                                description: '',
                                ticketseller_url: '',
                                tags: [],
                            }}

                            validationSchema={validations.event}

                            onSubmit={(values, { setSubmitting }) => {
                                onSubmitHandler(values)
                                setSubmitting(false);
                            }}
                        >
                            {({ isSubmitting, dirty, setFieldValue }) => (
                                <Form className="tab-content account">
                                    <TextInputGray
                                        label='Tour Name'
                                        name='tour'
                                    />
                                    <TextInputGray
                                        label='Date'
                                        name='date'
                                        type='date'
                                    />
                                    <TextInputGray
                                        label='time'
                                        name='time'
                                        type='time'
                                    />
                                    <TextInputGray
                                        label='duration (min)'
                                        name='duration'
                                        type='number'
                                    />
                                    <TextInputGray
                                        label='Venue'
                                        name='venueName'
                                    />
                                    <TextInputGray
                                        label='City'
                                        name='cityName'
                                        disabled={!!fromRequestValues?.city}
                                    />
                                    <TextInputGray
                                        label='Description'
                                        name='description'
                                    />
                                    <TextInputGray
                                        label='Ticket Seller URL'
                                        name='ticketseller_url'
                                    />
                                    <UploadBtn
                                        label='Event Image'
                                        name='newImg'
                                        setFieldValue={setFieldValue}
                                    />
                                    <div role='group' className="form-checkboxes">
                                        {categoryTags}
                                    </div>
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
        </li>

    )
}

export default NewEvent
