import React from 'react'
import Select from 'react-select'

const CategoryInput = ({ categories, onChange, value }) => {
	return (
		<div className='flex flex-col w-3/4 sm:w-2/3 lg:w-1/2'>
			<label
				htmlFor='categories'
				className='text-xl font-medium ml-2 capitalize'
			>
				Category
			</label>
			<div className='pr-4 bg-white capitalize appearance-none focus:outline-none h-10 pl-2 rounded-3xl mt-1 text-sky-900'>
				<Select
					placeholder='Select Option'
					classNamePrefix={'category'}
					value={value}
					options={categories}
					onChange={onChange}
					getOptionLabel={e => (
						<div
							style={{ display: 'flex', alignItems: 'center' }}
							className='capitalize appearance-none focus:outline-none h-10 pl-2 rounded-3xl mt-1 text-sky-900'
						>
							{e.icon}
							<span
								style={{ marginLeft: 5 }}
								className='capitalize'
							>
								{e.text}
							</span>
						</div>
					)}
				/>
			</div>
		</div>
	)
}

export default CategoryInput
