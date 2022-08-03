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
			onChange={handleChange}
			onSubmit={handleSubmit}
			title='Signup'
			className='h-5/6 sm:h-full bg-sky-200 rounded-3xl w-5/6 sm:w-3/4 lg:w-2/4 flex flex-col justify-around items-center py-5 sm:py-2 sm:my-4'
			message={['Have an account?', 'Login']}
		/>
	)
}

export default Signup
