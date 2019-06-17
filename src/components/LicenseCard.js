
import React from 'react'
import PropTypes from 'prop-types'

const LicenseCard = ({ license, onOpenLicense }) => {
  return (
    <div className='col-xs-12 col-sm-6 col-md-4'>
      <div className='card'>
        <div className='card-body'>
          <h4 className='card-title'>{license.spdx_id}</h4>
          <p className='card-text'>{license.name}</p>
          <a
            href={license.key}
            className='btn btn-outline-primary'
            onClick={(e) => onOpenLicense(e, license)}
          >
            Details
          </a>
        </div>
      </div>
    </div>
  )
}

LicenseCard.propTypes = {
  onOpenLicense: PropTypes.func.isRequired
}

LicenseCard.defaultPRops = {
  onOpenLicense: () => {}
}

export default LicenseCard
