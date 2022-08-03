import React from 'react'
import { Link } from 'react-router-dom'

const NewTransaction = () => {
	return (
		<Link
			to={'/new'}
			className='absolute right-4 bottom-4 bg-gray-900 text-white w-20 h-20 flex items-center justify-center rounded-full font-extrabold'
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-12 w-12'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={4}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M12 4v16m8-8H4'
				/>
			</svg>
		</Link>
	)
}

export default NewTransaction
