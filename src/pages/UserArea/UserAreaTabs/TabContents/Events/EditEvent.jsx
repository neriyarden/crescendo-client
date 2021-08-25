import React, { useState, useEffect } from 'react'
import TextInput2 from '../../../../../components/General/Inputs/TextInput2/TextInput2'
import UploadBtn from '../../../../../components/General/Inputs/UploadBtn/UploadBtn'
import { Formik, Form, Field } from 'formik';
import validations from '../../../../../validations'
import TextBtn from '../../../../../components/General/Inputs/TextBtn/TextBtn'
import utils from '../../../../../utils';

function EditEvent({ event, onEditHandler, setEditShowForm, errMsg }) {
    const [categories, setCategories] = useState([])
    const getCategories = async () => {
        const tags = await utils.getTags()
        console.log('tagssss:', tags);
        setCategories(
            tags.map(tag => ({
                ...tag,
                checked: event.tags.find(eventTag => tag.id === eventTag.tag_id)
            }))
        )
    }

    const categoryTags = categories.map((tag, i) => (
        <label className='tag-label' key={i}>
            <Field
                className='tag-checkbox'
                type="checkbox"
                name="tags"
                value={'' + tag.id}
            />
            {tag.name}
        </label>
    ))

    useEffect(() => {
        getCategories()
    }, [])


    return (
        <div className='new-event'>
            <div className="new-event-form">
                <Formik
                    initialValues={{
                        tour: event.tour,
                        date: utils.formatDDMMYYYToYYYYMMDD(event.date),
                        time: event.time,
                        duration: event.duration,
                        venueName: event.venue,
                        cityName: event.city,
                        description: event.description,
                        ticketseller_url: event.ticketseller_url,
                        tags: categories.filter(category => category.checked)
                            .map(category => '' + category.id)
                    }}

                    validationSchema={validations.event}

                    onSubmit={(values, { setSubmitting }) => {
                        onEditHandler(values)
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
                                label='Date'
                                name='date'
                                type='date'
                            />
                            <TextInput2
                                label='time'
                                name='time'
                                type='time'
                            />
                            <TextInput2
                                label='duration (min)'
                                name='duration'
                                type='number'
                            />
                            <TextInput2
                                label='Venue'
                                name='venueName'
                            />
                            <TextInput2
                                label='City'
                                name='cityName'
                            />
                            <TextInput2
                                label='Description'
                                name='description'
                                type='textarea'
                            />
                            <TextInput2
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
                                    text='Edit'
                                    type='submit'
                                    disabled={isSubmitting || !dirty}
                                />
                                <TextBtn
                                    text='Cancel'
                                    clickHandler={() => setEditShowForm(false)}
                                />
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>

    )
}

export default EditEvent





