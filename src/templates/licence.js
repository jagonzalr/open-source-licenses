import React from 'react'
import { Link } from 'gatsby'
import ReactMarkdown from 'react-markdown'

import Layout from '../components/Layout'
import closeSvg from '../images/close.svg'

export default ({ pageContext: { licence } }) => {
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
    width: '100%',
    transform: 'translateX(0px',
    background: '#FCFCFC'
  }
  
  return (
  	<Layout>
	    <div style={styles}>
	      <div
	        className='row sticky-top'
	        style={{
	          backgroundColor: '#FCFCFC',
	          padding: '35px 10px 35px 10px',
	        }}
	      >
	        <div className='col-xs-12 mx-auto text-center'>
	          <h3 className='ops__main-underline px-2'>{licence.name}</h3>
	          <Link
	          	to={'/'}
	          	style={{
	              position: 'absolute',
	              border: 'none',
	              right: '25px',
	              // top: '15px',
	              padding: '0',
	              margin: '0',
	              zIndex: '1500',
	              minWidth: '1px',
	              height: 'auto',
	              lineHeight: '1'
	            }}
	          >
	          	<img src={closeSvg} alt='Close' style={{width: '22px'}} />
	          </Link>
	        </div>
	      </div>

	      <div className='row px-4 pb-4'>
	        {licence.hasOwnProperty('key') &&
	          <div className='col-xs-12 col-md-5 order-1'>
	            <div className='card mb-3'>
	              <div className='card-body'>
	              	<div className='card-title'>
		                <h5 className='ops__main-underline'>
		                  Description
		                </h5>
		              </div>
	                <p className='card-text'>{licence.description}</p>
	              </div>
	            </div>
	            <div className='card mb-3'>
	              <div className='card-body'>
	              	<div className='card-title'>
	              		<h5 className='ops__main-underline'>
	                  	How to add this licence
	                	</h5>
	                </div>
	                <p className='card-text'>{licence.implementation}</p>
	              </div>
	            </div>

	            {licence.hasOwnProperty('html_url') &&
	             licence.html_url.length > 0 &&
	              <div className='card mb-3'>
	                <div className='card-body'>
	                  <a href={`${licence.html_url}`} target='blank'>
	                    {licence.html_url}
	                  </a>
	                </div>
	              </div>
	            }

	            {licence.hasOwnProperty('permissions') &&
	             licence.permissions.length > 0 &&
	              <div className='card mb-3'>
	                <div className='card-body'>
	                	<div className='card-title'>
		                  <h5 className='ops__main-underline green'>
		                    Permissions
		                  </h5>
		                </div>
		                <ul className='list-group list-group-flush'>
		                  {licence.permissions.map((permission) =>
		                    <li key={permission} className='list-group-item'>
		                      {permission}
		                    </li>
		                  )}
		                </ul>
	                </div>
	              </div>
	            }

	            {licence.hasOwnProperty('conditions') &&
	             licence.conditions.length > 0 &&
	              <div className='card mb-3'>
	                <div className='card-body'>
	                	<div className='card-title'>
	                  	<h6 className='ops__main-underline yellow'>
	                    	Conditions
	                  	</h6>
	                  </div>
	                  <ul className='list-group list-group-flush'>
		                  {licence.conditions.map((condition) =>
		                    <li key={condition} className='list-group-item'>
		                      {condition}
		                    </li>
		                  )}
	                </ul>
	                </div>
	              </div>
	            }

	            {licence.hasOwnProperty('limitations') &&
	             licence.limitations.length > 0 &&
	              <div className='card mb-3'>
	                <div className='card-body'>
	                  <div className='card-title'>
	                  	<h6 className='card-title ops__main-underline red'>
		                    Limitations
		                  </h6>
	                  </div>
	                  <ul className='list-group list-group-flush'>
		                  {licence.limitations.map((limitation) =>
		                    <li key={limitation} className='list-group-item'>
		                      {limitation}
		                    </li>
		                  )}
		                </ul>
	                </div>
	              </div>
	            }
	          </div>
	        }

	        {licence.hasOwnProperty('body') &&
	          <div className='col-xs-12 col-md-7 order-2'>
	            <div className='card'>
	              <div className='card-body'>
	                <ReactMarkdown source={licence.body} />
	              </div>
	            </div>
	          </div>
	        }
	      </div>
	    </div>
	  </Layout>
  )
}

