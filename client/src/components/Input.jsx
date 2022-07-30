import React from 'react'

const Input = ({ name, onChange, error, value, type = 'text' }) => {
	return (
		<>
			<label htmlFor='title'>{name}</label>
			<input
				type={name === 'password' ? 'password' : type}
				id={name}
				name={name}
				value={value}
				onChange={onChange}
				className={error && !value ? 'error' : ''}
			/>
		</>
	)
}

export default Input
