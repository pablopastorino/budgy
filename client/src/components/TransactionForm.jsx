import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NumberFormat from 'react-number-format'

import Input from '../components/Input'
import CategoryInput from './CategoryInput'
import ScoreInput from './ScoreInput'
import TypeInput from './TypeInput'
import BackButton from './BackButton'

import { useTransactionsContext } from '../hooks/useTransactionsContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useCategoriesContext } from '../hooks/useCategoryContext'

import { scores } from '../utils/scores'

const TransactionForm = () => {
	const { dispatch } = useTransactionsContext()
	const { user } = useAuthContext()
	const { categories } = useCategoriesContext()
	const navigate = useNavigate()

	const [transaction, setTransaction] = useState({
		date: new Date().toISOString(),
		concept: '',
		ammount: '',
		categoryId: '',
		score: ''
	})
	const [error, setError] = useState(null)
	// eslint-disable-next-line
	const [emptyFields, setEmptyFields] = useState([])
	const [type, setType] = useState('expense')

	const handleSubmit = async e => {
		e.preventDefault()

		if (!user) {
			setError('You must be logged in')
			return
		}

		const response = await fetch('/api/transactions', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${user.token}`
			},
			body: JSON.stringify(transaction)
		})

		const json = await response.json()

		if (!response.ok) {
			setError(json.error)
			setEmptyFields(json.emptyFields)
		} else {
			dispatch({
				type: 'CREATE_TRANSACTION',
				payload: {
					...transaction,
					date: new Date(transaction.date).toISOString()
				}
			})
			setTransaction({
				date: '',
				concept: '',
				ammount: '',
				categoryId: '',
				score: ''
			})
			setError(null)
			setEmptyFields([])
			navigate('/', { replace: true })
		}
	}

	const handleChange = e => {
		let isDate = e.target.name === 'date'
		setTransaction(prev => ({
			...prev,
			[e.target.name]: !isDate ? e.target.value : new Date(e.target.value).toISOString()
		}))
	}

	return (
		<form
			className={
				'shadow-lg bg-gradient-to-br from-blue-100 to-blue-300 rounded-3xl w-5/6 sm:w-3/4 lg:w-2/4 flex flex-col justify-around items-center py-5 my-6'
			}
			onSubmit={handleSubmit}
		>
			<h3 className='font-extrabold text-4xl my-4 wrap text-center'>Add Transaction</h3>
			<TypeInput checked={type} onChange={e => setType(e.target.value)} />
			<Input
				type='date'
				name='date'
				value={transaction.date.split('T').shift()}
				onChange={handleChange}
			/>
			<CategoryInput
				categories={categories?.filter(c => c.isEarning === (type === 'income'))}
				onChange={c => setTransaction(prev => ({ ...prev, categoryId: c.id }))}
			/>

			<Input type='text' name='concept' value={transaction.concept} onChange={handleChange} />
			<div className='flex flex-col mt-4 w-3/4 sm:w-2/3'>
				<label className='text-xl font-medium ml-2 capitalize' htmlFor='title'>
					Ammount
				</label>

				<NumberFormat
					className='appearance-none focus:outline-none h-10 rounded-3xl mt-1 px-6 text-md sm:text-lg text-sky-900'
					thousandSeparator={true}
					prefix={'$'}
					onValueChange={vObj => {
						const value = Math.abs(vObj.floatValue)
						setTransaction({
							...transaction,
							ammount: type === 'expense' ? -value : value
						})
					}}
				/>
			</div>
			<ScoreInput scores={scores} onChange={handleChange} selected={transaction.score} />
			{error && <div className='text-rose-500 font-medium mt-4'>{error}</div>}
			<button className='bg-orange-300 px-14 py-2 rounded-xl font-semibold mt-6'>Add</button>
			<BackButton />
		</form>
	)
}

export default TransactionForm
