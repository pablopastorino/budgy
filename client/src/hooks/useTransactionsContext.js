import { useContext } from 'react'
import { TransactionsContext } from '../context/TransactioncContext'

export const useTransactionsContext = () => {
	const context = useContext(TransactionsContext)
	if (!context)
		throw Error(
			'useTransactionsContext must be used inside TransactionsContextProvider'
		)
	return context
}
