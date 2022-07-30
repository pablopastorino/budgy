import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import Form from '../components/Form'

const Signup = () => {
	const [data, setData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: ''
	})
	const { signup, error, isLoading } = useSignup()

	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		await signup(data.firstName, data.lastName, data.email, data.password)
	}

	return (
		<Form
			data={data}
			error={[error, []]}
			isLoading={isLoading}
			className={`signup`}
			onChange={handleChange}
			onSubmit={handleSubmit}
			title='Signup'
		/>
	)
}

export default Signup
