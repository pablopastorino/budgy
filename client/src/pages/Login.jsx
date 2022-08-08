import React, { useState } from 'react'

import Form from '../components/common/Form'

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
		<div className='w-full flex flex-col items-center'>
			<h1 className='gap-2 text-3xl flex-1 flex flex-col sm:flex-row items-center justify-center'>
				<span>It's your money:</span>
				<span className='bg-orange-400 rounded-lg px-1 text-white'>Make it count!</span>
			</h1>
			<Form
				data={data}
				error={[error, []]}
				isLoading={isLoading}
				className='bg-gradient-to-tr from-blue-200 to-blue-300 rounded-3xl h-3/4 w-5/6 sm:w-3/4 md:w-7/12 lg:w-5/12 flex flex-col justify-around items-center py-10 sm:py-2'
				onChange={handleChange}
				onSubmit={handleSubmit}
				title='Login'
				message={["Don't have an account?", 'Signup']}
			/>
		</div>
	)
}

export default Login
