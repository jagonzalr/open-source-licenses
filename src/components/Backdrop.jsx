
'use strict'

import React from 'react'
import PropTypes from 'prop-types'

const Backdrop = ({ open, onCloseLicense }) => {
	return (
		<div
			style={{
		    background: 'rgba(38,38,38,.8)',
		    opacity: open ? 1 : 0,
		    animation: 'fade-in 1s ease',
		    minHeight: '100vh',
		    height: 'auto',
		    zIndex: open ? 1400 : -1,
		    position: 'fixed',
		    top: '0',
		    left: '0',
		    right: '0',
		    bottom: '0',
		    transition: `opacity ${open ? '0.15s' : '0s'} linear`
			}}
			onClick={onCloseLicense}
		/>
	)
}

Backdrop.displayName = 'Backdrop'
Backdrop.propTypes = {
	open: PropTypes.bool.isRequired,
	onCloseLicense: PropTypes.func.isRequired
}

Backdrop.defaultProps = {
	open: false,
	onCloseLicense: () => {}
}

export default Backdrop
