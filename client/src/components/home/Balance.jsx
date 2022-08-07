import { useTransactionsContext } from '../../hooks/useTransactionsContext'
import { formatter, getBalance } from '../../utils/helpers'

const Balance = () => {
	const { transactions } = useTransactionsContext()

	return (
		<div className='rounded-3xl h-36 mt-4 mx-4 px-6 text-white bg-gray-900 flex justify-between md:w-72'>
			<span className='text-4xl flex items-center content-center'>
				{formatter.format(getBalance(transactions))}
			</span>
			<span className='flex items-center content-center text-sky-300 md:ml-2'>USD</span>
		</div>
	)
}

export default Balance
