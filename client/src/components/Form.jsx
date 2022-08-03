import React from 'react'
import Input from './Input'
import { Link } from 'react-router-dom'

const Form = ({
	data,
	error,
	onChange,
	onSubmit,
	title,
	className,
	isLoading = true,
	message = []
}) => {
	return (
		<form className={className} onSubmit={onSubmit}>
			<h3 className='font-extrabold text-4xl text-white'>{title}</h3>
			{Object.keys(data).map(input => (
				<Input
					key={input}
					name={input}
					value={data[input]}
					error={error[1].includes(input)}
					onChange={onChange}
				/>
			))}
			{error[0] && (
				<div className='text-rose-500 font-medium'>{error}</div>
			)}
			<button
				className='bg-orange-300 px-14 py-2 rounded-xl font-semibold mt-2'
				disabled={isLoading}
			>
				{title.split(' ')[0]}
			</button>
			{message.length && (
				<span className='mb-4 mr-4'>
					{message[0]} &nbsp;
					<Link
						className='font-semibold'
						to={`/${message[1].toLowerCase()}`}
					>
						{message[1]}
					</Link>
				</span>
			)}
		</form>
	)
}

export default Form
