import React from 'react'
import TransactionDetails from './TransactionDetails'
import { useCategoriesContext } from '../hooks/useCategoryContext'

const Transactions = ({ data }) => {
	const { categories } = useCategoriesContext()

	return (
		<div className='flex-grow px-4 pt-2 mb-4 w-full flex flex-col overflow-y-auto overflow-x-hidden'>
			{data &&
				data.map(t => (
					<TransactionDetails key={t.id} transaction={t} />
				))}
		</div>
	)
}

export default Transactions
