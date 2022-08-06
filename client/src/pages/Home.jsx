import React, { useEffect } from 'react'
import Transactions from '../components/Transactions'
import Balance from '../components/Balance'
import NewTransaction from '../components/NewTransaction'

import { useAuthContext } from '../hooks/useAuthContext'
import { useCategoriesContext } from '../hooks/useCategoryContext'
import { useTransactionsContext } from '../hooks/useTransactionsContext'

const Home = () => {
	const { transactions, dispatch } = useTransactionsContext()
	const { setCategories } = useCategoriesContext()
	const { user } = useAuthContext()

	useEffect(() => {
		const getCategories = async () => {
			const response = await fetch('/api/categories', {
				headers: { Authorization: `Bearer ${user.token}` }
			})
			const json = await response.json()
			setCategories(json.categories)
		}

		getCategories()
	}, [setCategories, user.token])

	useEffect(() => {
		const fetchTransactions = async () => {
			const response = await fetch('/api/transactions', {
				headers: { Authorization: `Bearer ${user.token}` }
			})
			const { transactions } = await response.json()
			if (response.ok) dispatch({ type: 'SET_TRANSACTIONS', payload: transactions })
		}

		if (user) fetchTransactions()
	}, [dispatch, user])
	return (
		<div className='h-full w-full flex flex-col md:flex-row md:px-16'>
			<Balance data={transactions} />
			<Transactions />
			<NewTransaction />
		</div>
	)
}

export default Home
