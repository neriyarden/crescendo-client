import React from 'react'
import { useField } from 'formik'


function Toggle(props) {
    const [field, meta] = useField({ ...props, type: 'radio' });

    return (
        <label className='toggle-btn'>
            <input {...field} {...props} type="radio"/>
            <span >{props.label}</span>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </label>
    )
}

export default Toggle
