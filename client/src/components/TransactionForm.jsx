import React, { useEffect, useState } from 'react'
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
import { categoryIcons } from '../utils/categories'

const TransactionForm = () => {
	const { dispatch } = useTransactionsContext()
	const { user } = useAuthContext()
	const { categories } = useCategoriesContext()
	const navigate = useNavigate()

	const [transaction, setTransaction] = useState({
		date: '',
		concept: '',
		ammount: '',
		category: '',
		score: ''
	})
	const [error, setError] = useState(null)
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
					...transaction
				}
			})
			setTransaction({
				date: '',
				concept: '',
				ammount: '',
				category: '',
				score: ''
			})
			setError(null)
			setEmptyFields([])
			navigate('/', { replace: true })
		}
	}

	const handleChange = e => {
		setTransaction(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	return (
		<form
			className={
				'h-5/6 sm:h-full bg-sky-200 rounded-3xl w-5/6 sm:w-3/4 lg:w-2/4 flex flex-col justify-around items-center py-5 sm:py-2 sm:my-4'
			}
			onSubmit={handleSubmit}
		>
			<h3 className='font-extrabold text-4xl text-white'>
				Add Transaction
			</h3>
			<TypeInput checked={type} onChange={e => setType(e.target.value)} />
			<Input
				type='date'
				name='date'
				value={transaction.date}
				onChange={handleChange}
			/>
			<CategoryInput
				categories={categories?.filter(
					c => c.is_earning === +(type === 'income')
				)}
				onChange={c =>
					setTransaction(prev => ({ ...prev, category: c.id }))
				}
			/>

			<Input
				type='text'
				name='concept'
				value={transaction.concept}
				onChange={handleChange}
			/>
			<div className='flex flex-col  w-3/4 sm:w-2/3 lg:w-1/2'>
				<label
					className='text-xl font-medium ml-2 capitalize'
					htmlFor='title'
				>
					Ammount
				</label>

				<NumberFormat
					className='appearance-none focus:outline-none h-10 rounded-3xl mt-1 px-6 text-md sm:text-lg text-sky-900'
					thousandSeparator={true}
					prefix={'$'}
					onValueChange={vObj =>
						setTransaction({
							...transaction,
							ammount:
								type === 'expense' ? -vObj.value : vObj.value
						})
					}
				/>
			</div>
			<ScoreInput
				scores={scores}
				onChange={handleChange}
				selected={transaction.score}
			/>
			<button className='bg-orange-300 px-14 py-2 rounded-xl font-semibold mt-2'>
				Add
			</button>
			<BackButton />
		</form>
	)
}

export default TransactionForm
