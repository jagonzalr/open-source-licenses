require('dotenv').config()
const path = require('path')
const axios = require('axios')

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const GITHUB_LICENCE_API = 'https://api.github.com/licenses'
const get = endpoint => axios(endpoint, {
	method: 'GET',
	headers: { Authorization: `token ${GITHUB_TOKEN}` }
})

const getLicences = async () => {
	const { data } = await get(GITHUB_LICENCE_API)
	const licences = await Promise.all(data.map(async licence => {
		const detail = await get(`${GITHUB_LICENCE_API}/${licence.key}`)
		return detail.data
	}))

	return orderLicenses(licences)
}

const orderLicenses = licences => {
  return licences.sort((a, b) => {
    if (a.spdx_id > b.spdx_id) return 1
    if (a.spdx_id < b.spdx_id) return -1
    return 0
  })
}

exports.createPages = async ({ actions: { createPage } }) => {
	const licencesTemplate = path.resolve('./src/templates/licences.js')
  const licenceTemplate = path.resolve('./src/templates/licence.js')
  const licences = await getLicences()

  createPage({
    path: `/`,
    component: licencesTemplate,
    context: { licences }
  })

  licences.forEach(licence => {
  	createPage({
	    path: `/licence/${licence.key}`,
	    component: licenceTemplate,
	    context: { licence }
	  })
  })
}