import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
	const [error, setError] = useState(null)
	const [isLoading, setIsLoading] = useState(null)
	const { dispatch } = useAuthContext()

	const signup = async (firstName, lastName, email, password) => {
		setIsLoading(true)
		setError(null)

		const response = await fetch('/api/user/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ firstName, lastName, email, password })
		})

		const json = await response.json()

		if (!response.ok) {
			const existingEmail = 'Email already exists, login!'
			setError(
				json.error.startsWith('Duplicate') ? existingEmail : json.error
			)
			setIsLoading(false)
		}

		if (response.ok) {
			localStorage.setItem('user', JSON.stringify(json))
			dispatch({ type: 'LOGIN', payload: { ...json } })
			setIsLoading(false)
		}
	}

	return { signup, isLoading, error }
}
