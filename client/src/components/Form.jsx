import React from 'react'
import Input from './Input'

const Form = ({
	data,
	error,
	onChange,
	onSubmit,
	title,
	className,
	isLoading = false
}) => {
	return (
		<form className={className} onSubmit={onSubmit}>
			<h3>{title}</h3>
			{Object.keys(data).map(input => (
				<Input
					key={input}
					name={input}
					value={data[input]}
					error={error[1].includes(input)}
					onChange={onChange}
				/>
			))}
			<button disabled={isLoading}>{title.split(' ')[0]}</button>
			{error[0] && <div className='error'>{error}</div>}
		</form>
	)
}

export default Form
