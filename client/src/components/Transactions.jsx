import React from 'react'
import TransactionDetails from './TransactionDetails'
import { useTransactionsContext } from '../hooks/useTransactionsContext'

const Transactions = () => {
	const { transactions } = useTransactionsContext()
	return (
		<div className='flex-grow px-4 pt-2 mb-4 w-full flex flex-col overflow-y-auto overflow-x-hidden'>
			{transactions &&
				transactions.map((t, i) => (
					<TransactionDetails key={i} transaction={t} />
				))}
		</div>
	)
}

export default Transactions
