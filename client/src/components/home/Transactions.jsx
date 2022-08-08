import React from 'react'
import TransactionDetails from './TransactionDetails'
import { useTransactionsContext } from '../../hooks/useTransactionsContext'

const Transactions = () => {
	const { transactions } = useTransactionsContext()

	return (
		<div className='px-4 flex flex-col overflow-y-auto overflow-x-hidden flex-1'>
			{transactions &&
				transactions.map((t, i) => <TransactionDetails key={i} transaction={t} />)}
		</div>
	)
}

export default Transactions
