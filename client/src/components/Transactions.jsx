import React from 'react'
import TransactionDetails from './TransactionDetails'

const Transactions = ({ data }) => {
	return (
		<div className='transactions'>
			{data &&
				data.map(t => (
					<TransactionDetails key={t.id} transaction={t} />
				))}
		</div>
	)
}

export default Transactions
