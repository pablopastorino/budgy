const formatter = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
	minimumFractionDigits: 0
})

const getBalance = transactions => {
	let balance = 0
	if (transactions && transactions.length)
		balance = transactions.reduce((prev, curr) => prev + Number(curr.ammount), 0)
	return balance
}

module.exports = {
	formatter,
	getBalance
}
