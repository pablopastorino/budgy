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
		<>
			<Form
				data={data}
				error={[error, []]}
				isLoading={isLoading}
				className='bg-sky-300 rounded-3xl h-3/4 w-5/6 sm:w-3/4 lg:w-2/4 flex flex-col justify-around items-center py-10 sm:py-2'
				onChange={handleChange}
				onSubmit={handleSubmit}
				title='Login'
				message={["Don't have an account?", 'Signup']}
			/>
		</>
	)
}

export default Login
