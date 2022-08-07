import React from 'react'

const RadioInput = ({ score, onChange, selected }) => {
	return (
		<label
			className={`${
				selected ? 'text-sky-900' : 'text-white'
			} text-5xl hover:bg-white hover:text-sky-300 rounded-full fsocus:outline-none transition-all`}
			htmlFor={score.id}
		>
			<input
				type='radio'
				id={score.id}
				name='score'
				value={score.id}
				onChange={onChange}
				className='hidden'
			/>
			{score.icon}
		</label>
	)
}

const ScoreInput = ({ scores, onChange, selected }) => {
	return (
		<div className='flex flex-col w-3/4 sm:w-2/3 mt-4'>
			<label className='text-xl font-medium ml-2 capitalize' htmlFor='title'>
				Score
			</label>
			<div className=' font-3xl flex items-center justify-evenly appearance-none focus:outline-none h-10 rounded-3xl mt-1 px-6 text-2xl text-white'>
				{scores.map(s => (
					<RadioInput
						key={s.id}
						score={s}
						onChange={onChange}
						selected={s.id === +selected}
					/>
				))}
			</div>
		</div>
	)
}

export default ScoreInput
