import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'

export default ({ pageContext: { licences } }) => {
	return (
		<Layout>
			<div className='row'>
	      <div
	      	style={{
	      		margin: '0 auto',
				    padding: '35px 10px 35px 10px'
	      	}}
	      >
	      	<div className='col-xs-12 mx-auto text-center'>
	        	<h3 className='ops__main-underline px-2'>
	        		Open Source Licences
	        	</h3>
	        </div>
	      </div>
	    </div>
	    <div className='row px-4'>
	    	{licences.map(licence =>
	    		<div className='col-xs-12 col-sm-6 col-md-4' key={licence.key}>
			      <div className='card mb-3'>
			        <div className='card-body'>
			          <h4 className='card-title'>{licence.spdx_id}</h4>
			          <p className='card-text'>{licence.name}</p>
			          <Link to={`/licence/${licence.key}`} className='btn btn-outline-primary'>Details</Link>
			        </div>
			      </div>
			    </div>
	    	)}
	    </div>
		</Layout>
	)
}
