import { render, screen } from '@testing-library/react'
import App from './App'
import React from 'react'
import '@testing-library/jest-dom'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { AuthContextProvider } from './context/AuthContext'
import { TransactionsContextProvider } from './context/TransactioncContext'
import { CategoriesContextProvider } from './context/CategoryContext'

describe('App', () => {
	it('Renders full App', () => {
		render(
			<AuthContextProvider>
				<TransactionsContextProvider>
					<CategoriesContextProvider>
						<App />
					</CategoriesContextProvider>
				</TransactionsContextProvider>
			</AuthContextProvider>
		)

		expect(screen.getByText(/budgy/i)).toBeInTheDocument()
		const links = screen.getAllByRole('link')
	})

	it('Redirects to the signup page', async () => {
		render(
			<AuthContextProvider>
				<TransactionsContextProvider>
					<CategoriesContextProvider>
						<App />
					</CategoriesContextProvider>
				</TransactionsContextProvider>
			</AuthContextProvider>
		)

		const signupLinks = screen.getAllByText(/signup/i)
		await userEvent.click(signupLinks.pop())

		expect(screen.getByText(/first name/i)).toBeInTheDocument()
	})
})
