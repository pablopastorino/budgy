import React from 'react'
import DoughnutChart from '../components/dashboard/DoughnutChart'

const Dashboard = () => {
	return (
		<div className='flex items-start justify-center flex-wrap h-full'>
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
