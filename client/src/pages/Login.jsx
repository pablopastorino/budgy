import React from 'react'
import { useState } from 'react'
import Form from '../components/Form'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
	const [data, setData] = useState({ email: '', password: '' })
	const { login, isLoading, error } = useLogin()

	const handleChange = e => {
		setData({ ...data, [e.target.name]: e.target.value })
	}

	const handleSubmit = async e => {
		e.preventDefault()
		await login(data.email, data.password)
	}

	return (
		<Form
			data={data}
			error={[error, []]}
			isLoading={isLoading}
			className='login'
			onChange={handleChange}
			onSubmit={handleSubmit}
			title='Login'
		/>
	)
}

export default Login
