import React from 'react'

const TextBtn = ({ text, type, clickHandler, disabled, style }) => {
	const onBtnClick = ({ target: { value } }) => {
		clickHandler(value)
	}
	return (
		<button
			className={disabled ? 'form-button disabled-btn' : 'form-button'}
			type={type}
			onClick={clickHandler && onBtnClick}
			disabled={disabled}
		>
			<span>{text}</span>
		</button>
	)
}

export default TextBtn
