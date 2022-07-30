import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTransactionsContext } from '../hooks/useTransactionsContext'

const TransactionDetails = ({ transaction }) => {
	const { dispatch } = useTransactionsContext()
	const { user } = useAuthContext()

	const handleClick = async () => {
		if (!user) return

		const response = await fetch('/api/transactions/' + transaction.id, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		})
		const json = await response.json()

		if (response.ok) {
			dispatch({ type: 'DELETE_TRANSACTION', payload: json })
		}
	}
	const {
		ammount,
		registraton_date: date,
		score,
		concept,
		category
	} = transaction
	return (
		<div className='transaction-details'>
			<span>{ammount}</span>
			<span>{date}</span>
			<span>{score}</span>
			<span>{concept}</span>
			<span>{category}</span>
			<button onClick={handleClick}>delete</button>
		</div>
	)
}

export default TransactionDetails
