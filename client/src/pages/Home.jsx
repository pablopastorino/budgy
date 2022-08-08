import React, { useEffect } from 'react'
import Transactions from '../components/home/Transactions'
import Balance from '../components/home/Balance'
import FloatingButton from '../components/common/FloatingButton'
import { PlusIcon } from '../assets/PlusIcon'

import { useAuthContext } from '../hooks/useAuthContext'
import { useCategoriesContext } from '../hooks/useCategoryContext'
import { useTransactionsContext } from '../hooks/useTransactionsContext'

const Home = () => {
	const { user } = useAuthContext()
	const { setCategories } = useCategoriesContext()
	const { dispatch } = useTransactionsContext()

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
		<div className='flex flex-col sm:flex-row w-full justify-evenly'>
			<Balance />
			<Transactions />
			<FloatingButton to='/new'>
				<PlusIcon />
			</FloatingButton>
		</div>
	)
}

export default Home
