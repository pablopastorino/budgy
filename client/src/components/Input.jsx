import React from 'react'

const Input = ({ name, onChange, error, value, type = 'text' }) => {
	const label = () =>
		name.includes('Name') ? name.split('Name')[0] + ' Name' : name

	return (
		<div className='flex flex-col w-3/4 sm:w-2/3 lg:w-1/2'>
			<label
				className='text-xl font-medium ml-2 capitalize'
				htmlFor='title'
			>
				{label()}
			</label>
			<input
				type={name === 'password' ? 'password' : type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				className='appearance-none focus:outline-none h-10 rounded-3xl mt-1 px-6 text-md sm:text-lg text-sky-900'
				// className={error && !value ? 'error' : ''}
				autoComplete='off'
			/>
		</div>
	)
}

export default Input
