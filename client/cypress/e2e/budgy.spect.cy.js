describe('Budgy App', () => {
	beforeEach(() => {
		cy.visit('http://localhost:3000')
	})

	it('Renders frontpage', () => {
		cy.contains('Login')
	})

	it('Shows Signup Button', () => {
		cy.contains('Signup').click()
		// cy.get('input:first').type('Cypress')
		// cy.get('input').eq(1).type('e2e')
		// cy.get('label[for=email]+input').type('cypress@mail.com')
		// cy.get('input').last().type('cypress')
		// cy.get('form > button').click()
	})

	it('Logs the user', () => {
		cy.contains('Login').click()
		cy.get('input[name=email]').type('cypress@mail.com')
		cy.get('input[name=password]').type('cypress')
		cy.get('form > button').click()
		cy.contains('Cypress')
	})
})

describe('Once Logged In', () => {
	beforeEach(() => {
		cy.contains('Login').click()
		cy.get('input[name=email]').type('cypress@mail.com')
		cy.get('input[name=password]').type('cypress')
		cy.get('form > button').click()
		cy.contains('Cypress')
	})

	it('Allow to create a new transaction', () => {
		cy.get('input[name=category]').click()
	})
})
