
'use strict'

import React, { Component, Fragment } from 'react'
import Cache from '@aws-amplify/cache'

import Backdrop from './components/Backdrop'
import License from './components/License'
import Licenses from './components/Licenses'
import Title from './components/Title'

const DAY_IN_MILLISECONDS = 86400000
const GITHUB_LICENSE_API = 'https://api.github.com/licenses'
const config = { expires: DAY_IN_MILLISECONDS, keyPrefix: 'opensourcelicenses' }
const cache = Cache.createInstance(config)

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			currentLicense: {},
			licenseOpen: false,
			licenses: []
		}

		this.fetchLicense = this.fetchLicense.bind(this)
		this.fetchLicenses = this.fetchLicenses.bind(this)
		this.onCloseLicense = this.onCloseLicense.bind(this)
		this.onOpenLicense = this.onOpenLicense.bind(this)
	}

	componentDidMount() {
		this.fetchLicenses()
	}

	fetchLicense(licenseKey) {
		const license = cache.getItem(licenseKey)
		if (license) {
			this.setState((state, props) => {
				return { currentLicense: license }
			})
		} else {
			fetch(`${GITHUB_LICENSE_API}/${licenseKey}`)
			.then(response => response.json())
			.then(json => {
				cache.setItem(licenseKey, json)
				this.setState((state, props) => {
					return { currentLicense: json }
				})
			})
		}
	}

	fetchLicenses() {
		const licenses = cache.getItem('licenses')
		if (licenses) {
			this.setState((state, props) => {
				return { licenses }
			})
		} else {
			fetch(GITHUB_LICENSE_API)
			.then(response => response.json())
			.then(json => {
				cache.setItem('licenses', json)
				this.setState((state, props) => {
					return { licenses: json }
				})
			})
		}
	}

	onCloseLicense(e) {
		this.setState((state, props) => {
			return { licenseOpen: false, currentLicense: {} }
		})
	}

	onOpenLicense(e, license) {
		e.preventDefault()
		this.setState((state, props) => {
			return {
				licenseOpen: true,
				currentLicense: { name: license.name }
			}
		}, () => {
			this.fetchLicense(license.key)
		})
	}

	render() {
		return (
			<Fragment>
				<div className="container-fluid h-100">
					<Title />
					<Licenses
						licenses={this.state.licenses}
						onOpenLicense={this.onOpenLicense}
					/>
					<License
						license={this.state.currentLicense}
						open={this.state.licenseOpen}
						onCloseLicense={this.onCloseLicense}
					/>
				</div>
				<Backdrop
					open={this.state.licenseOpen}
					onCloseLicense={this.onCloseLicense}
				/>
			</Fragment>
		)
	}
}

export default App
