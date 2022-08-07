import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import 'chart.js/auto'

import { useTransactionsContext } from '../../hooks/useTransactionsContext'

import { chartColors } from '../../utils/chartColors'
import { categoryIcons } from '../../utils/categories'

const DoughnutChart = ({ expenses }) => {
	const { transactions } = useTransactionsContext()

	const data = {
		labels: [],
		datasets: [
			{
				label: '',
				data: [],
				backgroundColor: []
			}
		]
	}

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 0
	})

	const filterCategories = t => {
		if (expenses) return t.ammount < 0
		else return t.ammount >= 0
	}

	const labels = Array.from(
		new Set(transactions?.filter(filterCategories).map(t => t.concepts.categories.name))
	)
	const totals = []
	labels?.forEach((l, i) => {
		const total = transactions
			.filter(t => t.concepts.categories.name === l)
			.reduce((a, b) => a + +b.ammount, 0)
		totals[i] = Math.abs(total)
	})

	data.labels = labels
	data.datasets[0].label = expenses ? 'Expenses' : 'Incomes'
	data.datasets[0].data = totals
	data.datasets[0].backgroundColor = chartColors.slice(0, labels.length)

	return (
		<div className='mt-8 flex flex-wrap md:flex-col xl:flex-row items-center justify-center'>
			<div>
				<Doughnut data={data} />
			</div>
			<div className='w-full'>
				{labels.map((l, i) => (
					<span key={i} className='flex w-full content-between px-8 mt-4'>
						<span className='text-2xl font-bold'>{categoryIcons[l]}</span>
						<span className='capitalize ml-4'>{l}</span>
						<span className=' font-bold text-lg ml-auto'>
							{formatter.format(totals[i])}
						</span>
					</span>
				))}
				<hr className='border-1 w-5/6 mx-auto bg-orange-600 border-orange-500' />
				<span className='flex w-full content-between px-8 mt-4'>
					<span className=''>Total {expenses ? 'Expenses' : 'Incomes'}</span>
					<span className=' font-bold text-lg ml-auto'>
						{formatter.format(totals.reduce((a, b) => a + b, 0))}
					</span>
				</span>
			</div>
		</div>
	)
}

export default DoughnutChart
