import React from 'react'
import { useTransactionsContext } from '../hooks/useTransactionsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useState } from 'react'
import Form from '../components/Form'
import { useNavigate } from 'react-router-dom'

const TransactionForm = () => {
	const { dispatch } = useTransactionsContext()
	const { user } = useAuthContext()
	const navigate = useNavigate()

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
			navigate('/', { replace: true })
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
			title='Add Transaction'
			className='h-5/6 sm:h-full bg-sky-200 rounded-3xl w-5/6 sm:w-3/4 lg:w-2/4 flex flex-col justify-around items-center py-5 sm:py-2 sm:my-4'
			data={transaction}
			error={[error, emptyFields]}
			onChange={handleChange}
			onSubmit={handleSubmit}
		/>
	)
}

export default TransactionForm
