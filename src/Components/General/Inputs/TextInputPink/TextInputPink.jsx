import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAt, faKey, faFont } from '@fortawesome/free-solid-svg-icons'
import { useField } from 'formik'

const TextInputPink = (props) => {
    const [field, meta] = useField(props)
    const icons = {
        text: faFont,
        email: faAt,
        password: faKey,
        repeat_password: faKey,
    }

    let subtexts = props.subtexts || []
    subtexts = subtexts.map((text, i) => (
        <small key={i}><span>* </span>{text}</small>
    ))

    return (
        <div className='form-input-group-container'>
            <div className='form-input-group'>
                <label
                    className="general-input-label"
                    htmlFor={props.id || props.name}
                >
                    {props.label}
                    <span>{subtexts.length > 0 ? '*' : ''}</span>
                    :
                </label>
                <div className='general-input'>
                    <label
                        className="general-input-icon"
                    // htmlFor={props.id || props.name}
                    >
                        {
                            icons[props.name] &&
                            <FontAwesomeIcon icon={icons[props.name]} />
                        }
                    </label>
                    <input
                        className='general-input-field'
                        type='text'
                        placeholder={props.placeholder || `Enter your ${props.label}`}
                        {...field}
                        {...props}
                    />
                </div>
            </div>
            <div className="subtexts">
                {subtexts || ''}
            </div>
            {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null}
        </div>
    )
}

export default TextInputPink
