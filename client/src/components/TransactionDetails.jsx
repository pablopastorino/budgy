import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useTransactionsContext } from '../hooks/useTransactionsContext'
import { categoryIcons } from '../utils/categories'
import { scores } from '../utils/scores'

const TransactionDetails = ({ transaction }) => {
	const { dispatch } = useTransactionsContext()
	const { user } = useAuthContext()

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0
	})

	const handleClick = async () => {
		if (!user) return

		const response = await fetch('/api/transactions/' + transaction.id, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${user.token}`
			}
		})
		const json = await response.json()

		console.log(json)

		if (response.ok) {
			dispatch({ type: 'DELETE_TRANSACTION', payload: { id: transaction.id } })
		}
	}

	const { ammount, registrationDate, score, concepts } = transaction

	const formatDate = date => date?.split('T')[0]

	return (
		<div className='bg-blue-100 text-gray-900 my-3 rounded-2xl flex content-center items-center p-2 relative'>
			<span
				key='1'
				className='shrink-0 bg-gray-900 text-white text-3xl h-12 w-12 rounded-2xl flex justify-center items-center text-center'
			>
				{categoryIcons[concepts?.categories?.name]}
			</span>
			<span key='2' className='flex flex-col flex-1 mx-6 w-1/2'>
				<span
					key='1'
					className='text-lg font-semibold text-ellipsis whitespace-nowrap overflow-hidden'
				>
					{concepts?.name}
				</span>
				<span key='2' className='flex'>
					<span className='text-sm text-gray-600 mt-auto'>
						{formatDate(registrationDate)}
					</span>
					<span className='ml-6 text-2xl'>
						{scores.filter(s => s.id === Number(score)).pop().icon}
					</span>
				</span>
			</span>
			<span key='3' className='shrink-0 font-extrabold ml-auto'>
				{formatter.format(ammount)}
			</span>
			<button
				onClick={handleClick}
				className='absolute -right-1 -top-2 bg-rose-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth={2}
				>
					<path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
				</svg>
			</button>
		</div>
	)
}

export default TransactionDetails
