import React from 'react'
import { Link } from 'react-router-dom'

const BackButton = () => {
	return (
		<Link
			to={'/'}
			className='shadow-3xl absolute left-4 bottom-4 bg-gray-900 text-white w-20 h-20 flex items-center justify-center rounded-full font-extrabold'
		>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				className='h-6 w-6'
				fill='none'
				viewBox='0 0 24 24'
				stroke='currentColor'
				strokeWidth={2}
			>
				<path
					strokeLinecap='round'
					strokeLinejoin='round'
					d='M10 19l-7-7m0 0l7-7m-7 7h18'
				/>
			</svg>
		</Link>
	)
}

export default BackButton
