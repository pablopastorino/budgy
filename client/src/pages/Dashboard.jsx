import React from 'react'
import DoughnutChart from '../components/dashboard/DoughnutChart'

const Dashboard = () => {
	return (
		<div className='flex justify-around w-full flex-wrap sm:flex-nowrap'>
			<div>
				<DoughnutChart key='expenses' expenses={true} />
			</div>
			<div>
				<DoughnutChart key='incomes' expenses={false} />
			</div>
		</div>
	)
}

export default Dashboard
