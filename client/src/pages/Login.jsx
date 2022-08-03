import React, { useState } from 'react'

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
		<div className='h-full w-full flex items-center flex-col'>
			<h1 className='text-3xl text-center '>
				<span className='inline-block'>It's your money:</span>
				<span className=' inline-block bg-orange-400 rounded-lg px-1 text-white'>
					Make it count!
				</span>
			</h1>
			<Form
				data={data}
				error={[error, []]}
				isLoading={isLoading}
				className='m-auto bg-sky-300 rounded-3xl h-3/4 w-5/6 sm:w-3/4 lg:w-2/4 flex flex-col justify-around items-center py-10 sm:py-2'
				onChange={handleChange}
				onSubmit={handleSubmit}
				title='Login'
				message={["Don't have an account?", 'Signup']}
			/>
		</div>
	)
}

export default Login
