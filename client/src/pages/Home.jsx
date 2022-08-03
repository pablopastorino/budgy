import React from 'react'
import { useEffect } from 'react'
import Balance from '../components/Balance'
import NewTransaction from '../components/NewTransaction'
// import TransactionForm from '../components/TransactionForm'
import Transactions from '../components/Transactions'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTransactionsContext } from '../hooks/useTransactionsContext'

const Home = () => {
	const { transactions, dispatch } = useTransactionsContext()
	const { user } = useAuthContext()

	useEffect(() => {
		const fetchTransactions = async () => {
			const response = await fetch('/api/transactions', {
				headers: { Authorization: `Bearer ${user.token}` }
			})
			const { transactions } = await response.json()
			console.log(transactions)
			if (response.ok)
				dispatch({ type: 'SET_TRANSACTIONS', payload: transactions })
		}

		if (user) fetchTransactions()
	}, [dispatch, user])
	return (
		<div className='h-full w-full flex flex-col'>
			<Balance data={transactions} />
			<Transactions data={transactions} />
			<NewTransaction />
		</div>
	)
}

export default Home
