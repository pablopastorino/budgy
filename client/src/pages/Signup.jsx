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
		<div className='flex items-center flex-col md:flex-row-reverse'>
			<h1 className='my-4 text-3xl text-center '>
				<span className='inline-block'>It's your money:</span>
				<span className=' inline-block bg-orange-400 rounded-lg px-1 text-white'>
					Make it count!
				</span>
			</h1>
			<Form
				data={data}
				error={[error, []]}
				isLoading={isLoading}
				onChange={handleChange}
				onSubmit={handleSubmit}
				title='Signup'
				className='m-auto bg-gradient-to-tr from-blue-200 to-blue-300  rounded-3xl w-5/6 sm:w-3/4 lg:w-3/4 flex flex-col justify-around items-center py-5 sm:py-2 sm:my-4'
				message={['Have an account?', 'Login']}
			/>
		</div>
	)
}

export default Signup
