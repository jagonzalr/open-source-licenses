
import React from 'react'
import ReactMarkdown from 'react-markdown'

import closeSvg from '../assets/svg/close.svg'

const License = ({ license, open, onCloseLicense }) => {
  let styles = {
    position: 'fixed',
    top: '0',
    zIndex: '1500',
    maxWidth: '100%',
    marginTop: '0',
    overflowX: 'hidden',
    height: '100%',
    left: 'auto',
    right: '0px',
    width: '0',
    transform: 'translateX(100%)',
    background: '#ffffff'
  }

  if (open) {
    styles['transition'] = 'transform 0.3s ease-out, opacity 0.15s linear'
    styles['width'] = '70%'
    styles['transform'] = 'translateX(0px)'
  }
  
  return (
    <div style={styles}>
      <div
        className='row sticky-top'
        style={{
          backgroundColor: '#ffffff',
          padding: '10px 5px 20px 5px',
          zIndex: 2
        }}
      >
        <div className='col-xs-12 mx-auto'>
          <h4>{license.name}</h4>
          <button
            style={{
              position: 'absolute',
              border: 'none',
              right: '15px',
              top: '15px',
              padding: '0',
              margin: '0',
              zIndex: '1500',
              minWidth: '1px',
              height: 'auto',
              lineHeight: '1'
            }}
            onClick={onCloseLicense}
          >
            <img src={closeSvg} alt='Close' style={{width: '22px'}} />
          </button>
        </div>
      </div>

      <div
        className='row'
        style={{ padding: '10px 5px 20px 5px' }}
      >
        {license.hasOwnProperty('key') &&
          <div className='col-xs-12 col-md-6 order-1'>
            <div className='card'>
              <div className='card-header'>
                <h6 className='card-title ops__main-underline'>
                  Description
                </h6>
              </div>
              <div className='card-body'>
                <p>{license.description}</p>
              </div>
            </div>
            <div className='card'>
              <div className='card-header'>
                <h6 className='card-title ops__main-underline'>
                  How to add this license
                </h6>
              </div>
              <div className='card-body'>
                <p>{license.implementation}</p>
              </div>
            </div>

            {license.hasOwnProperty('html_url') &&
             license.html_url.length > 0 &&
              <div className='card'>
                <div className='card-body'>
                  <a href={`${license.html_url}`} target='blank'>
                    {license.html_url}
                  </a>
                </div>
              </div>
            }

            {license.hasOwnProperty('permissions') &&
             license.permissions.length > 0 &&
              <div className='card'>
                <div className='card-header'>
                  <h6 className='card-title ops__main-underline green'>
                    Permissions
                  </h6>
                </div>
                <ul className='list-group list-group-flush'>
                  {license.permissions.map((permission) =>
                    <li key={permission} className='list-group-item'>
                      {permission}
                    </li>
                  )}
                </ul>
              </div>
            }

            {license.hasOwnProperty('conditions') &&
             license.conditions.length > 0 &&
              <div className='card'>
                <div className='card-header'>
                  <h6 className='card-title ops__main-underline yellow'>
                    Conditions
                  </h6>
                </div>
                <ul className='list-group list-group-flush'>
                  {license.conditions.map((condition) =>
                    <li key={condition} className='list-group-item'>
                      {condition}
                    </li>
                  )}
                </ul>
              </div>
            }

            {license.hasOwnProperty('limitations') &&
             license.limitations.length > 0 &&
              <div className='card'>
                <div className='card-header'>
                  <h6 className='card-title ops__main-underline red'>
                    Limitations
                  </h6>
                </div>
                <ul className='list-group list-group-flush'>
                  {license.limitations.map((limitation) =>
                    <li key={limitation} className='list-group-item'>
                      {limitation}
                    </li>
                  )}
                </ul>
              </div>
            }
          </div>
        }

        {license.hasOwnProperty('body') &&
          <div className='col-xs-12 col-md-6 order-2'>
            <div className='card'>
              <div className='card-body'>
                <ReactMarkdown source={license.body} />
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default License

