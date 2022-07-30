import React from 'react'
import { useTransactionsContext } from '../hooks/useTransactionsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import Form from './Form'

const TransactionForm = () => {
	const { dispatch } = useTransactionsContext()
	const { user } = useAuthContext()

	const [transaction, setTransaction] = useState({
		date: '',
		concept: '',
		ammount: '',
		category: '',
		score: ''
	})
	const [error, setError] = useState(null)
	const [emptyFields, setEmptyFields] = useState([])

	const handleSubmit = async e => {
		e.preventDefault()

		if (!user) {
			setError('You must be logged in')
			return
		}

		const response = await fetch('/api/transactions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`
			},
			body: JSON.stringify(transaction)
		})

		const json = await response.json()
		const { insertId: id } = json
		console.log(json)

		if (!response.ok) {
			setError(json.error)
			setEmptyFields(json.emptyFields)
		} else {
			dispatch({
				type: 'CREATE_TRANSACTION',
				payload: {
					id,
					date: transaction.date,
					concept: transaction.concept,
					ammount: transaction.ammount,
					category: transaction.category,
					score: transaction.score
				}
			})
			setTransaction({
				date: '',
				concept: '',
				ammount: '',
				category: '',
				score: ''
			})
			setError(null)
			setEmptyFields([])
		}
	}

	const handleChange = e => {
		setTransaction(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	return (
		<Form
			title='Add a transaction'
			className='create'
			data={transaction}
			error={[error, emptyFields]}
			onChange={handleChange}
			onSubmit={handleSubmit}
		/>
	)
}

export default TransactionForm
