import React from 'react'

function TextBtn({ text, type, clickHandler, disabled, style }) {
    const onBtnClick = ({ target: { value }}) => {
        clickHandler(value)
    }
    
    return (
        <button
            className='form-button'
            type={type}
            onClick={clickHandler && onBtnClick}
            disabled={disabled}
        >
            <span>{text}</span>
        </button>
    )
}

export default TextBtn