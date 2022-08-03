import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AuthContextProvider } from './context/AuthContext'
import { TransactionsContextProvider } from './context/TransactioncContext'
import { CategoriesContextProvider } from './context/CategoryContext'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<AuthContextProvider>
			<TransactionsContextProvider>
				<CategoriesContextProvider>
					<App />
				</CategoriesContextProvider>
			</TransactionsContextProvider>
		</AuthContextProvider>
	</React.StrictMode>
)
