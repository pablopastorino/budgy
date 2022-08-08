import React, { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import Form from '../components/common/Form'

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
		<div className='w-full h-full overflow-y-scroll flex flex-col sm:flex-row-reverse sm:justify-evenly sm:items-start items-center gap-3'>
			<h1 className='flex flex-col flex-wrap items-center justify-center gap-2 text-3xl text-center sm:self-center'>
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
				className='my-auto w-11/12 sm:w-3/4 md:w-7/12 lg:w-5/12 bg-gradient-to-tr from-blue-200 to-blue-300 rounded-3xl flex flex-col justify-around items-center py-5'
				message={['Have an account?', 'Login']}
			/>
		</div>
	)
}

export default Signup
