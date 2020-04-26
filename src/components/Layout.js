import React from 'react'

import '../styles/index.scss'

export default ({ children }) => {
	return (
		<div className="container-fluid h-100">
			{children}
		</div>
	)
}