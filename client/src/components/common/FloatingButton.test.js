import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import FloatingButton from './FloatingButton'

describe('FloatingButton', () => {
	const children = 'Test'
	const to = '/testurl'

	it('Should render without crashing', () => {
		render(
			<BrowserRouter>
				<FloatingButton to={to}>{children}</FloatingButton>
			</BrowserRouter>
		)
		const element = screen.getByText(/test/i)

		expect(element).toBeDefined()
	})

	it('Should have the href attribute', () => {
		render(
			<BrowserRouter>
				<FloatingButton to={to}>{children}</FloatingButton>
			</BrowserRouter>
		)

		const element = screen.getByRole('link')
		expect(element).toHaveAttribute('href', to)
	})
})
