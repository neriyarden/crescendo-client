import React from 'react'

function ErrorFallback({ errorMsg }) {
	return (
		<div role='alert' className={'error-fallback'}>
			<h1>404 😕</h1>
			<h2>Something went wrong.</h2>
			<pre>{errorMsg}</pre>
			<p>
				Sorry for the inconvenience, The admin has been notified about
				this issue. Please try again later.
			</p>
		</div>
	)
}

export default ErrorFallback
