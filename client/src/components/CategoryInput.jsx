import React from 'react'
import Select from 'react-select'
import { categoryIcons } from '../utils/categories'

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
							{categoryIcons[e.name]}
							<span
								style={{ marginLeft: 5 }}
								className='capitalize'
							>
								{e.name}
							</span>
						</div>
					)}
				/>
			</div>
		</div>
	)
}

export default CategoryInput
