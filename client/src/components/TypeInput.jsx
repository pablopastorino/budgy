import React from 'react'

const TypeInput = ({ checked, onChange }) => {
	return (
		<div className='flex flex-col flex-wrap w-3/4 sm:w-2/3 lg:w-1/2 mt-2'>
			<label
				className='text-xl font-medium ml-2 capitalize'
				htmlFor='title'
			>
				Type
			</label>
			<div className='flex justify-center'>
				<div className='flex items-center mr-4'>
					<input
						id='income'
						type='radio'
						value='income'
						name='type'
						className='w-6 h-6'
						onChange={onChange}
						checked={checked === 'income'}
					/>
					<label
						htmlFor='income'
						className='ml-2 text-lg font-medium ml-2 capitalize text-lime-700'
					>
						Income
					</label>
				</div>
				<div className='flex items-center mr-4'>
					<input
						checked={checked === 'expense'}
						id='expense'
						type='radio'
						value='expense'
						name='type'
						className='w-6 h-6'
						onChange={onChange}
					/>
					<label
						htmlFor='expense'
						className='ml-2 text-lg font-medium ml-2 capitalize text-red-700'
					>
						Expense
					</label>
				</div>
			</div>
		</div>
	)
}

export default TypeInput
