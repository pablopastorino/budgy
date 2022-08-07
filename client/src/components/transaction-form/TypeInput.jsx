import React from 'react'

const TypeInput = ({ checked, onChange }) => {
	return (
		<div className='flex flex-col flex-wrap mt-2 w-3/4 sm:w-2/3'>
			<label className='text-xl font-medium ml-2 capitalize' htmlFor='title'>
				Type
			</label>
			<div className='flex'>
				<div className='flex items-center mt-1 flex-grow'>
					<label
						htmlFor='income'
						className={`h-10 flex items-center justify-center w-full text-lg font-medium capitalize px-2 py-1 rounded-l-3xl ${
							checked === 'income'
								? 'bg-gray-900 text-white'
								: 'text-gray-900 bg-white'
						}`}
					>
						<input
							id='income'
							type='checkbox'
							value='income'
							name='type'
							className='hidden'
							onChange={onChange}
							checked={checked === 'income'}
						/>
						Income
					</label>
				</div>
				<div className='flex items-center mt-1 flex-grow'>
					<label
						htmlFor='expense'
						className={`h-10 flex items-center justify-center w-full text-lg font-medium capitalize px-2 py-1 rounded-r-3xl ${
							checked === 'expense'
								? 'bg-gray-900 text-white'
								: 'text-gray-900 bg-white'
						}`}
					>
						<input
							checked={checked === 'expense'}
							id='expense'
							type='checkbox'
							value='expense'
							name='type'
							className='hidden'
							onChange={onChange}
						/>
						Expense
					</label>
				</div>
			</div>
		</div>
	)
}

export default TypeInput
