const app = require('express')()
require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const trantactionRoutes = require('./routes/transactionsRoutes')
const categoriesRoutes = require('./routes/categoriesRoutes')

app.use('/api/user', userRoutes)
app.use('/api/transactions', trantactionRoutes)
app.use('/api/categories', categoriesRoutes)

app.listen(process.env.PORT, () =>
	console.log(`Listening for requests in port ${process.env.PORT}`)
)
