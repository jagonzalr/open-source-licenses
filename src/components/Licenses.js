
import React from 'react'
import PropTypes from 'prop-types'

import LicenseCard from './LicenseCard'

const orderLicenses = licenses => {
  return licenses.sort((a, b) => {
    if (a.spdx_id > b.spdx_id) return 1
    if (a.spdx_id < b.spdx_id) return -1
    return 0
  })
}

const Licenses = ({ licenses, onOpenLicense }) => {
  return (
    <div className='row'>
      {licenses.length > 0 && orderLicenses(licenses).map((license) =>
        <LicenseCard
          key={license.key}
          license={license}
          onOpenLicense={onOpenLicense}
        />
      )}
    </div>
  )
}

Licenses.propTypes = {
  licenses: PropTypes.array.isRequired,
  onOpenLicense: PropTypes.func.isRequired
}

Licenses.defaultProps = {
  licenses: [],
  onOpenLicense: () => {}
}

export default Licenses
