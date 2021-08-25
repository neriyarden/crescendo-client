import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { useField } from 'formik'

function TextInput2(props) {
    const [field, meta] = useField(props)

    return (
        <>
            <div className='text-input-2'>
                <label htmlFor={props.id || props.name}>
                    {props.label}:
                    </label>
                <input
                    type='text'
                    {...field}
                    {...props}
                    />
                <FontAwesomeIcon icon={faPen} size='sm' />
            </div>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ): null}
        </>
    )
}

export default TextInput2
