import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

const UploadBtn = (props) => {

    return (
        <>
            <div className='file-upload-btn'>
                <label htmlFor={props.id || props.name}>
                    {props.label}:
                </label>
                <input
                    defaultValue={props.initialValue}
                    type='file'
                    onChange={e => {
                        props.setFieldValue('newImg', e.currentTarget.files[0], false) // false is for skipping validation
                    }}
                    accept='image/*'
                />
                <FontAwesomeIcon icon={faPen} size='sm' />
            </div>
        </>
    )
}

export default UploadBtn
