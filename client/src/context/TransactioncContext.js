import { createContext, useReducer } from 'react'

export const TransactionsContext = createContext()
TransactionsContext.displayName = 'TransactionsContext'

const transactionsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_TRANSACTIONS':
			return {
				transactions: action.payload
			}
		case 'CREATE_TRANSACTION':
			return {
				transactions: [action.payload, ...state.transactions]
			}
		case 'DELETE_TRANSACTION':
			return {
				transactions: state.transactions.filter(
					w => w.id !== action.payload.id
				)
			}
		default:
			return state
	}
}

export const TransactionsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(transactionsReducer, {
		transactions: null
	})

	return (
		<TransactionsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</TransactionsContext.Provider>
	)
}
