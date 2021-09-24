import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'

function ErrorFallback({ errorMsg }) {
	const refreshPage = () => {
		window.location.reload(false)
	}
	return (
		<div role='alert' className={'error-fallback'}>
			<h1>oops.. 😕</h1>
			<h2>Something went wrong.</h2>
			<pre>{errorMsg}</pre>
			<p>
				Sorry for the inconvenience, Our team has been notified about
				this and will fix the problem ASAP.
			</p>
			<p>Please try again later.</p>
			<button className='refresh-btn' onClick={refreshPage}>
				<FontAwesomeIcon icon={faRedoAlt} />
			</button>
		</div>
	)
}

export default ErrorFallback
