import React from 'react'
import { useField } from 'formik'

const FormCheckbox = props => {
	const [field] = useField({ ...props, type: 'checkbox' })

	return (
		<div className={`${props.name}-group`}>
			<input
				type='checkbox'
				{...field}
				{...props}
				name={props.name}
				className={`${props.name}-checkbox`}
				checked={field.value}
			/>
			<label htmlFor={props.name} className={`${props.name}-label`}>
				{props.label}
			</label>
		</div>
	)
}

export default FormCheckbox
