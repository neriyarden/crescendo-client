import React from 'react'
import { Link } from 'react-router-dom'

const FormFooterText = ({ text, linkText, linkHref }) => {
	return (
		<p className='form-end-text'>
			{text + ' '}
			<Link to={linkHref}>{linkText}</Link>
		</p>
	)
}

export default FormFooterText
