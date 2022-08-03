import React from 'react'

const Balance = ({ data }) => {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0
	})

	return (
		<div className='rounded-3xl h-36 mt-4 mx-4 px-6 text-white bg-gray-900 flex justify-between'>
			<span className='text-4xl flex items-center content-center'>
				{formatter.format(
					data?.length
						? data?.reduce((prev, curr) => prev + +curr.ammount, 0)
						: 0
				)}
			</span>
			<span className='flex items-center content-center text-sky-300'>
				USD
			</span>
		</div>
	)
}

export default Balance
